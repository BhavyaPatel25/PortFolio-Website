# Portfolio Rebuild Plan — Clean Editorial / Swiss Dark

## Design Direction (based on 2025–2026 research)

The current cyberpunk/glassmorphism aesthetic is dated. The 2026 tech portfolio standard is **Clean Editorial / Swiss-Inspired Minimalism with Dark Mode**. Hiring managers and recruiters favor portfolios that feel like they were built by a real person, not a template. The key principle: *"Cut anything that adds visual interest but slows someone down."

### Core Principles
1. **Typography is the hero** — massive headings, strong hierarchy, mono eyebrow labels
2. **Sharp geometry** — flat edges, visible grid structure, no heavy `rounded-3xl`
3. **One accent color** — keep violet `#8B5CF6` as the brand anchor
4. **Subtle motion only** — scroll reveals, hover inversions, nav underline mask
5. **Dark mode default** — 2026 tech portfolio standard
6. **Case studies over galleries** — show *how you think*, not just *what you made*
7. **Mobile-first** — significant views happen on phones

### What Gets Cut
- ALL Three.js / React Three Fiber scenes (`HeroEnhanced`, `SkillsGlobe`)
- ALL canvas particle systems (`TechParticles`, `ScrollParticles`, `WaveBackground`)
- ALL glassmorphism (`glass`, `glass-hover` classes)
- Emoji project icons
- Terminal/code aesthetic (red/yellow/green dots, `.sh` filenames)
- Rounded-2xl/3xl everywhere → flat or subtle rounding
- Excessive Framer Motion variants

### What Gets Added
- Section number watermarks (`01`, `02`...)
- Mono eyebrow labels (`ABOUT`, `PROJECTS`...)
- Left-border accent bars on cards
- Skills/tools marquee ticker
- Invert-fill buttons with `cubic-bezier(0.22, 1, 0.36, 1)` easing
- Animated nav underline mask (slides between links)
- Subtle dot-grid or line-grid background at very low opacity
- Case study format for top 3 projects

---

## Color & Token Changes

### Current → New
| Token | Current | New |
|-------|---------|-----|
| Background | Pure black `#000` | Warm charcoal `#0a0a0f` |
| Surface | `glass` rgba | Flat `#111118` with `border-white/10` |
| Primary accent | Violet `#8B5CF6` | Same — keep brand |
| Secondary accent | Cyan `#00D9FF` | Muted to `#7c8bb5` (slate-blue) |
| Text primary | White | Off-white `#f0f0f5` |
| Text muted | White/50 | `#8a8a9a` |
| Border | White/10 | `#1a1a24` |

### New CSS Variables
```css
--bg-primary: #0a0a0f;
--bg-surface: #111118;
--bg-elevated: #16161f;
--text-primary: #f0f0f5;
--text-secondary: #8a8a9a;
--text-tertiary: #4a4a5a;
--accent: #8B5CF6;
--accent-muted: rgba(139, 92, 246, 0.15);
--border: #1a1a24;
```

---

## File-by-File Implementation

### 1. `src/index.css` — Full Rewrite
- Replace all color variables with new palette
- Delete `glass`, `glass-hover`, `glow-*`, `noise-overlay`, `aurora-border`, `spotlight` utilities
- Add new utilities: `section-number`, `eyebrow`, `accent-border`, `invert-btn`
- Keep `text-gradient` but make it subtler (violet → slate-blue)
- Keep `prefers-reduced-motion` and scrollbar styling
- Add marquee keyframes for skills ticker

### 2. `src/App.tsx` — Simplify
- Remove `<TechParticles />`
- Remove `<Sonner />` (keep `<Toaster />` only)
- Keep `<Chatbot />` but it will be restyled via CSS
- Keep `<HelmetProvider>`, `<QueryClientProvider>`, `<TooltipProvider>`, `<BrowserRouter>`

### 3. `src/pages/Index.tsx` — Minor
- Keep section order
- Update Helmet meta tags with current year
- Remove `<ScrollParticles />`

### 4. `src/components/sections/Hero.tsx` — Rebuild
- Delete `InteractiveHero` entirely
- New hero: full-viewport, typography-forward
- Giant name in Space Grotesk (8xl/9xl)
- Mono eyebrow label: `AI Engineer & Applied ML Researcher`
- Subtle dot-grid background at `opacity: 0.03`
- Two CTAs: `View Projects` (invert-fill) + `Download Resume` (outline)
- Stats row at bottom with simple numbers
- No canvas, no Three.js, no particles

### 5. `src/components/sections/About.tsx` — Restyle
- Keep bento grid concept but flat
- Sharp corners (`rounded-lg` max)
- Left-border accent bars (`border-l-2 border-accent`) instead of gradient backgrounds
- Remove terminal-style quote block → simple paragraph with mono label
- Section number watermark: `01`
- Eyebrow: `ABOUT`

### 6. `src/components/sections/Experience.tsx` — Restyle
- Flat timeline cards with left accent border
- Expandable details stay (good UX)
- Remove glass backgrounds → flat `bg-surface` with `border`
- Mono index numbers: `00`, `01`, `02`...
- Section number: `02`
- Eyebrow: `EXPERIENCE`

### 7. `src/components/sections/Projects.tsx` — Case Study Format
- Convert top 3 projects into case studies:
  - Context / Challenge / Approach / Tech Stack / Results
- Remove emoji icons → abstract shapes or just Lucide icons
- Sharp cards with hover invert-fill
- Featured project gets full-width treatment
- Section number: `03`
- Eyebrow: `PROJECTS`
- Link to GitHub for remaining projects (list view)

