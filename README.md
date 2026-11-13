# 1Factor Landing Page

Responsive landing page for 1Factor, a global supply chain finance platform.

## Features
- Hero with animated dashed trade routes, travelling dots and floating finance cards
- Scrolling currency-rate ticker
- Eight service cards with 3D tilt and glow on hover
- Expanding product slides (auto-advance, hover and click)
- Animated "How it works" timeline
- Scroll-reveal animations and mobile hamburger menu
- Smooth scrolling (Lenis) with GSAP scroll effects: progress bar, hero and image parallax, stat count-up
- Working 3-step "Apply for Finance Limit" form (opens from every Apply button)
- Responsive from phone to desktop

## Tech
Plain HTML, CSS and JavaScript. No build step. GSAP 3.12.5 and Lenis 1.1.18 load from a CDN (cdnjs and jsDelivr), and fonts from Google Fonts. If the CDN scripts fail or the visitor prefers reduced motion, the page falls back to normal scrolling.

## Structure
```
index.html      markup
styles.css      all styles
script.js       all behaviour (cards, slides, timeline, ticker, hero animation)
api/apply.js    Vercel serverless function that receives the application form
assets/         port.jpg, containers.jpg
```

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 5173
```

Then visit http://localhost:5173.

## Deploy on Vercel
No CI/CD pipeline is needed. Vercel deploys from GitHub automatically.

1. On vercel.com choose **Add New → Project** and import this repo.
2. Framework preset: **Other**. Leave the build command empty and the output directory as the project root.
3. Every push to `main` deploys to production. Every other branch or pull request gets a preview URL.

## Apply form
Every "Apply" and "View & Apply" button opens a 3-step form (company, finance need, review). It posts to `/api/apply`, which validates the data and emails it to you through [Resend](https://resend.com).

Set these in Vercel under **Project → Settings → Environment Variables**, then redeploy:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key |
| `APPLY_TO_EMAIL` | Inbox that receives applications, e.g. `info@1factor.com` |
| `APPLY_FROM_EMAIL` | Optional sender on a domain verified in Resend (default `onboarding@resend.dev`, which only delivers to your own Resend account email) |

If the variables are missing, or the page is opened as a plain file, the form falls back to opening the visitor's email app with the application filled in. Bots are filtered with a hidden honeypot field.
