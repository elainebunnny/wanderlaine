# Wanderlaine

A personal travel journal web app by Elaine. Browse curated places, view them on an interactive map, read reviews, leave comments with star ratings, chat with an AI travel assistant, and read rich "Chapters" — stories, descriptions, itineraries, and photo galleries for each city or country.

## Tech Stack

- **React 18** + **Vite** (frontend)
- **Leaflet** + OpenStreetMap (interactive map, loaded via CDN)
- **Nominatim** (geocoding for the Admin tab)
- **Vercel Serverless Function** (`/api/chat`) → Anthropic Claude API
- **localStorage** for data persistence

## Features

- 🗺️ **Explore**: search, filter by category/country/city/tag, list + map toggle with color-coded pins
- 📍 **Place details**: hero photo, review, pro tip, Google Maps + Apple Maps buttons, visitor comments with star ratings
- 📖 **Chapters**: each city or country gets a rich page with four optional sections — About (description), My Memory (personal stories), Itinerary (day-by-day plan), and Gallery (photos, optionally linked to existing places)
- 🤖 **Ask AI**: chat with Claude, grounded to your personal place + chapter collection
- 💬 **Feedback**: collect general notes from visitors
- 🔐 **Admin** (password: `travel2025`): toggle between managing Places and Chapters. Both have full-featured editors.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The AI chat will return a friendly fallback until you configure an API key (see below).

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel (it auto-detects Vite).
3. Add an environment variable in **Project Settings → Environment Variables**:
   - `ANTHROPIC_API_KEY` = `sk-ant-...`
4. Deploy.

The serverless function at `api/chat.js` proxies chat requests to the Anthropic API using `claude-sonnet-4-20250514`.

## Data

All default places (88) and chapters (7) are embedded directly in `src/data.js` as `INIT_PLACES` and `INIT_STORIES`. On first load they populate localStorage under the key `wanderlaine-data`.

### Adding content — workflows

**Add a place** (fast, geocoded):
1. Go to Admin tab → Places → **+ Add place**
2. Type a name in the Location Search → pick from Nominatim dropdown → lat/lng/address/city/country auto-fill
3. Set category, rating, tags, review, optional pro tip + photo
4. Save

**Add a chapter** (flexible, all sections optional):
1. Go to Admin tab → Chapters → **+ Add chapter**
2. Fill in at least Title + Country (everything else is optional — only fill what you have)
3. Upload a cover photo if you want
4. Write a **📝 Description** (what is this city?) if you want
5. Write a **💭 Memory** (your personal stories) if you want
6. Add an **🗓️ Itinerary** — click "+ Add itinerary", then build day-by-day
7. Add **📸 Gallery** items — each can have its own photo + caption, OR link to an existing place to reuse its photo & make the gallery item clickable
8. Save. Only the sections with content will render on the chapter page.

## Schema

**Place**
```json
{
  "id": "p1",
  "name": "Sushi Masuda",
  "country": "Canada",
  "city": "Vancouver",
  "category": "restaurant-bar",
  "rating": 5,
  "tags": ["michelin-guide"],
  "lat": 49.2634,
  "lng": -123.1016,
  "address": "Vancouver, BC",
  "comment": "Review text...",
  "proTip": "Optional tip",
  "photo": null
}
```

**Chapter / Story** (all sections optional except `title` and `country`)
```json
{
  "id": "st1",
  "title": "Tokyo",
  "country": "Japan",
  "city": "Tokyo",
  "coverPhoto": null,
  "description": "A brief overview of the place...",
  "memory": "Personal stories from living/traveling here...",
  "itinerary": {
    "title": "5 Days in Tokyo",
    "tagline": "Short hook line",
    "days": [{ "day": 1, "title": "Arrival", "notes": "..." }]
  },
  "gallery": [
    { "id": "g1", "photo": "data:image/...", "caption": "Shibuya Crossing", "placeId": "" },
    { "id": "g2", "photo": null, "caption": "", "placeId": "p57" }
  ]
}
```

**Comment**
```json
{
  "id": "c1",
  "placeId": "p1",
  "name": "Alex",
  "rating": 5,
  "message": "Loved it!",
  "createdAt": "2026-04-16T..."
}
```

## Migration Notes

If you're upgrading from the initial version (which had `itineraries`), your localStorage data auto-migrates to the new `stories` shape on first load. No data loss.

## License

Personal project — all rights reserved.
