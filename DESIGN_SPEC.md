Design spec — Cinematic, recruiter-friendly portfolio

Objective
- Turn the existing space-themed portfolio into a recruiter-focused, cinematic landing experience that positions Nandakumar as a professional AI developer while preserving the current story-driven interactions.

Visual Direction
- Hybrid: "Recruiter-friendly premium" + "Cinematic professional". Clean, high-contrast typography, restrained color accents, large hero, and scene-like sections that feel like acts.
- Palette: dark background, warm accent (#f5d26a) and cool accent (#7fd1ff) already present in the design.
- Typography: large condensed headline, readable body (Manrope), monospace for microcopy/labels.

Motion & Interaction Rules
- Scroll-driven story: full-width sections with subtle scroll-snap.
- Motion reserved for guiding attention: reveal, parallax layers (planets/comets), and micro-interactions on CTA.
- Keep animations performant: avoid autoplay videos on mobile, prefer CSS transitions, framer-motion for entry/viewport animations.

Accessibility
- Maintain contrast ratios for text, provide skip links where needed, keyboard focus visible, avoid motion if user prefers reduced-motion.

Section breakdown (data-driven components)
1. Hero / Intro (component: `HeroSection`)
   - Props: `headline`, `subhead`, `ctas: [{label, href, variant}]`, `profilePhoto?`, `reel?`
   - Layout: left-aligned copy, right visual (spaceman stage / profile / poster). Recruiter CTA: "View Work" and "Download Resume".
   - Motion: entrance fade/slide, subtle parallax on visual.

2. Identity / Proof Strip (`ProofStrip`)
   - Small band with key facts: degree, location, role, availability, quick metrics (projects count).

3. Featured Projects (`ProjectCarousel` or `ProjectGrid`)
   - 3–5 case studies. Each card: poster image, title, short summary, stack tags, measurable result, CTA to case study.
   - Data model: {id, title, summary, stack:[], poster, link, outcomes:[]}

4. About / Origin (`AboutPanel`)
   - 3–5 sentence narrative plus one highlight quote and a headshot.

5. Skills / Toolkit (`SkillGroups`)
   - Grouped chips with primary skill groups visible; visual bars for familiarity (0–100).

6. Experience timeline (`ExperienceActs`)
   - Use the existing `ActPanel` pattern but render as an anchored timeline with brief highlights and dates.

7. Services / What I Offer (`OfferGrid`)
   - Short cards, outcome-focused language.

8. Proof / Certifications (`CertStrip`)
   - Badges, links to certs; link to full resume or verification pages.

9. Contact / CTA (`ContactClimax`)
   - Email, LinkedIn, GitHub, WhatsApp link, Resume download button; final short line: "Open to relocation".

Component design principles
- All major blocks accept data props and render neutral markup.
- Projects and experience are sourced from `src/data/*` so editing content is straightforward.
- Keep `panel-glass` look for cards, but increase spacing and a stricter visual hierarchy.

Performance
- Defer heavy 3D (`WorldCanvas`) on mobile with a lightweight static poster; enable `isLowEnd` branch already present.
- Lazy-load project images, compress posters.

Required assets & content I still need from you
- Preferred final homepage headline (exact text). Current: "native ai developer" — confirm casing and wording.
- Short 2–4 sentence summary (you provided; I will refine for readability unless you want exact copy).
- Final list of 3–5 featured project links and poster images (screenshots or URLs). For each: problem, solution, measurable outcome.
- High-resolution profile photo (square, 400–800px) and `Resume.pdf` (optional for download button).
- Any brand colors or logo files (optional).

Implementation plan & next steps (immediate)
- I will implement `HeroSection` first, using existing `hero-grid` and `hero-video-frame` as the visual frame.
- After Hero, I'll implement `ProofStrip` and `ProjectGrid` skeleton, then iterate with your supplied assets.

Questions / confirmations
1. Confirm final headline text (exact casing).
2. Confirm the 3–5 featured projects you want showcased first and provide links/posters for each.
3. Confirm which contact items you want public (email, phone, WhatsApp link, LinkedIn, GitHub).
4. Confirm you want resume download button active and provide `Resume.pdf`.

Timeline
- Hero + proof strip + project skeleton: 1–2 development passes (~today if you confirm assets).
- Complete featured projects + skills + experience: next 2–3 passes (1–2 days depending on assets availability).

Repository notes
- I will commit each major section as an isolated change so we can review and revert if necessary.

File created: `DESIGN_SPEC.md` (this file)

— end of spec
