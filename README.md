# Sai Jewelers — Website

A bilingual (Hindi/English) website for Sai Jewelers, Sikar, Rajasthan.

## What's inside
- `index.html` — Language selection page (this is your homepage / first page visitors see)
- `home.html` — About Us + Shop Location (in chosen language)
- `designs.html` — Jewelry categories (Rajasthani styles), with Gold/Silver/Artificial filter
- `style.css` — All styling (black, gold, silver theme matching your logo)
- `script.js` — Language switching logic
- `gallery.js` — Loads photos from each category's folder and powers the click-to-view gallery
- `assets/logo.png` — Your shop logo
- `assets/categories/` — One folder per jewelry category, where you add your real photos (see below)

## How to put this online for FREE (no coding needed) — Netlify

1. Go to **https://app.netlify.com/drop**
2. You'll see a box that says "Drag and drop your site folder here"
3. Drag the whole **sai-jewelers** folder into that box
4. Netlify will instantly give you a live web address like `https://sai-jewelers-xxxx.netlify.app`
5. (Optional) In Netlify, go to **Site settings → Change site name** to pick a nicer name, e.g. `saijewelerssikar.netlify.app`
6. (Optional) If you buy a domain name later (like saijewelers.in), you can connect it under **Domain settings**

That's it — no account is even required for the first upload, though creating a free Netlify account lets you update the site later by just dragging the folder again.

## Alternative: GitHub Pages (also free)
1. Create a free account at github.com
2. Create a new repository, upload all these files
3. Go to Settings → Pages → set source to "main branch"
4. Your site will be live at `https://yourusername.github.io/repo-name`

## How to update content later

### Adding real photos to the Designs page — Folder System

Every category now has its **own folder** under `assets/categories/`. Drop photos in, list the filenames in that folder's `manifest.json`, and the website automatically shows them — no editing of `designs.html` needed.

**The 12 folders:**
```
assets/categories/kundan/
assets/categories/meenakari/
assets/categories/jadau/
assets/categories/thewa/
assets/categories/temple/
assets/categories/borla-rakhdi/
assets/categories/lac-bangles/
assets/categories/oxidised-silver/
assets/categories/silver-payal/
assets/categories/artificial-bridal/
assets/categories/light-gold/
assets/categories/pachi-work/
```

**To add photos to, say, Kundan:**

1. Put your photo files inside `assets/categories/kundan/` — for example `kundan-1.jpg`, `kundan-2.jpg`, `kundan-3.jpg`
2. Open `assets/categories/kundan/manifest.json` in any text editor. It currently looks like:
   ```json
   {
     "images": []
   }
   ```
3. List your filenames inside the brackets, like this:
   ```json
   {
     "images": ["kundan-1.jpg", "kundan-2.jpg", "kundan-3.jpg"]
   }
   ```
4. Save the file. That's it.

The Kundan card on the website will now show the first photo as its thumbnail, with a small camera icon and photo count badge. Clicking the card opens a full-screen gallery viewer where visitors can click through all the photos with arrow buttons (or arrow keys on a keyboard).

**Important formatting notes:**
- Filenames go in **quotes**, separated by **commas**
- No comma after the last filename
- Keep the square brackets `[ ]` and curly braces `{ }` exactly as shown
- If a category's `manifest.json` has an empty `"images": []` list, that card will keep showing its gold-line illustration instead — so you can fill in folders one at a time as you photograph pieces, and nothing breaks in the meantime

**Repeat this for any other category** (meenakari, jadau, temple, etc.) the same way — just use that category's folder and its own `manifest.json`.

**Photo tips:**
- Square or near-square photos (e.g. 1000×1000px) look best in the thumbnail grid
- Keep individual file sizes under ~500KB–1MB so the page loads quickly (most phone cameras can be compressed; ask if you'd like help resizing a batch)
- Use plain filenames with no spaces — use hyphens instead, e.g. `gold-necklace-1.jpg` not `gold necklace 1.jpg`

### Changing phone numbers
Search for `9610454441` and `8209457053` across the HTML files and replace as needed — they appear as both clickable text and `tel:` / `wa.me` links.

### Changing the shop address / map
In `home.html`, find the `<iframe class="map-embed"` line. Replace the address in the Google Maps URL, or better — go to Google Maps, search your exact shop location, click Share → Embed a map, and paste that `src` link in instead. This will pinpoint your exact shop rather than just the city.

## Notes
- The language chosen on the first page is remembered, so returning visitors won't be asked again (they can still switch anytime via the "हिंदी / English" button in the top menu).
- The WhatsApp button opens a chat directly to +91 96104 54441.
- The site is fully mobile-responsive.
