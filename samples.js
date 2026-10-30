// Placeholder cards shown until real posts fill the site.
// - A sample disappears automatically when a real post with the same slug is published.
// - Samples only fill empty spots: once there are enough real posts, none are shown.
// - Turn them all off with SHOW_SAMPLES below (do this before applying for AdSense).
export const SHOW_SAMPLES = true;
export const FILL_TO = 24; // homepage + articles page look full with ~24 cards

const list = [
  ["Make vs n8n: Which Is Better for Freelancers?", "Technology", "Price, ease of use and limits compared for solo freelancers running client work."],
  ["How to Automate Client Onboarding with Zapier, Step by Step", "AI", "The exact automation that sends contracts, invoices and welcome emails without you."],
  ["Best AI Tools for Static Ad Design", "Marketing", "The tools that actually speed up ad creative work, and where a designer still wins."],
  ["What Is an AI Agent? A Plain-English Guide", "AI", "What AI agents are, how they work, and what they can and cannot do for a small team."],
  ["How to Write a Business Plan with AI, Step by Step", "Business", "Use AI to draft a real business plan in an afternoon, with prompts you can copy."],
  ["Otter.ai vs Fireflies.ai: Which Note Taker Is Better?", "Technology", "Two AI meeting note takers tested on the same calls, with a clear verdict."],
  ["How to Use AI to Make Facebook Ad Creatives That Do Not Look AI-Made", "Marketing", "A designer's workflow for ad creatives that use AI without looking generic."],
  ["Cheaper Zapier Alternatives for Small Businesses", "Technology", "Automation tools that do most of what Zapier does for a fraction of the price."],
  ["How to Price Freelance Design Services", "Business", "Hourly, per project or retainer: how to set prices clients accept."],
  ["How to Automate Invoice Reminders Without Paying for Software", "AI", "Stop chasing late payments by hand with a free automation you set up once."],
  ["ChatGPT vs Claude for Small Business Writing Tasks", "AI", "Emails, proposals and posts: which assistant writes better for a small business."],
  ["What Is n8n, and Is It Really Free?", "Technology", "What n8n does, what the free option includes, and who should use it."],
  ["Best AI Meeting Note Takers for Small Teams", "Technology", "The best tools for recording, summarizing and sharing meeting notes."],
  ["How to Get Your First Freelance Clients Without Upwork", "Business", "Practical ways to land the first paying clients outside the big marketplaces."],
  ["AI Prompts for Ad Copy, with Real Examples", "Marketing", "Prompts that produce usable hooks, headlines and primary text."],
  ["How to Host a Website for Free with GitHub and Netlify", "Technology", "Put a static site live for free, plus the free-plan limits to watch."],
  ["10 Automations Every Freelancer Should Set Up First", "AI", "The highest-value automations to save hours every week."],
  ["How to Write SOPs with AI for a Small Team", "Business", "Turn messy processes into clear step-by-step guides your team follows."],
  ["Canva AI vs Adobe Firefly for Marketing Images", "Marketing", "Which AI image tool is better for social posts and ads."],
  ["What Is MCP (Model Context Protocol)? Explained for Non-Developers", "AI", "What MCP is and why it matters for the AI tools you already use."],
  ["Notion AI vs ClickUp AI for Small Teams", "Technology", "Two all-in-one workspaces compared on their AI features and price."],
  ["Cold Email Templates That Get Replies", "Business", "Short, specific cold emails with real examples and why they work."],
  ["How to Research Competitor Ads with the Meta Ad Library", "Marketing", "Find what competitors run, how long it runs, and what to learn from it."],
  ["How to Set Up a Professional Email on Your Own Domain", "Technology", "A step-by-step guide to an email address on your own domain."]
];
const slug = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function makeSamples() {
  const now = new Date();
  return list.map(([title, category, desc], i) => {
    const s = slug(title);
    const d = new Date(now); d.setUTCDate(d.getUTCDate() - i);
    return {
      url: `/preview/${s}/`, date: d, sample: true, content: "",
      data: { title, category, slug: s, meta_description: desc, read_time: 5 + (i % 5), sample: true },
    };
  });
}
