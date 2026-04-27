# Map2Close Website — Draft 3 PRD
**Version:** Draft 3 Change Spec  
**Source:** D2 Review Session — April 21, 2026  
**Scope:** Incremental fixes and content updates. Not a redesign.

---

## Delivery Tiers

| Tier | Description |
|------|-------------|
| **Tier 1** | Must ship in D3. No exceptions. |
| **Tier 2** | Design polish. Ship with D3 if possible. |
| **Tier 3** | Content-dependent. Blocked on copy/assets from Ahmed. |

---

## 1. Global / Site-Wide

### 1.1 Typography — Gold Standard

**Reference:** The "What We Do" Overview page (pipeline animation page) is the canonical typography reference. Every page must match it exactly.

| Rule | Requirement |
|------|-------------|
| Font family | Match Overview page exactly — all titles, subtitles, body |
| Letter spacing | Match Overview page |
| Line spacing | Match Overview page — fix any sections that read "too tight" |
| Weight | Match Overview page |
| Italics | **Remove all italics site-wide. Zero exceptions.** |
| Em dashes | **Remove all em dashes site-wide. Replace with commas or restructure the sentence.** |
| Subtitle line spacing | Fix tight spacing — use RevOps Custom Buildouts body text as the secondary reference |

**Tier: 1**

---

### 1.2 Heading Color Treatment

- Green (`#62D2A2`) and coral/red (`#F96B6B`) highlight colors are only applied to **specific highlighted words**, never to full lines or sentences.
- Green and red must **not appear on the same line** or in close proximity within a heading.
- They can appear in the same paragraph block, just not adjacent to each other.

**Tier: 1**

---

### 1.3 Layout — Empty Space Treatment

- **Remove all gradient-background-with-text-only sections.** These read as "2010 PowerPoint." Replace with a proper design solution using: lines, dots, dividers, or graphic elements.
- Design system used to fill empty space does **not need to be consistent** across the entire site — use what fits each section.
- **Exception:** The subtle footer gradient is approved and stays as-is.
- Use Moda to generate design references where needed.

**Tier: 2**

---

### 1.4 Performance & Animations

- Audit and remove all dead or extraneous code site-wide.
- Resolve all animation and scrolling glitches: pipeline graphic, robot section, hero build graphic, case study carousel.
- All animations must run smoothly on **basic consumer laptops**, not just high-spec machines.
- No first-load vs. subsequent-load behavior differences on any animated element.

**Tier: 1**

---

### 1.5 Mobile

- Full mobile optimization pass on every page.
- **Priority issue:** Pipeline animation mobile layout — text runs off-screen on certain viewports.

**Tier: 1**

---

## 2. Homepage

### 2.1 Hero Section

- Hero is **approved**. Minimal changes.
- Globe animation with mouse tracking + lighting effect: **approved, keep as-is**.
- **Fix:** Hero graphic animation glitches on first load and smooths out after a few interactions. Must be smooth on first load, every time.

**Tier: 1**

---

### 2.2 Build Graphic (Rep Enablement / RevOps section)

- Must be perfectly smooth on first scroll, every time, on any laptop.
- **Remove the word "Custom"** from the "Diagnose / Build / Pilot / Scale" step label.
- Animation glitch: confirmed fixed — keep as-is otherwise.

**Tier: 1**

---

### 2.3 Case Study Carousel

- **Fix dragging.** Currently broken — requires two-finger scroll instead of click-drag.
- Pick **one interaction word** — either "Drag" or "Swipe" — and use it consistently everywhere.
- Add the chosen instruction word inside a **circle element placed under the Map2Close logo** so users know the carousel is interactive.
- Case study thumbnails (Pinecone, Signpost, etc.) are AI-generated placeholders — acceptable for now, tabled until real images are available.

**Tier: 1 (fix drag) / Tier 2 (circle indicator)**

---

## 3. Who We Are / Company Page

### 3.1 Copy

- Change **"By salespeople for salespeople"** to **"By sales teams, for sales teams."**
- Expand page content — use additional copy available in the source doc that is not currently on the page.
- Add content from the old Hostinger WordPress site (sent via Slack PDF) to give this page more substance. Use **different design treatments** for the added sections — do not just repeat the same layout used for existing content.

**Tier: 1 (copy fix) / Tier 3 (expanded content)**

---

### 3.2 Typography & Design

- Increase font size on the Who We Are hero section.
- Font on the logo animation must follow the universal font rules (Section 1.1).
- **Dictionary-style design** for key terms (e.g., "enablement partner"): attempt a definition-format treatment that looks like a dictionary entry. If it doesn't work visually, use a different design — designer's call.
- Kill the gradient-background-with-text section. Replace with lines/dots/graphic fill (Moda references).

**Tier: 2**

---

### 3.3 Comparison / Competitor Section

- Change **red text next to red bullets to white** for readability. Keep the bullet dots themselves red.
- **Generalize all competitor names.** Do not name specific companies.

| Current Name | Replace With |
|---|---|
| Gong | Revenue Intelligence and Call Analytics |
| Common Room | Signal and Intent platforms |
| *(from old site)* | Lead gen tools |
| *(from old site)* | Data scraping tools |
| *(from old site)* | RevOps and CRM |
| *(from old site)* | Sales training firms |
| *(keep as-is)* | Traditional sales consultancy |

- **Do not name-drop Clay, Apollo, or ZoomInfo** anywhere as problem examples (partner conflict risk).
- Add additional categories sourced from old WordPress site — use **different design treatments** for the additions, not the same layout as existing comparison rows.

**Tier: 1 (red text + name removal) / Tier 3 (expanded categories)**

---

## 4. What We Do — Overview Page (Pipeline Animation)

> This page is the gold standard for typography, spacing, and body text. Do not change the type treatment here.

