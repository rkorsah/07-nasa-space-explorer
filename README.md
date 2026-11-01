# Project 7: NASA API - Space Explorer App
NASA releases a new "Astronomy Picture of the Day" (APOD) every day—spotlighting breathtaking images of galaxies, stars, planets, and more.

Your task is to build an interactive web app that fetches and displays these photos using [NASA's API](https://api.nasa.gov/). Users will pick a date range and instantly view stunning photos from across the cosmos, along with titles and descriptions.

You'll get to use your skills to build something that's actually connected to real-world data from one of the most iconic organizations in the world.

## Starter Files
- The provided files include a NASA logo, date inputs, a button, a placeholder for your gallery, and basic layout and styling to help you get started.
- It also includes built-in logic (in `dateRange.js`) to handle the valid APOD date range—from June 16, 1995 to today. No need to modify it.
- All your custom JavaScript should go in `script.js`. That's where you'll write the code that fetches data and displays your gallery.

## Reflection Draft
Personalize these responses so they describe your own experience with the project.

### Working with APIs
I used `fetch` to request NASA's APOD data with a start date and end date. The response is JSON, so I checked that the request succeeded before using the returned titles, dates, descriptions, and image URLs to build the gallery. I also learned that video entries have a different media type and may provide a separate thumbnail URL.

### Debugging
I checked the API response shape and JavaScript syntax while validating the gallery. This helped distinguish a failed request from a successful request that returned data in a different format. I also accounted for loading and error states so the page explains what is happening instead of appearing blank.

### LinkedIn Post
I built Space Explorer, a small app that brings NASA's Astronomy Picture of the Day archive into an interactive gallery. Visitors can explore a date range, open a full-size image with its astronomy description, and discover a random space fact. I practiced working with a real API, asynchronous JavaScript, responsive CSS, and accessible dialog interactions along the way.
