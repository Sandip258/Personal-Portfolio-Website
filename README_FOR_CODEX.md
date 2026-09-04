# Sandip Ghosh portfolio - build handoff

## Goal

Build a polished, lightweight personal portfolio for Sandip Ghosh, a YouTube Growth Manager / Content Strategy Manager / Creative Operations lead.

The site must work both as:

- a recruiter-facing proof-of-work portfolio; and
- a freelance lead-generation site for creators, education brands, and creator-led teams.

Use the included desktop and mobile wireframes as the visual source of truth.

## Provided wireframes

- personal-portfolio-wireframe.html - desktop landing-page wireframe.
- portfolio-mobile-wireframe.html - mobile layout and freelance conversion flow.

These are visual references, not the app to ship. Rebuild them as a real responsive React/Vite website.

## Positioning

Hero positioning:

> I turn audience insight into YouTube growth systems.

Support message:

> From research and packaging to high-velocity programming, I build content engines that people want to watch - and teams can actually run.

The site should feel like a proof-of-work portfolio for a growth operator, not a generic social-media agency or a pure video-editor gallery.

## Key proof points

Use these accurately and label them as selected six-month portfolio outcomes where relevant:

- 13.07M views across a four-channel portfolio
- 421.7K watch hours
- 49.1K net subscribers gained
- 102M+ impressions
- 2,500+ launches across live, long-form, and Shorts
- Class 10 Endgame: +310% average monthly views, +630% monthly watch time, +73% AVD, 8.7x peak concurrency
- 30-day sprint: 5K to 25K subscribers, 111K watch hours
- Campus Chronicles: personal/independent channel case study

## Visual direction - non-negotiable

- Fixed light theme. Do not use a dark or cyberpunk homepage.
- Base canvas: #F5F8FC
- White surfaces: #FFFFFF
- Soft blue surface: #EDF4FA
- Ink: #102033
- Muted text: #62758C
- Rule/border: #D9E6F1
- Primary blue: #0968D9
- Secondary cyan: #16A6C6
- Use blue for calls to action, charts, links, and active states.
- Use cyan only for small live/API/system signals.
- Feel: light product-tech, editorial, precise, confident, clean.

### Specific tech touches

- A subtle blue dot-grid behind the hero only.
- Small monospaced metadata labels, not monospaced body copy.
- A compact status bar: SYSTEM ONLINE, 4-CHANNEL PORTFOLIO, 2,500+ LAUNCHES, METRICS SYNC: DAILY.
- Thin data rails / connector lines in process and analytics sections.
- API CONNECTED / last-updated metadata in the Channel Desk.
- Avoid fake code windows, heavy neon, excessive glassmorphism, and dashboard clutter.

## Required page structure

1. Top navigation: Work, Reels, System, Channel Desk, Contact.
2. System status bar.
3. Hero with a clear headline, one primary CTA, one secondary CV/link CTA, and featured Endgame proof.
4. Selected impact metric strip.
5. Case studies:
   - Class 10 Endgame turnaround
   - Campus Chronicles
   - 30-day flagship sprint
6. Mid-page visual break:
   - Three popular Shorts/Reels placeholders
   - One primary portrait placeholder
   - Two smaller behind-the-scenes/photo placeholders
7. Operating system / five-step process:
   - Find demand
   - Build formats
   - Program the calendar
   - Run production
   - Iterate from data
8. Channel Desk with public-channel API metric slots and last-updated state.
9. Freelance services:
   - Channel Growth Reset
   - Content Engine
   - Launch or Sprint
10. Strong project-contact section.

## Freelance conversion

Present service outcomes, not generic editing packages.

For the contact area, include three clear routes:

- Send a project brief - primary CTA
- Book a short intro call
- WhatsApp / email directly

The project brief form should be concise:

- Name
- Work email
- Channel / brand
- Audience
- Main goal
- Short project brief

Copy:

> Tell me the channel, the audience and the goal.

> For creators, education brands and creator-led teams that want more than a one-off viral video.

Use placeholder destinations for email, WhatsApp, and calendar until Sandip provides final links.

## Mobile requirements

- Build mobile-first.
- Single-column layout; no horizontal scrolling.
- Collapsible nav.
- Hero CTA visible without excessive scrolling.
- Metric strip becomes a 2x2 grid.
- Case studies stack.
- Freelance services are compact vertical rows.
- Three Reel cards remain visual but do not auto-play.
- Re-show the primary project CTA near the bottom.

## Technical requirements

- Vite + React + TypeScript.
- Keep the first version lightweight and fast.
- Use semantic HTML, accessible buttons, good contrast, and keyboard focus states.
- Use CSS or Tailwind; avoid a large component library unless it materially helps.
- Keep all strings/content in a maintainable data file.
- Use responsive images with placeholders until real photos, thumbnails, and Reel URLs are supplied.

### Channel metrics architecture

Phase 1:

- Display public channel statistics only: subscribers, total views, video count, latest uploads, publishing cadence, and saved 7/30-day movement.
- Use a scheduled server-side/GitHub Action fetch with YouTube Data API.
- Do not expose API keys in frontend assets.
- Save snapshots for historical trend charts.

Phase 2:

- Add authorised YouTube Analytics API data only where the account owner has approved it.
- Never publish confidential employer data by default.

## Final implementation checklist

- Match the included desktop and mobile visual hierarchy.
- Preserve image and Reel slots as obvious placeholders.
- Do not use the previous dark palette.
- Add only real metrics or clearly labelled placeholders.
- Add a polished contact form and the three conversion routes.
- Include a concise README with local run and deploy instructions.
