# Asset Inventory — ChemSymphoria 2026–27

> Generated: October 2026  
> Source website: https://chemsymphoria20262.wixsite.com/chemsymphoria-20262

---

## ⚠️ Important Notice: Wix Site Scraping Limitation

The source Wix website is **JavaScript-rendered (Single Page Application)**. Static HTTP requests return only a JavaScript bootstrap shell — no page content, images, or text is present in the raw HTML.

**Consequence:** It was not possible to automatically extract speaker photos, advisory board portraits, team photos, sponsor logos, or event images from the Wix site without a full browser environment (Puppeteer/Playwright).

---

## Retrieval Status Summary

| Category | Attempted | Retrieved | Status |
|----------|-----------|-----------|--------|
| Speaker photos | Wix (JS-rendered) | 0 | ❌ Not retrieved — manual action needed |
| Advisory board portraits | Wix (JS-rendered) | 0 | ❌ Not retrieved — manual action needed |
| Team photographs | Wix (JS-rendered) | 0 | ❌ Not retrieved — manual action needed |
| Sponsor logos | Wix (JS-rendered) | 0 | ❌ Not retrieved — manual action needed |
| Event logo | Wix (JS-rendered) | 0 | ❌ Not retrieved — manual action needed |
| IISER Pune logo | Created SVG icon | 1 | ✅ Favicon created |
| Background/hero images | Not applicable | 0 | ℹ️ Replaced with CSS/SVG |
| Molecular illustration | Created in-code SVG | 1 | ✅ SVG created |

---

## Manual Asset Retrieval Guide

Since automatic retrieval was blocked by JavaScript rendering, please follow these steps manually:

### Method A — Screenshot & Export from Wix (Recommended)

1. Open https://chemsymphoria20262.wixsite.com/chemsymphoria-20262 in Chrome or Firefox.
2. Navigate to each page that contains images.
3. Right-click on each image → **"Save image as..."**
4. Save to the correct local folder (see directory map below).
5. Use the filename conventions below.

### Method B — Browser DevTools

1. Open DevTools (F12 or Cmd+Opt+I).
2. Go to **Network tab** → filter by **Img**.
3. Reload the page.
4. All image requests will appear — right-click each to copy URL or open in new tab.
5. Wix images are hosted at `https://static.wixstatic.com/media/...`

### Method C — Contact the Wix Site Owner

Request exported images directly from the ChemSymphoria organizing committee, who have full access to Wix's asset manager.

---

## Directory Map for Assets

```
assets/images/speakers/          ← Speaker portrait photos
assets/images/advisory-board/    ← Advisory board member portraits
assets/images/team/              ← Team/organizing committee photos
assets/images/sponsors/          ← Sponsor and partner logos
assets/images/events/            ← Event and gallery photos
assets/images/banners/           ← Hero section banners
assets/images/backgrounds/       ← Background images
assets/images/other/             ← Other assets
assets/logos/                    ← Institutional logos (IISER Pune, etc.)
assets/icons/                    ← Icons and favicon
```

---

## Filename Conventions

### Speakers
```
assets/images/speakers/prof-firstname-lastname.jpg
assets/images/speakers/dr-firstname-lastname.jpg
```

### Advisory Board
```
assets/images/advisory-board/prof-firstname-lastname.jpg
```

### Team
```
assets/images/team/firstname-lastname.jpg
```

### Sponsors
```
assets/images/sponsors/company-name.png
assets/logos/iiser-pune-logo.png
assets/logos/chemphilic-logo.png
```

---

## Replacing Placeholders Once Assets Are Ready

### Speaker Images
In `speakers.html`, find the placeholder:
```html
<div class="speaker-detail-card__avatar-placeholder">AB</div>
```
Replace with:
```html
<img src="assets/images/speakers/prof-firstname-lastname.jpg" 
     alt="Prof. Firstname Lastname" loading="lazy">
```

### Advisory Board Images
In `advisory-board.html`, find:
```html
<div class="advisory-card__placeholder-initials">AB</div>
```
Replace with:
```html
<img src="assets/images/advisory-board/prof-firstname-lastname.jpg" 
     alt="Prof. Firstname Lastname" 
     class="advisory-card__image" loading="lazy">
```

### Sponsor Logos
In `sponsors.html`, find placeholder text blocks and add:
```html
<img src="assets/images/sponsors/sponsor-name.png" alt="Sponsor Name">
```

---

## Assets Created in This Build

| File | Location | Type | Status |
|------|----------|------|--------|
| Molecular favicon (hexagonal) | `assets/icons/favicon.svg` | SVG icon | ✅ Created |
| Molecule hero illustration | Inline SVG in `index.html` | SVG | ✅ Created |
| Molecular canvas animation | `assets/js/main.js` | Canvas JS | ✅ Created |

---

## Known Missing Assets (Requires Manual Action)

| Asset | Needed For | Priority | Action Required |
|-------|-----------|----------|----------------|
| ChemSymphoria event logo | Nav, favicon | High | Export from Wix or request from organizers |
| Speaker portraits (all) | `speakers.html` | High | Get from organizers or scrape Wix manually |
| Advisory board portraits | `advisory-board.html` | High | Get from organizers or scrape Wix manually |
| Team photos | `team.html` | Medium | Get from organizing committee |
| IISER Pune official logo | Footer, sponsors page | High | Download from iiserpune.ac.in |
| Sponsor logos | `sponsors.html` | Medium | Get from each sponsor organization |
| Event gallery photos | Optional gallery section | Low | Request from previous editions |

---

## IISER Pune Logo (Public Source)

The official IISER Pune logo can be downloaded from:
- https://www.iiserpune.ac.in (look for the logo in the page header)
- Save as: `assets/logos/iiser-pune-logo.png`
- Update `sponsors.html` and the footer accordingly
