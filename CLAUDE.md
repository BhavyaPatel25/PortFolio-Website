# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:2207
npm run build      # Production build
npm run build:dev  # Development build
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

There is no test suite.

## Architecture

Single-page portfolio for Bhavya Patel (AI Engineer & ML Researcher). Built with React 18 + TypeScript + Vite, styled with Tailwind CSS + ShadCN UI (Radix UI primitives), animated with Framer Motion, and 3D visuals via Three.js / React Three Fiber.

**Path alias:** `@` → `./src`

### Entry points

- `src/main.tsx` — mounts the app
- `src/App.tsx` — global providers (HelmetProvider, QueryClientProvider, TooltipProvider) + BrowserRouter with two routes (`/` → Index, `*` → NotFound); also mounts `TechParticles` (canvas particle overlay, always active) and `Chatbot` (floating widget, always mounted)
- `src/pages/Index.tsx` — assembles all section components in order; owns SEO meta tags via react-helmet-async

### Component layers

| Directory | Purpose |
|-----------|---------|
| `src/components/sections/` | Page sections: Hero, About, Skills, Experience, Projects, Publications, Contact |
| `src/components/layout/` | Navbar (scroll-spy + smooth scroll), Footer |
| `src/components/3d/` | Three.js/R3F components: InteractiveHero (canvas), NeuralNetwork, SkillsGlobe, HeroEnhanced, ProjectCards3D |
| `src/components/ui/` | ShadCN primitives + custom animated primitives (ScrollReveal, InteractiveCard, ExpandableCard, TechParticles, FloatingShapes, ScrollParticles, WaveBackground, Modal) |
| `src/hooks/` | use-mobile (breakpoint), use-toast |

### Hero rendering stack (important)

`InteractiveHero` is not just a 3D wrapper — it owns the hero text/JSX content, a 2D Canvas API animation loop (grid + mouse-trail particles), and embeds `HeroEnhanced` (the R3F scene) behind it. `Hero.tsx` is a thin `<section>` shell. The full concurrent rendering stack on the page:

1. `TechParticles` — fixed `<canvas>` from `App.tsx`, always active
2. `ScrollParticles` — scroll-triggered effects, mounted by `Index.tsx`
3. `HeroEnhanced` — R3F/WebGL canvas (`absolute inset-0 -z-10` inside hero)
4. `InteractiveHero` canvas — 2D canvas overlay for mouse particles + grid

Modifying the hero requires understanding all four layers. The hero name/CTA/stats JSX lives in `InteractiveHero.tsx:150–283`, not in `Hero.tsx`.

### Key patterns

- **Section content** is declared as `const` arrays at the top of each section file — no external data layer.
- **`ScrollReveal`** wraps elements to trigger Framer Motion entrance animations on scroll via Intersection Observer.
- **`InteractiveCard`** applies a mouse-move tilt/highlight effect; used heavily in About.
- **`Chatbot`** calls an external RAG API at `https://rag-chatbot-api-pixd.onrender.com/chat`. It pre-warms the API with a GET request on mount (the server sleeps on inactivity).
- **Contact form** uses Netlify form handling (`encode()` helper in `Contact.tsx`).
- **Scroll-spy section IDs**: `home`, `about`, `skills`, `experience`, `projects`, `publications`, `contact` — all used by `Navbar.tsx` and CTA buttons.

### Design system

Custom utility classes defined in `src/index.css` (not in `tailwind.config`):

| Class | Effect |
|-------|--------|
| `glass` | Frosted-glass card: `bg-card/40 backdrop-blur-2xl border border-border/40` |
| `text-gradient` | Violet → cyan → red gradient text via `background-clip: text` |
| `glow-primary/secondary/accent` | Box-shadow glow in primary/secondary/accent color |
| `gradient-border` | Animated gradient border using `background-clip: border-box` |

Color tokens (HSL): `primary` = violet `280 100% 67%`, `secondary` = cyan `180 100% 50%`, `accent` = red `0 100% 67%`. Fonts: `Space Grotesk` (body/display), `JetBrains Mono` (monospace).

### Static assets

`public/` contains `Bhavya Patel Resume.pdf` (linked from hero Download button) and `Flutter_Certificate.pdf`. Referenced directly as `/Bhavya Patel Resume.pdf` — note the space in the filename.

## gstack

Install once (per machine) if not already present:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available gstack skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/setup-gbrain`, `/retro`, `/investigate`, `/document-release`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`

## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
