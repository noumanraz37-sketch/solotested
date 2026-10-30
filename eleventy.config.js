import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import { SHOW_SAMPLES, FILL_TO, makeSamples } from "./samples.js";

// Illustrated cover art (same generator as the original design), rendered at build time.
const PAL = [["#f08a2d","#ffd9ad","#b8500d"],["#b9d8a3","#f4f9e8","#5f8a44"],["#d7e3f2","#fff","#7893b5"],["#1f6f8c","#dff4fb","#0d3f52"],["#c2302b","#ffe3d6","#6e120f"],["#f3c34d","#fff6d6","#a37a10"],["#8b5cf6","#e9ddff","#3c1e87"],["#e9e5df","#fff","#8a7e6b"],["#1b3a6b","#cfe0ff","#0a1a36"],["#2d7a5a","#d4f3e2","#123d2b"],["#ffd9c7","#fff","#ff5e3a"],["#17161b","#8de3ff","#c7ff3a"]];
const OBJ = ["#ff7a1a","#f3b2b6","#ff6a9a","#ffffff","#f7e9d7","#ffb347","#d946ef","#2a2a2a","#ff7a1a","#cde9b5","#ff5e3a","#c7ff3a"];
let sceneCounter = 0;
function scene(i) {
  i = Math.abs(i | 0);
  const [bg, hi, sh] = PAL[i % 12], o = OBJ[i % 12], k = i % 4, id = "g" + i + "x" + (sceneCounter++);
  const defs = `<defs><radialGradient id="${id}s" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".45" stop-color="${o}"/><stop offset="1" stop-color="${sh}"/></radialGradient><linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}" stop-opacity=".9"/><stop offset="1" stop-color="${bg}"/></linearGradient><linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${sh}" stop-opacity=".55"/><stop offset="1" stop-color="${sh}" stop-opacity="0"/></linearGradient><filter id="${id}b" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs>`;
  const room = `<rect width="400" height="300" fill="${bg}"/><rect width="400" height="190" fill="url(#${id}w)"/><rect y="190" width="400" height="110" fill="${sh}" opacity=".18"/><path d="M0 0 L140 0 L230 300 L0 300Z" fill="${hi}" opacity=".18"/><rect width="400" height="300" fill="url(#${id}f)"/>`;
  let obj = "";
  if (k === 0) obj = `<ellipse cx="205" cy="232" rx="95" ry="18" fill="${sh}" opacity=".55" filter="url(#${id}b)"/><circle cx="200" cy="150" r="78" fill="url(#${id}s)"/>`;
  if (k === 1) obj = `<ellipse cx="210" cy="240" rx="110" ry="16" fill="${sh}" opacity=".5" filter="url(#${id}b)"/><polygon points="130,120 200,90 270,120 200,150" fill="${hi}"/><polygon points="130,120 200,150 200,240 130,210" fill="${o}"/><polygon points="270,120 200,150 200,240 270,210" fill="${sh}"/>`;
  if (k === 2) obj = `<ellipse cx="200" cy="238" rx="90" ry="16" fill="${sh}" opacity=".5" filter="url(#${id}b)"/><ellipse cx="200" cy="110" rx="50" ry="18" fill="${hi}"/><path d="M150 230 A50 18 0 0 0 250 230 L250 110 L150 110Z" fill="${o}"/><path d="M150 110 L150 230 A50 18 0 0 0 190 246 L190 110Z" fill="#fff" opacity=".16"/>`;
  if (k === 3) obj = `<ellipse cx="200" cy="242" rx="100" ry="16" fill="${sh}" opacity=".5" filter="url(#${id}b)"/><path d="M140 240 L140 150 A60 60 0 0 1 260 150 L260 240 L225 240 L225 155 A25 25 0 0 0 175 155 L175 240Z" fill="${o}"/><circle cx="200" cy="200" r="22" fill="url(#${id}s)"/>`;
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}${room}${obj}</svg>`;
}
const hash = (s = "") => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
const slugify = (s = "") => String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// A sample is replaced when a real post has the same slug or the same title
const norm = (t = "") => String(t).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const isReplaced = (s, real) => real.some((p) => p.data.slug === s.data.slug || norm(p.data.title) === norm(s.data.title));

export default function (eleventyConfig) {
  const md = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItAnchor, { slugify, level: [2, 3] })
    .use(markdownItAttrs);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  eleventyConfig.addShortcode("scene", (seed) => scene(typeof seed === "number" ? seed : hash(seed)));
  eleventyConfig.addFilter("slugify", slugify);
  eleventyConfig.addFilter("md", (s = "") => md.renderInline(String(s)));
  eleventyConfig.addFilter("displayDate", (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v).replace(/</g, "\\u003c"));
  eleventyConfig.addFilter("readTime", (content = "") => Math.max(1, Math.round(String(content).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 230)));
  eleventyConfig.addFilter("toc", (html = "") => [...String(html).matchAll(/<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/g)].map((m) => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") })));
  eleventyConfig.addFilter("byCategory", (posts = [], cat) => posts.filter((p) => p.data.category === cat));
  eleventyConfig.addFilter("related", (posts = [], page) => {
    const same = posts.filter((p) => p.url !== page.url && p.data.category === page.data?.category);
    const other = posts.filter((p) => p.url !== page.url && p.data.category !== page.data?.category);
    return same.concat(other).slice(0, 3);
  });
  eleventyConfig.addFilter("limit", (arr = [], n = 3, start = 0) => arr.slice(start, start + n));
  eleventyConfig.addFilter("excerpt", (s = "", n = 160) => { s = String(s); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; });

  // Published posts, newest first (drafts and future dates excluded in production)
  eleventyConfig.addCollection("posts", (api) => {
    const now = Date.now();
    return api.getFilteredByGlob("src/posts/*.md")
      .filter((p) => !p.data.draft && (process.env.ELEVENTY_RUN_MODE === "serve" || process.env.PREVIEW || p.date.getTime() <= now))
      .sort((a, b) => b.date - a.date);
  });

  // Samples not yet replaced by a real post with the same slug
  eleventyConfig.addCollection("samples", (api) => {
    if (!SHOW_SAMPLES) return [];
    const real = api.getFilteredByGlob("src/posts/*.md").filter((p) => !p.data.draft);
    return makeSamples().filter((s) => !isReplaced(s, real));
  });
  // Everything shown in lists: real posts first, then samples to fill empty spots
  eleventyConfig.addCollection("feed", (api) => {
    const now = Date.now();
    const real = api.getFilteredByGlob("src/posts/*.md")
      .filter((p) => !p.data.draft && (process.env.ELEVENTY_RUN_MODE === "serve" || process.env.PREVIEW || p.date.getTime() <= now))
      .sort((a, b) => b.date - a.date);
    if (!SHOW_SAMPLES || real.length >= FILL_TO) return real;
    const fill = makeSamples().filter((s) => !isReplaced(s, real)).slice(0, FILL_TO - real.length);
    return real.concat(fill);
  });
  // Featured: posts marked featured: true, then newest. Popular: posts marked popular: true, then the rest.
  eleventyConfig.addFilter("featured", (feed = [], n = 3) => feed.filter((p) => p.data.featured).concat(feed.filter((p) => !p.data.featured)).slice(0, n));
  eleventyConfig.addFilter("without", (feed = [], ...lists) => { const used = new Set(lists.flat().map((p) => p.url)); return feed.filter((p) => !used.has(p.url)); });
  eleventyConfig.addFilter("popular", (feed = [], n = 6) => feed.filter((p) => p.data.popular).concat(feed.filter((p) => !p.data.popular)).slice(0, n));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
