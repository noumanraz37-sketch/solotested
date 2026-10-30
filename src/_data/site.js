// Netlify sets URL to the site's primary address (your custom domain once connected).
export default {
  name: "Kaleido",
  url: (process.env.URL || "https://kaleido-magazine.netlify.app").replace(/\/$/, ""),
  tagline: "Honest guides to AI and automation for freelancers and small teams",
  description: "Kaleido publishes honest, tested guides to AI tools, automation and running a small business, written for freelancers, solo founders and small teams.",
  email: "nouman@noumanraza.com",
  year: new Date().getFullYear(),
  author: {
    name: "Nouman Raza",
    slug: "nouman-raza",
    initials: "NR",
    role: "Founder & Editor",
    short: "Graphic designer and creative strategist from Gujranwala, Pakistan. Nouman writes about the AI tools and automations he uses every day in client work.",
    links: {
      LinkedIn: "https://www.linkedin.com/in/noumandzn/",
      Behance: "https://www.behance.net/noumanraza",
      YouTube: "https://www.youtube.com/@nomanraz3"
    }
  }
};
