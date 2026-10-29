# Kaleido — blog / magazine site

Single-file static site. No build step, no dependencies.

## Files
- `index.html` — the whole site (HTML + CSS + JS in one file). All pages (Home, Articles, Categories, Authors, About, Contact, Article) live in this file and switch via the URL hash (`#articles`, `#about`, …).
- `netlify.toml` — Netlify config (publishes the repo root).
- `.gitignore`

## Deploy on Netlify
1. Push this folder to a GitHub repo.
2. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo.
3. Build command: *(leave empty)*. Publish directory: `.` (root). Deploy.
Every push to `main` redeploys automatically.

## Where to edit things (all in `index.html`)
| What | Where |
|---|---|
| Site name "Kaleido" | search `Kaleido` (logo, footer, `<title>`) |
| Categories (name, description, icon) | `const CATS = [...]` in the `<script>` |
| Authors | `const AUTHORS = [...]` |
| Articles (title, category, read time, excerpt) | `const T = [...]` — one line per article |
| Article body text | `renderArticle()` — `H` (headings) and `P` (paragraphs) |
| Testimonials | `const QUOTES = [...]` |
| Contact details | the `#v-contact` section |
| Colors, fonts, spacing | the `:root { ... }` tokens at the top of `<style>` |
| Purple "Stay in the loop" block | `.loop .r { background:#7a2cf5 }` |

## Using real photos instead of the illustrated covers
Covers are generated SVG scenes (`scene(i)` in the script). To use photos:
1. Put images in an `img/` folder.
2. Add an `img` field to an article in `T` (e.g. `'img/sleep.jpg'`) and change the `card()` template to output `<img src="${a.img}">` inside `.cover` when it exists.
Or just ask Claude to wire it up once you have the photos.

## Light / dark
Opens in light mode; the sun/moon button in the header toggles and remembers the choice (localStorage).
