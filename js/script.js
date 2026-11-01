const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const dateForm = document.getElementById('dateForm');
const gallery = document.getElementById('gallery');
const statusMessage = document.getElementById('status');
const submitButton = dateForm.querySelector('button');

setupDateInputs(startInput, endInput);

// Show a friendly date in each image card.
function formatDate(dateString) {
	return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// Escape API text before placing it inside the page's HTML.
function escapeHTML(value) {
	return String(value || '').replace(/[&<>"']/g, (character) => {
		const characters = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;'
		};

		return characters[character];
	});
}

function showMessage(message, isError = false) {
	gallery.innerHTML = `<div class="placeholder"><p>${escapeHTML(message)}</p></div>`;
	statusMessage.textContent = isError ? 'Something went wrong' : message;
	gallery.setAttribute('aria-busy', 'false');
}

function displayImages(images) {
	if (images.length === 0) {
		showMessage('No astronomy pictures were found for those dates.');
		return;
	}

	gallery.innerHTML = images.map((image, index) => {
		const isVideo = image.media_type === 'video';
		const imageURL = isVideo ? image.thumbnail_url : image.url;
		const imageTitle = escapeHTML(image.title);
		const mediaURL = escapeHTML(image.url);
		const thumbnailURL = escapeHTML(imageURL);
		const date = escapeHTML(formatDate(image.date));
		const explanation = escapeHTML(image.explanation);
		const mediaLabel = isVideo ? 'VIDEO' : 'IMAGE';

		return `
			<article class="gallery-item" style="animation-delay: ${Math.min(index * 45, 360)}ms">
				<a class="gallery-image-link" href="${mediaURL}" target="_blank" rel="noreferrer" aria-label="Open ${imageTitle} in a new tab">
					<img src="${thumbnailURL}" alt="${imageTitle}" loading="lazy" />
					<span class="media-tag">${mediaLabel} ↗</span>
				</a>
				<div class="gallery-copy">
					<p class="gallery-date">${date}</p>
					<h3>${imageTitle}</h3>
					<p class="explanation">${explanation}</p>
				</div>
			</article>
		`;
	}).join('');

	statusMessage.textContent = `${images.length} ${images.length === 1 ? 'discovery' : 'discoveries'} in this date range`;
	gallery.setAttribute('aria-busy', 'false');
}

async function getSpaceImages(event) {
	if (event) {
		event.preventDefault();
	}

	if (!startInput.value || !endInput.value || startInput.value > endInput.value) {
		showMessage('Choose a valid date range to explore.', true);
		return;
	}

	submitButton.disabled = true;
	gallery.setAttribute('aria-busy', 'true');
	gallery.innerHTML = '<div class="placeholder"><span class="loader" aria-hidden="true"></span><p>Searching NASA\'s archive…</p></div>';
	statusMessage.textContent = 'Loading discoveries…';

	const query = new URLSearchParams({
		start_date: startInput.value,
		end_date: endInput.value,
		thumbs: 'true',
		api_key: 'DEMO_KEY'
	});

	try {
		const response = await fetch(`https://api.nasa.gov/planetary/apod?${query}`);

		if (!response.ok) {
			throw new Error(`NASA's API returned an error (${response.status}). Please try again shortly.`);
		}

		const images = await response.json();
		displayImages(Array.isArray(images) ? images : [images]);
	} catch (error) {
		showMessage(error.message || 'Unable to reach NASA right now. Check your connection and try again.', true);
	} finally {
		submitButton.disabled = false;
	}
}

dateForm.addEventListener('submit', getSpaceImages);

// Load the default nine-day range as soon as the page opens.
getSpaceImages();
