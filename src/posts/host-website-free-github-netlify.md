---
title: "How to Host a Website for Free with GitHub and Netlify"
seo_title: "Host a Website Free with GitHub + Netlify (2026)"
meta_description: "Put a static website live for free with GitHub and Netlify in about 15 minutes, step by step, plus the free-plan credit limits that can pause your site."
slug: host-website-free-github-netlify
category: Technology
cluster: websites
primary_keyword: how to host a website for free with github and netlify
secondary_keywords: [netlify free plan limits, deploy static site netlify, github netlify tutorial]
intent: how-to
post_type: how-to
date: 2026-11-01
updated: 2026-11-01
draft: true
affiliate: false
cover_alt: "A GitHub repository connected to a live Netlify site"
faq:
  - q: "Is Netlify really free?"
    a: "Yes. New accounts get a Free plan with 300 credits a month at no cost. A production deploy uses 15 credits and bandwidth uses 20 credits per GB, so a small site fits easily. If you run out, Netlify pauses your sites until the next month."
  - q: "Do I need to know how to code?"
    a: "No. For a site that is already built (HTML, CSS and JavaScript files), you only upload files to GitHub and click through Netlify's import screen."
  - q: "Can I use my own domain for free?"
    a: "Netlify connects a custom domain at no extra cost and adds free HTTPS. You still pay your domain registrar for the domain itself, usually around $10–15 a year for a .com."
  - q: "Does my GitHub repository have to be public?"
    a: "No. Netlify can deploy private GitHub repositories too. Choose private if you do not want people to see your source files."
---

**You can put a website live for free in about 15 minutes:** upload its files to a GitHub repository, then import that repository into Netlify. Netlify gives you a live `yoursite.netlify.app` address, free HTTPS, and redeploys automatically every time you change a file on GitHub.

I set up this exact flow for Kaleido on 30 October 2026. Below is every step, plus one thing most tutorials skip: Netlify's free plan now runs on credits, and if you deploy too often, your site can be paused.

**Key takeaways**

- GitHub stores your files. Netlify builds and serves them.
- The whole setup is free and takes about 15 minutes for a site that is already built.
- New Netlify accounts get 300 free credits a month. Each production deploy costs 15 credits, so about 20 deploys a month is the ceiling before bandwidth.
- Batch your changes into fewer deploys if you update the site often.

## What you need

- A **GitHub account** (free) at github.com
- A **Netlify account** (free) at netlify.com. Signing up with GitHub saves a step.
- Your website files: at minimum an `index.html`. Any CSS, JavaScript and images go with it.
- Optional: a `netlify.toml` file to save your build settings. For a plain HTML site, it can be as small as this:

```toml
[build]
  publish = "."
```

That tells Netlify to serve the files from the main folder, with no build step.

## Step 1: Create a GitHub repository

1. Go to **github.com/new**.
2. Give the repository a short name, for example `my-website`.
3. Choose **Public** or **Private**. Netlify can deploy both.
4. Leave "Add a README" **off** if you already have your own files. It keeps the first upload clean.
5. Click **Create repository**.

[NOUMAN: screenshot of the GitHub "Create a new repository" screen]

## Step 2: Upload your website files

1. On the new, empty repository page, click **uploading an existing file**.
2. Drag in your files, or click **choose your files**.
3. Wait until every file shows in the list, then click **Commit changes**.

Your files are now on GitHub. One tip: files whose names start with a dot (like `.gitignore`) can be hidden on Mac and Windows. Turn on "show hidden files" if one is missing.

## Step 3: Import the repository into Netlify

1. In Netlify, go to **Add new project → Import an existing project**, or open **app.netlify.com/start**.
2. Under **Import a Git repository**, click **GitHub**.
3. The first time, GitHub asks you to authorize Netlify and choose which repositories it can see. Pick the one you just made, or all of them.
4. Select your repository from the list.

[NOUMAN: screenshot of Netlify's repository list]

## Step 4: Check the build settings and deploy

Netlify shows a settings screen. For a plain HTML site:

| Setting | What to enter |
|---|---|
| Project name | Anything short. It becomes `name.netlify.app` |
| Branch to deploy | `main` |
| Base directory | Leave empty |
| Build command | Leave empty |
| Publish directory | `.` (or leave it, if your `netlify.toml` sets it) |

If your site uses a framework, set the build command it needs (for example `npm run build`) and its output folder (often `dist` or `_site`).

Click **Deploy**. The first deploy of a small site usually finishes in under a minute.

## Step 5: Open your live site

When the deploy finishes, your site is live at `https://your-project-name.netlify.app`. Open it and click through every page. Kaleido's first deploy was live within about a minute of clicking Deploy.

From now on, **every change you commit to the `main` branch on GitHub redeploys the site automatically.** You never upload to Netlify directly again.

## The free plan limit most tutorials miss

Netlify moved new accounts to credit-based pricing on **4 September 2025**. Accounts created before that date stay on the older legacy plans unless they switch.

On the credit-based **Free plan** (checked on Netlify's docs, 30 October 2026):

| Item | Cost |
|---|---|
| Monthly allowance | 300 credits, hard limit |
| One production deploy | 15 credits |
| Bandwidth | 20 credits per GB |
| Web requests | 2 credits per 10,000 requests |
| Form submissions | Free |
| Deploy previews and failed deploys | Not counted |

**What happens if you run out?** Netlify's docs say that once the balance is used up, all your sites are paused and visitors see a "Site not available" page until the next month. There is no option to buy more credits on the Free plan.

**What this means in practice:**

- **20 deploys and nothing else** would use all 300 credits.
- A site that deploys **once a day** (30 deploys) needs 450 credits a month before any traffic. That is over the free limit.
- If you update often, **batch changes** into one commit a day or less, upgrade to a paid plan, or use a host with more generous build limits for static sites.

[NOUMAN: your take, which option you chose for Kaleido and why]

## Common problems and fixes

| Problem | Likely cause | Fix |
|---|---|---|
| "Page not found" on the live site | `index.html` is inside a subfolder | Move it to the top level, or set that folder as the publish directory |
| Styles or images missing | Paths point to files on your computer | Use relative paths like `assets/style.css` |
| Repository not in Netlify's list | Netlify was not given access to it | Click "Configure the Netlify app on GitHub" and add the repository |
| Deploy fails | Wrong build command for a framework | Check the deploy log in Netlify; the error is usually on the last lines |

## Next steps

- **Connect your own domain** in Netlify under **Domain management**. HTTPS is added automatically.
- **Add your site to Google Search Console** so Google can find and index your pages.
- **Keep an eye on credits** under your team's billing page if you are on the Free plan.

Sources: [Netlify credit-based pricing plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/), [How Netlify credits work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/), [Netlify pricing changelog, April 2026](https://www.netlify.com/changelog/2026-04-14-pricing-updates-april-2026/).