### 4.1 Pipeline Animation

- Fix animation glitches — does not always flow through the pipeline smoothly.
- Fix light flickering (caused by animation not opening fully).
- Add green design accents or graphic elements behind / around the pipeline to fill empty surrounding space.

**Tier: 1 (glitch fix) / Tier: 2 (accents)**

---

### 4.2 Copy

- Replace **"high fidelity revenue systems"** with **"high quality revenue systems"**. ("Fidelity" is an audio/visual reproduction term — wrong context.)
- Add **"and many more"** to the tool integration logo list to signal the stack is not limited to the logos shown.

**Tier: 1**

---

## 5. Sales Enablement Hub

- Fix the **background render glitch** that requires a page refresh.
- Apply gold-standard typography from the Overview page (Section 1.1).
- Fix drag-and-drop interaction under "This is what we mean by execution" — same fix as homepage carousel (Section 2.3).
- Flesh out page content using copy from the source web structure doc.

**Tier: 1 (glitch + drag fix) / Tier: 3 (content)**

---

## 6. RevOps Implementations

- Add a **title to the section under the logos** (currently untitled).
- Remove the **"Z" logo** — it is the old Zoom logo and is no longer correct.
- Verify the **Pipedrive logo** — may also be outdated, replace if so.
- Fix the **scrolling logo carousel frame drop / loop glitch**.
- Add the **"How We Run It" section** from the original web structure doc — new section, new design treatment.

**Tier: 1 (logo fixes + carousel glitch) / Tier: 3 (How We Run It section)**

---

## 7. RevOps Custom Buildouts

> Flagged for heavy revision in D3.

### 7.1 Structure & Copy

- **Hero section:** Trim to fit viewport — currently extends past a full screen when not in fullscreen mode.
- Add a **title above the features list** (e.g., "What's Included") so the stacked items have clear context.
- Verify all **"How We Do It" example links** go to their correct corresponding case study pages.
- Flush out page with more content from the source doc.

**Tier: 1 (hero trim, title) / Tier: 3 (content expansion)**

---

### 7.2 Interactivity

- Add a **click indicator** to the stack feature list items so users know they are clickable. Options: subtle glow, finger tap animation, or cursor/mouse animation.
- Do **not** use text like "Click here."

**Tier: 2**

---

### 7.3 Typography

- Fix **subtitle text spacing** — currently too tight vs. the gold standard.
- **Unbold** subtext and body copy where bolding reads awkwardly.

**Tier: 1**

---

## 8. Map2Close AI (Mappy / Robot Page)

- Edit the robot graphic to add the planned **Iron Man feature**.
- Page design is **approved overall**.
- "Join the waitlist" CTA is **approved**.
- **Center** the last feature card: "Instant Workflow Action."

**Tier: 2 (Iron Man graphic) / Tier: 1 (center last card)**

---

## 9. Individual Case Study Pages

- Body pages need **background and design work** — currently too much unused left-hand whitespace.
- Treat these as **long-form blog-style posts**, not one-pager bite-size layouts.
- **Remove all fabricated results claims.** Only ZenaTech has verified real numbers. All other result claims must be reworded as projected or directional.
  - Source real numbers from the initial web structure doc.
  - Prompt the copy to frame them as projected/directional in a subtle, non-obvious way.

**Tier: 1 (fabricated results) / Tier: 2 (design work)**

---

## 10. The Pilot Page

### 10.1 Copy

- Change **"3 to 6 week engagement"** to **"3 to 6 month engagement"**.
- Flesh out the **Guarantees / bottom section** (starting with "Define the outcome...") — currently too sparse with too much black space.

**Tier: 1 (copy fix) / Tier: 3 (content expansion)**

---

### 10.2 Design

- **Plane graphic:** Landing gear must be up. We are not near land in the image.
- "What You Get" card-style layout: **approved**.
- Antigravity free-roam design decorations: **approved**.

**Tier: 2**

---

### 10.3 Interactivity

- **"See how the pilot works" button:** Currently jumps instantly. Replace with a **smooth scroll** down the page.
- Fix first-load vs. subsequent-load behavior inconsistency on this scroll button.

**Tier: 1**

---

## Summary: Tier 1 Checklist

The following must be resolved before D3 is delivered:

- [ ] Remove all italics site-wide
- [ ] Remove all em dashes site-wide
- [ ] Apply Overview page font/spacing as gold standard everywhere
- [ ] Fix pipeline animation glitches
- [ ] Fix case study carousel drag on homepage
- [ ] Generalize competitor names in comparison section
- [ ] Fix red text (not bullets) to white in comparison section
- [ ] Update "By sales teams, for sales teams"
- [ ] Replace "high fidelity" with "high quality"
- [ ] Remove "Custom" from Diagnose/Build/Pilot/Scale
- [ ] Fix hero graphic first-load animation glitch
- [ ] Fix Sales Enablement Hub background render glitch
- [ ] Fix drag interaction on Sales Enablement Hub carousel
- [ ] Remove old Zoom "Z" logo from RevOps Implementations
- [ ] Fix RevOps logo carousel loop glitch
- [ ] Fix RevOps Custom Buildouts hero overflow
- [ ] Add title above RevOps Custom Buildouts features list
- [ ] Fix RevOps Custom Buildouts subtitle text spacing
- [ ] Unbold awkward body text in RevOps Custom Buildouts
- [ ] Center "Instant Workflow Action" card on Mappy page
- [ ] Remove fabricated results from case study pages
- [ ] Change "3 to 6 week" to "3 to 6 month" on Pilot page
- [ ] Fix "See how the pilot works" to smooth scroll
- [ ] Mobile optimization pass — priority: pipeline animation layout

---

*Last updated: April 21, 2026 — based on D2 review session transcript.*
