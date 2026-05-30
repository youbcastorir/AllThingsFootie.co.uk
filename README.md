# ⚽ AllThingsFootie.co.uk

> England's ultimate football fan community — news, forums, match analysis, transfer rumours, predictions, and more.

![AllThingsFootie Banner](https://via.placeholder.com/1200x300/37003c/00ff87?text=AllThingsFootie.co.uk)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Customisation Guide](#customisation-guide)
- [AI Features (Groq API)](#ai-features-groq-api)
- [SEO & Performance](#seo--performance)
- [Contact](#contact)

---

## Overview

AllThingsFootie.co.uk is a lightweight, mobile-first English football community platform built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools — just clean, fast, GitHub Pages-compatible code.

**Inspired by:**
- Reddit football communities
- BBC Sport football section
- Traditional fan forums
- Football blogs

---

## Features

### 🏟️ Core Sections
| Feature | Description |
|---|---|
| Football News Hub | Latest news feed with category tabs |
| Fan Forum | Discussion boards, match threads, predictions |
| Club Communities | 10 Premier League club sections |
| Match Centre | Fixtures, results, league table, top scorers |
| Fan Blogs | Community-submitted blog posts |
| Student Journalists | Article submission area |
| User Profiles | Avatars, badges, XP system |
| Gamification | XP points, rankings, weekly leaderboard |

### 🎨 Design
- Dark/light mode toggle
- Premier League-inspired colour palette
- Mobile-first responsive layout
- Professional sports media typography (Oswald + Source Serif 4)
- Smooth animations and micro-interactions

### ⚡ Technical
- Zero dependencies — vanilla JS only
- localStorage for all persistent data
- PWA manifest included
- SEO optimised (Open Graph, Twitter Cards, schema.org)
- GitHub Pages compatible out of the box

---

## Project Structure

```
allthingsfootie/
├── index.html          # Main homepage
├── forum.html          # Full forum page
├── style.css           # All styles (dark/light themes)
├── app.js              # Core application logic
├── forum.js            # Forum-specific logic
├── data.js             # All static data and constants
├── manifest.json       # PWA manifest
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine directives
├── .gitignore          # Git ignore rules
├── .env.example        # Environment variable template
└── README.md           # This file
```

---

## Installation Guide

### Prerequisites
- A modern web browser
- Git (for deployment)
- A text editor (VS Code recommended)
- Live Server extension (for local development)

### Local Development

**1. Clone or download the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/allthingsfootie.git
cd allthingsfootie
```

**2. Open with Live Server (VS Code):**
- Install the "Live Server" extension in VS Code
- Right-click `index.html` → "Open with Live Server"
- Site opens at `http://127.0.0.1:5500`

**3. Or simply open in browser:**
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

> ⚠️ Note: Some features (localStorage, font loading) work best when served over HTTP rather than opened as a file.

---

## GitHub Pages Deployment

### Step-by-Step

**1. Initialise Git and push to GitHub:**
```bash
git init
git add .
git commit -m "Launch AllThingsFootie"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/allthingsfootie.git
git push -u origin main
```

**2. Enable GitHub Pages:**
- Go to your repository on GitHub
- Click **Settings** → **Pages**
- Under "Source", select **Deploy from a branch**
- Choose **main** branch, **/ (root)** folder
- Click **Save**

**3. Access your site:**
```
https://YOUR_USERNAME.github.io/allthingsfootie/
```

> ✅ Your site will be live within 1–2 minutes. GitHub Pages automatically re-deploys on every push to `main`.

### Custom Domain (Optional)
1. Add a `CNAME` file to the root with your domain:
   ```
   allthingsfootie.co.uk
   ```
2. Configure your DNS provider:
   - Add `A` records pointing to GitHub Pages IPs
   - Or add a `CNAME` record pointing to `YOUR_USERNAME.github.io`

---

## Customisation Guide

### Changing Club Data
Edit `data.js` → `ATF_DATA.clubs` array:
```javascript
{ 
  id: "arsenal",        // URL-safe identifier
  name: "Arsenal",      // Display name
  short: "ARS",         // 3-letter code
  color: "#EF0107",     // Club primary colour (hex)
  badge: "🔴",          // Emoji badge
  city: "London",       // Club city
  members: 12450        // Member count (cosmetic)
}
```

### Adding News Articles
Edit `data.js` → `ATF_DATA.news` array:
```javascript
{
  id: "n009",                    // Unique ID
  title: "Your Article Title",
  excerpt: "Short description…",
  category: "transfers",         // transfers | match | analysis | opinion
  club: "arsenal",               // Club ID or null
  author: "Author Name",
  date: "2024-06-16",           // YYYY-MM-DD
  image: "https://…",           // Image URL
  featured: false,               // Show in hero section?
  readTime: 4,                   // Minutes
  votes: 0
}
```

### Updating League Table
Edit `data.js` → `ATF_DATA.leagueTable` with current standings.

### Changing Colours / Theme
Edit CSS variables in `style.css`:
```css
:root {
  --pl-purple: #37003c;   /* Header/ticker background */
  --pl-green:  #00ff87;   /* Primary accent colour */
  --pl-pink:   #e90052;   /* Secondary accent */
  --accent:    #00d4ff;   /* Tertiary accent */
}
```

### Adding Forum Boards
Edit `data.js` → `ATF_DATA.forumBoards`:
```javascript
{ 
  id: "womens",           // URL-safe identifier
  name: "Women's Football", 
  icon: "⚽", 
  description: "Discussion about the WSL and women's game",
  threads: 0 
}
```

---

## AI Features (Groq API)

The platform supports optional AI-powered features via the Groq API.

### What it can power:
- Article summaries
- Match preview generation
- Headline suggestions
- Forum moderation assistance

### Setup

**1. Copy the environment template:**
```bash
cp .env.example .env
```

**2. Add your Groq API key to `.env`:**
```
GROQ_API_KEY=your_groq_api_key_here
```

**3. GitHub Secrets (for CI/CD):**
- Go to repository **Settings** → **Secrets and variables** → **Actions**
- Click **New repository secret**
- Name: `GROQ_API_KEY`
- Value: your API key
- Click **Add secret**

> ⚠️ **Never commit your API key to Git.** The `.env` file is already in `.gitignore`.

> ℹ️ Since this is a static site, Groq API calls should be made via a serverless function (e.g. Netlify Functions, Vercel Edge Functions, or a Cloudflare Worker) to keep your key server-side.

---

## SEO & Performance

### Included SEO features:
- ✅ Semantic HTML5 structure
- ✅ Open Graph meta tags
- ✅ Twitter/X Card meta tags
- ✅ schema.org JSON-LD structured data
- ✅ `sitemap.xml` for search engine indexing
- ✅ `robots.txt` with crawl directives
- ✅ Descriptive alt text on images
- ✅ Canonical URL structure

### Performance optimisations:
- ✅ Zero external JS dependencies
- ✅ Lazy-loaded images (`loading="lazy"`)
- ✅ CSS animations use `transform` (GPU-accelerated)
- ✅ localStorage caching for user data
- ✅ Minimal DOM manipulation
- ✅ Font preconnect hints

### Lighthouse targets:
| Metric | Target |
|---|---|
| Performance | 90+ |
| Accessibility | 90+ |
| Best Practices | 95+ |
| SEO | 95+ |

---

## Monetisation

The following UI sections are included as placeholders:

| Feature | Location | Status |
|---|---|---|
| Premium Membership | Sidebar widget + modal | UI ready |
| Newsletter Signup | Sidebar + footer | UI ready |
| Merch Store | Bottom section | Placeholder |
| Sponsored Articles | News feed slots | CSS class ready |
| Display Ads | Sidebar positions | Marked in HTML |

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| iOS Safari | ✅ Full |
| Android Chrome | ✅ Full |

---

## Contact

📧 **Email:** [salatrir@gmail.com](mailto:salatrir@gmail.com)  
🌐 **Website:** [allthingsfootie.co.uk](https://allthingsfootie.co.uk)  
🐦 **Twitter/X:** [@AllThingsFootie](https://twitter.com/AllThingsFootie)

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Open a Pull Request

---

## Licence

© 2024 AllThingsFootie.co.uk. All rights reserved.

Not affiliated with the Premier League, the Football Association, or any football club.

---

*Built with ❤️ for English football fans everywhere.*
