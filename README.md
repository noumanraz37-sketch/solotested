# Kaleido

Honest, tested guides to AI and automation for freelancers and small teams.
Built with [Eleventy](https://www.11ty.dev/) and deployed on Netlify. Every push to `main` rebuilds the site.

## Publish a post
1. Add a Markdown file to `src/posts/` named after its slug, e.g. `src/posts/make-vs-n8n-freelancers.md`.
2. Use the front matter from the Kaleido post template (title, seo_title, meta_description, slug, category, date, faq, ...).
3. Commit and push to `main`. Netlify builds and publishes in about a minute.

- `draft: true` keeps a post off the live site.
- A future `date` keeps a post hidden until the first build on or after that date.
- `affiliate: true` adds the disclosure line at the top. Mark affiliate links as `[Try X](https://...){rel="sponsored nofollow"}`.
- `cover: /images/file.jpg` (with `cover_alt`) replaces the illustrated cover. Put images in `src/images/`.

## Where things live
| What | Where |
|---|---|
| Site name, URL, author bio, links | `src/_data/site.js` |
| Categories | `src/_data/categories.js` |
| Post layout (byline, TOC, FAQ, schema) | `src/_includes/post.njk` |
| Header, footer, meta tags | `src/_includes/base.njk` |
| Cards and newsletter block | `src/_includes/macros.njk` |
| Styles | `src/assets/style.css` |
| Policy pages | `src/*.md` |

Forms (newsletter, contact) use Netlify Forms. Submissions show in Netlify under **Forms**.
The sitemap (`/sitemap.xml`) and `robots.txt` are generated on every build. The site URL comes from Netlify's `URL` variable, so it switches to the custom domain automatically.

## Local preview
`npm install` then `npm start` (shows drafts and future posts).
