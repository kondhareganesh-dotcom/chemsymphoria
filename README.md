# ChemSymphoria 2026–27
## Annual Chemistry Symposium · Department of Chemistry, IISER Pune

> **Live site:** [chemsymphoria.com](https://chemsymphoria.com)  
> **Platform:** GitHub Pages (free hosting)  
> **Organization:** Department of Chemistry & Chemphilic Club, IISER Pune

---

## Quick Start

### 1. Download & Extract

```bash
unzip chemsymphoria-2026.zip
cd chemsymphoria
```

### 2. Preview Locally

Open `index.html` in any modern browser. No build step required — it's pure HTML/CSS/JS.

```bash
# Optional: serve with a local server (avoids font CORS issues)
npx serve .
# or
python3 -m http.server 8080
```

---

## Deploying to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click **New repository** (green button).
3. Name it: `chemsymphoria` (or any name you prefer).
4. Set it to **Public** (required for free GitHub Pages).
5. Do NOT initialize with README (you'll upload files manually).
6. Click **Create repository**.

### Step 2 — Upload the Files

**Option A — GitHub Web Interface (easiest for beginners):**

1. On your new empty repository page, click **uploading an existing file**.
2. Drag and drop ALL files from the extracted `chemsymphoria` folder.
3. Make sure you upload the files **and** the `assets/` folder structure.
4. Click **Commit changes**.

**Option B — Git command line:**

```bash
cd chemsymphoria
git init
git add .
git commit -m "Initial site upload — ChemSymphoria 2026-27"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chemsymphoria.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages** (left sidebar).
2. Under **Source**, select **Deploy from a branch**.
3. Choose branch: **main**, folder: **/ (root)**.
4. Click **Save**.
5. Wait 1–3 minutes. GitHub will show: *"Your site is published at https://YOUR_USERNAME.github.io/chemsymphoria"*

---

## Connecting chemsymphoria.com

### Step 1 — Add the Custom Domain in GitHub

1. In your repository **Settings → Pages**.
2. Under **Custom domain**, type: `chemsymphoria.com`
3. Click **Save**.
4. GitHub will create a `CNAME` file in your repository — this is correct.

### Step 2 — Configure DNS at Your Domain Registrar

Log in to wherever you purchased `chemsymphoria.com` and add these DNS records:

**A Records** (point the apex domain):
| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**CNAME Record** (point www subdomain):
| Type | Name | Value |
|------|------|-------|
| CNAME | www | YOUR_USERNAME.github.io |

> DNS changes take 15 minutes to 48 hours to propagate.

### Step 3 — Enable HTTPS

Once DNS propagates:
1. In **Settings → Pages**, tick ✅ **Enforce HTTPS**.
2. Your site will be live and secure at `https://chemsymphoria.com`.

---

## Testing the Deployed Site

Check these items after deployment:

- [ ] `https://chemsymphoria.com` loads the homepage
- [ ] All navigation links work (About, Speakers, Schedule, etc.)
- [ ] Mobile menu opens and closes correctly
- [ ] All pages load without console errors (open browser DevTools → Console)
- [ ] Images display correctly (no broken image icons)
- [ ] Contact form submits (shows confirmation message)
- [ ] Schedule tabs switch between Day 1 and Day 2
- [ ] Site is readable on phone (test on actual device or Chrome DevTools → device toolbar)

---

## Editing Content

### Updating Text on Any Page

1. Open the relevant HTML file in a text editor (e.g., VS Code, Notepad++).
2. Find the text you want to change using Ctrl+F / Cmd+F.
3. Edit the text.
4. Save the file.
5. If deployed, re-upload the changed file to GitHub.

### Changing Colors

Open `assets/css/design-system.css`. All colors are CSS variables at the top:

```css
:root {
  --color-teal:  #0ABFBF;   /* Primary accent — change this for brand color */
  --color-amber: #F5A623;   /* Secondary accent */
  --color-void:  #05080F;   /* Background — change for a lighter theme */
}
```

### Updating the Event Date & Venue

In `index.html`, find:
```html
<span>To Be Announced</span>
```
Replace with the actual date, e.g.:
```html
<span>December 12–13, 2026</span>
```

Also update in the footer and on other pages.

---

## Adding Speakers

1. Open `speakers.html`.
2. Find a placeholder card that looks like:

```html
<article class="speaker-detail-card">
  <div class="speaker-detail-card__header">
    <div class="speaker-detail-card__avatar">
      <div class="speaker-detail-card__avatar-placeholder">AB</div>
    </div>
    <div class="speaker-detail-card__info">
      <div class="speaker-detail-card__name">Speaker Name TBA</div>
      ...
```

3. Replace the placeholder initials with a real image:

```html
<!-- Replace: -->
<div class="speaker-detail-card__avatar-placeholder">AB</div>

<!-- With: -->
<img src="assets/images/speakers/prof-firstname-lastname.jpg" 
     alt="Prof. Firstname Lastname" 
     loading="lazy">
```

4. Save the speaker photo in `assets/images/speakers/` with the filename you used.
5. Fill in the actual name, designation, affiliation, talk title, and bio.

**Tip:** Copy the entire `<article class="speaker-detail-card">` block to add a new speaker.

---

## Updating the Schedule

Open `schedule.html`. The schedule uses a timeline structure:

```html
<div class="schedule-item">
  <div class="schedule-item__time">10:30<br>AM</div>
  <div class="schedule-item__dot"></div>
  <div class="schedule-item__card">
    <div class="schedule-item__title">Talk Title Here</div>
    <div class="schedule-item__speaker">Prof. Speaker Name</div>
    <div class="schedule-item__affil">University / Institute</div>
  </div>
</div>
```

To add a session, copy one `schedule-item` block and update the time, title, and speaker.

To mark a session as keynote:
```html
<div class="schedule-item schedule-item--keynote">
```

To mark a break:
```html
<div class="schedule-item schedule-item--break">
```

---

## Updating Sponsors & Team Members

**Sponsors:** In `sponsors.html`, find the `.sponsor-logo-card` blocks and:
1. Add the sponsor logo image to `assets/images/sponsors/`
2. Replace the placeholder text with the actual sponsor name
3. Add `<img src="assets/images/sponsors/sponsor-name.png" alt="Sponsor Name">` inside the card

**Team members:** In `team.html`, find `.team-card` blocks:
1. Add photo to `assets/images/team/`
2. Replace the placeholder initials div with an `<img>` tag
3. Update name and role

---

## File Structure

```
chemsymphoria/
├── index.html              ← Homepage
├── about.html              ← About the symposium
├── advisory-board.html     ← Advisory board members
├── speakers.html           ← Invited speakers
├── schedule.html           ← Full program schedule
├── activities.html         ← Competitions & events
├── team.html               ← Organizing team
├── sponsors.html           ← Sponsors & partners
├── contact.html            ← Contact & registration
├── CNAME                   ← GitHub Pages custom domain
├── README.md               ← This file
├── ASSET-INVENTORY.md      ← Asset status tracking
├── CONTENT-NOTES.md        ← Content gaps & notes
└── assets/
    ├── css/
    │   ├── design-system.css   ← Core design system
    │   ├── home.css            ← Homepage-specific styles
    │   └── pages.css           ← Inner page styles
    ├── js/
    │   └── main.js             ← Navigation, animations, interactions
    ├── icons/
    │   └── favicon.svg         ← Site favicon
    ├── images/
    │   ├── speakers/           ← Speaker photographs
    │   ├── advisory-board/     ← Advisory board portraits
    │   ├── team/               ← Team photographs
    │   ├── sponsors/           ← Sponsor logos
    │   ├── events/             ← Event photographs
    │   ├── banners/            ← Hero/banner images
    │   ├── backgrounds/        ← Background images
    │   └── other/              ← Miscellaneous images
    └── logos/                  ← Institutional logos
```

---

## Technical Notes

- **No build step required** — pure HTML, CSS, JavaScript.
- **No external dependencies** — Google Fonts are the only remote resource.
- **Responsive** — works on phones, tablets, and desktops.
- **Accessible** — ARIA labels, keyboard navigation, reduced-motion support.
- **Performance** — images are lazy-loaded, CSS is minimal, JS is vanilla.
- **GitHub Pages compatible** — relative paths, no server-side code.

---

## Support

For technical help with the website, contact the ChemSymphoria technical team.  
For event information: **chemsymphoria@iiserpune.ac.in**
