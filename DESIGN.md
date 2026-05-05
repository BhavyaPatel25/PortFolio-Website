# Design System

Portfolio for Bhavya Patel — AI Engineer & ML Researcher.

## Color Tokens

Defined in `src/index.css` as HSL CSS variables.

| Token | Value | Semantic meaning |
|-------|-------|-----------------|
| `--primary` | `220 100% 60%` | Electric blue — interactive elements, focus rings, active states, CTA buttons |
| `--secondary` | `180 100% 50%` | Cyan — gradient endpoint, secondary accents, skill category borders |
| `--accent` | `0 100% 67%` | Red — featured labels only (e.g., "Featured Projects" chip) |
| `--background` | `220 30% 3%` | Near-black — page background |
| `--card` | `220 40% 8%` | Dark card surface |
| `--muted-foreground` | `215 20% 65%` | Body text, secondary labels |
| `--border` | `220 40% 12%` | Subtle dividers and card borders |

**Rule:** Never add a new color outside this token system. Use HSL opacity variants (`hsl(var(--primary) / 0.1)`) for tints.

## Typography

| Font | Role | Tailwind class |
|------|------|---------------|
| Space Grotesk | Display + body | `font-sans`, `font-display` |
| JetBrains Mono | Code, labels, periods | `font-mono` |

**Rule:** Never fall back to `system-ui`, `Inter`, `Roboto`, or `Arial` as a primary display font.

## Utility Classes

Defined in `src/index.css`:

| Class | What it does | When to use |
|-------|-------------|-------------|
| `.glass` | Frosted card: token-based blue tint + backdrop blur + subtle border | All content cards |
| `.glass-hover` | Adds hover transition to glass: darker bg + primary border glow | Cards that respond to hover |
| `.text-gradient` | Blue → cyan → white gradient text via `background-clip: text` | Section headings, name display only |
| `.glow-primary` | Box-shadow glow in primary blue | Focused/hovered buttons |
| `.glow-secondary` | Box-shadow glow in secondary cyan | Accent elements |
| `.gradient-border` | Animated gradient border (blue → cyan → blue) | Special highlight cards |
| `.neon-text` | Text shadow glow in blue/cyan | Hero name only |

## Visual Effects Inventory

The hero is the only section with heavy visual effects. Content sections should be calm and readable.

| Effect | Component | Where to use |
|--------|-----------|-------------|
| 3D WebGL scene | `HeroEnhanced` | Hero only |
| 2D canvas particles | `InteractiveHero` (mouse trail) | Hero only |
| Fixed particle overlay | `TechParticles` | Always active (App.tsx) |
| Scroll-triggered particles | `ScrollParticles` | Page-level (Index.tsx) |
| Wave animation | `WaveBackground` | About section only |
| Floating shapes | `FloatingShapes` | Experience, Publications, Contact |

**Rule:** Do NOT add background blur blobs (`.absolute .rounded-full .blur-[100px]`) to content sections. The hero's 3D stack already provides depth. Content sections need calm readability.

## Icon System

- **SVG tech icons:** `@icons-pack/react-simple-icons` for brand logos (TensorFlow, PyTorch, Python, Docker, etc.)
- **Lucide fallbacks:** `lucide-react` for abstract concepts (Database, Bot, Eye, Terminal, etc.)
- **No emoji icons** in UI components — emoji render inconsistently across OS and break the premium dark-theme aesthetic.

## Section Layout Rules

- **Hero section:** center-aligned text, full-width, full-height
- **All other sections:** left-aligned headings and label chips; description text max-width constrained but left-aligned
- **Section order:** Hero → About → Experience → Projects → Skills → Publications → Contact
- **Section divider:** single 1px gradient line (`h-px bg-gradient-to-r from-transparent via-border to-transparent`) at section top only

## Anti-Patterns

Never use these:

1. **Purple/violet** as primary color (hue ~270–290) — this is the #1 AI design cliché of 2025–2026
2. **Emoji as icons** in components — use SimpleIcons or lucide instead
3. **Decorative blur blobs** in content sections (only acceptable in hero)
4. **Symmetric 3-column card grids** as section layout — use varied column counts or list patterns
5. **Centered headings** outside the hero — left-align section titles
6. **Placeholder-as-label** in form fields — always include a visible label above the input
7. **Generic hero copy** ("Unlock the power of...", "Your all-in-one solution") — be specific

## Decisions Made (2026-05-01)

- Palette shifted from violet (hsl 280) to electric blue (hsl 220) to eliminate AI slop signal
- Emoji icons replaced with SimpleIcons SVG throughout Skills section
- Section heading alignment changed from center to left for About, Experience, Projects, Publications, Skills
- Section order changed to work-first: About → Experience → Projects → Skills
- Decorative blur blobs removed from all content sections
- `.glass` token fixed to use `hsl(var(--primary) / 0.08)` instead of hardcoded RGBA
- Hero badge content added: "Open to AI/ML Roles" with pulsing green availability indicator
