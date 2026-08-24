# Stevens Fitness

Static website for a semi-private strength & conditioning coach.
Plain HTML, CSS, and JavaScript — no build step, no dependencies, no `node_modules`.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — the pitch, roster status, schedule preview, pricing teaser |
| `about.html` | Coach bio, credentials, why the roster is capped |
| `training.html` | What a session looks like, what gets trained, fit check |
| `schedule.html` | Full weekly schedule with live availability, scheduling policies |
| `pricing.html` | The membership, what's included, billing questions |
| `faq.html` | Ten common questions, accordion style |
| `contact.html` | Inquiry form + direct contact details |

## The one file you'll actually edit

**`js/config.js`** holds every number and detail that changes over time:

```js
roster:  { total: 12, filled: 7 },   // update as clients join
pricing: { amount: 250, ... },
schedule: [ ... ],                    // times + how many seats are taken
email, phone, instagram
```

Change a value there and it updates **everywhere on every page** — the roster bar,
the schedule chips, the pricing cards, the contact form dropdown, the footer.
When `filled` reaches `total`, the site automatically flips its calls-to-action
to waitlist language.

## Re-skinning the site

All colors and fonts are CSS variables at the top of `css/styles.css`:

| Token | Value | Used for |
|-------|-------|----------|
| `--base` | `#FAF8F5` | Page background |
| `--ink` | `#1A1A18` | Headings |
| `--ink-soft` | `#635F58` | Body copy |
| `--amber` | `#D99A2B` | Primary accent |
| `--slate` | `#3D4A52` | Secondary accent |

Change those five and the whole site follows.

## Local preview

```bash
python3 -m http.server 3000
# or
npx serve .
```

Open http://localhost:3000

## Deploying to Vercel

```bash
git init
git add .
git commit -m "Stevens Fitness site"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Then on vercel.com: **Add New → Project → import the repo**.
Framework preset **Other**, build command empty, output directory empty. Deploy.

Every push to `main` redeploys automatically; every pull request gets a preview URL.

## Making the contact form actually send

It currently validates and shows a confirmation but does not deliver anything.

1. Create a free form at [formspree.io](https://formspree.io)
2. In `contact.html`, add to the `<form>` tag:
   `action="https://formspree.io/f/YOUR_ID" method="POST"`
3. In `js/main.js`, delete the `e.preventDefault();` line inside `setupForm()`

## Before launch — content checklist

Every spot needing real content is highlighted in amber on the page and marked
`[LIKE THIS]` in the HTML. Search the project for `placeholder` to find them all.

- [ ] Steven's last name and full bio (`about.html`)
- [ ] Certifications, years coaching, specialty (`about.html`)
- [ ] Real email, phone, Instagram (`js/config.js`)
- [ ] Real price and what's included (`js/config.js`)
- [ ] Real schedule times and seats taken (`js/config.js`)
- [ ] Gym location and address (`faq.html`)
- [ ] Cancellation / make-up policy (`schedule.html`, `faq.html`)
- [ ] Sessions per week, nutrition answer, trial session answer (`faq.html`, `pricing.html`)
- [ ] Payment methods and sign-up fee (`pricing.html`)
- [ ] `assets/img/favicon.ico` and `assets/img/og-image.jpg` (1200×630)
- [ ] Photos — the site is deliberately image-light, but a coach portrait on
      `about.html` and one training shot on `index.html` would lift it a lot