### 8. `src/components/sections/Skills.tsx` — Marquee + Grid
- Add marquee ticker of all skill names at top
- Flat category tabs (no terminal styling)
- Skill pills: flat, border, no emojis (use SimpleIcons only)
- Section number: `04`
- Eyebrow: `SKILLS`

### 9. `src/components/sections/Publications.tsx` — Editorial Flat
- Remove terminal header → flat card with accent left border
- Keep publication details but cleaner
- Certifications as flat bordered cards
- Section number: `05`
- Eyebrow: `RESEARCH`

### 10. `src/components/sections/Contact.tsx` — Flat Form
- Remove terminal styling from form
- Flat inputs with subtle borders
- Keep Netlify form handling
- Social links as simple text rows, not cards
- Section number: `06`
- Eyebrow: `CONTACT`

### 11. `src/components/layout/Navbar.tsx` — Nav Mask + Flat
- Flat background, no glass
- Animated underline mask that slides between active links (GSAP or Framer Motion)
- No scroll-shadow → simple `border-b` when scrolled
- Mobile hamburger stays but restyled

### 12. `src/components/layout/Footer.tsx` — Minimal
- Flat, no background effects
- Simple row: name | links | built-with

### 13. `src/components/ui/ScrollReveal.tsx` — Keep & Simplify
- Reduce animation to simple `opacity + translateY(20px)`
- Remove spring physics → simple `ease-out`
- Faster duration: `0.5s`

### 14. Components to DELETE
- `src/components/3d/HeroEnhanced.tsx`
- `src/components/3d/InteractiveHero.tsx`
- `src/components/3d/SkillsGlobe.tsx`
- `src/components/3d/ProjectCards3D.tsx`
- `src/components/3d/NeuralNetwork.tsx` (already deleted in git)
- `src/components/ui/TechParticles.tsx`
- `src/components/ui/ScrollParticles.tsx`
- `src/components/ui/WaveBackground.tsx`
- `src/components/ui/FloatingShapes.tsx`
- `src/components/ui/InteractiveCard.tsx`
- `src/components/ui/ExpandableCard.tsx`
- `src/components/ui/Modal.tsx`

### 15. `src/components/Chatbot.tsx` — Restyle
- Keep functionality (API calls, pre-warm)
- Flat design: no glass, sharp corners
- Match new color tokens

---

## New Components to Create

1. **`src/components/ui/SectionEyebrow.tsx`** — Reusable mono label + section number
2. **`src/components/ui/Marquee.tsx`** — CSS-only marquee for skills ticker
3. **`src/components/ui/InvertButton.tsx`** — Button with invert-fill hover effect
4. **`src/components/ui/DotGrid.tsx`** — Subtle SVG/dot-grid background for hero

---

## Package Changes

### Remove (unused after rebuild)
- `@react-three/fiber`
- `@react-three/drei`
- `three`
- `gsap` (keep if we use it for nav mask; otherwise remove)

### Keep
- `framer-motion` (reduced usage)
- `lucide-react`
- `@icons-pack/react-simple-icons`
- `react-helmet-async`
- `react-router-dom`
- `sonner` (if keeping toast)
- `tailwind-merge`, `clsx`, `class-variance-authority`

---

## Implementation Order

1. **Foundation** — `index.css` (new tokens), `tailwind.config.ts` (remove unused animations)
2. **App shell** — `App.tsx`, `Index.tsx`, delete particle/3D components
3. **Layout** — `Navbar.tsx` (nav mask), `Footer.tsx`
4. **Primitives** — `ScrollReveal.tsx`, new `SectionEyebrow`, `Marquee`, `InvertButton`, `DotGrid`
5. **Hero** — New `Hero.tsx` (replaces old InteractiveHero)
6. **Sections** — About → Experience → Projects → Skills → Publications → Contact
7. **Chatbot** — Restyle
8. **Cleanup** — Remove unused packages, run `npm run lint`, verify build

---

## Mobile Strategy
- All sections use `px-4 sm:px-6 lg:px-8` with `max-w-6xl` container
- Hero text scales: `text-5xl sm:text-7xl lg:text-8xl`
- Bento grids: `grid-cols-1 md:grid-cols-2`
- Experience cards: full-width on mobile
- Project case studies: stack vertically
- Skills marquee: full-width, smaller text
- Contact: stack form below info

---

## Performance Targets
- Remove Three.js → significant bundle size reduction (~500KB+ saved)
- Remove canvas particle systems → CPU/GPU relief
- Target: <100KB JS for initial load (after code splitting)
- No layout shift on hero load
- `prefers-reduced-motion` respected everywhere

---

## Decisions to Confirm

1. **GSAP vs Framer Motion for nav mask** — GSAP gives smoother sliding underline, but Framer Motion keeps dependency count lower. Recommend: Framer Motion `layoutId` for the underline mask.
2. **Keep or remove Lenis smooth scroll** — The research mentions Lenis as a trend, but it's an extra dependency. Recommend: remove it; native `scroll-behavior: smooth` is enough.
3. **Case study depth** — Should all 5 projects become case studies, or just top 3? Recommend: top 3 as case studies, bottom 2 as compact list.
4. **Dot-grid background** — SVG or CSS `background-image`? Recommend: CSS `radial-gradient` dots for performance.
5. **Skills marquee direction** — Left-to-right continuous scroll, or bidirectional? Recommend: single direction, slow speed (`30s` loop).

---

## Risk Notes
- Removing Three.js is irreversible. If you want 3D back later, it must be re-added.
- The current uncommitted changes will be overwritten. Recommend committing or stashing first.
- `ProjectCards3D.tsx` is currently imported but may have a different interface than the simple cards in `Projects.tsx`. Verify data shape before converting.
