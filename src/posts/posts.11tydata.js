// Defaults for every post.
// - `draft: true` keeps a post off the live site.
// - A future `date` keeps the post hidden until a build runs on/after that date.
const hidden = (data) => {
  if (data.draft) return true;
  if (process.env.ELEVENTY_RUN_MODE === "serve" || process.env.PREVIEW) return false;
  const d = data.page?.date ? new Date(data.page.date).getTime() : 0;
  return d > Date.now();
};
export default {
  layout: "post.njk",
  tags: "post",
  author: "Nouman Raza",
  eleventyComputed: {
    permalink: (data) => (hidden(data) ? false : `/${data.slug || data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => hidden(data),
  },
};
