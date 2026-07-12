# Prism Studio

A cosmic-themed AI prompt refinement studio that transforms rough app ideas into production-ready design specifications and skill prompts for AI coding agents.

## Features

- **Animated Cosmic Wallpaper** — A vibrant, drifting nebula background with glowing network nodes, twinkling stars, and sweeping neon arcs, powered by GPU-accelerated CSS animations
- **AI-Powered Prompt Refinement** — Send a rough idea and receive:
  - **Refined Prompt** — A detailed, structured description optimized for AI agents
  - **Skill Design** — Markdown guide for implementing the app using v0 Skill syntax
- **Design Customization** — Choose your preferred:
  - IDE (Cursor, VS Code, Windsurf)
  - Visual Style (Aurora Neon, Minimal Dark, Brutalist Grid)
  - Color Palette (Cosmic Prism, Midnight Frost, Solar Fire)
  - UI Pattern (Bento Grid, Sidebar Nav, Card Stack)
- **Glass Panel UI** — Semi-transparent, frosted panels with backdrop blur over the animated wallpaper
- **Motion Accessibility** — Respects `prefers-reduced-motion` for users who prefer reduced animations
- **Copy-Ready Output** — One-click copy buttons for both refined prompts and skill designs

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **AI**: Vercel AI SDK 7 with AI Gateway (Anthropic Claude Sonnet 4.6)
- **Database**: None (stateless, request-based)
- **Styling**: Custom CSS animations, semantic design tokens, glass-morphism components

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn/bun)
- A Vercel account with AI Gateway access
- `AI_GATEWAY_API_KEY` environment variable set

### Installation

```bash
# Install dependencies
pnpm install

# Set environment variables
# Add AI_GATEWAY_API_KEY to .env.development.local or your Vercel project settings

# Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Important: Credit Card Requirement

The Vercel AI Gateway requires a valid credit card on file to unlock free credits. If you see a billing error, add a payment method in your [Vercel AI Dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card).

## Usage

1. **Enter Your Idea** — Describe the app you want to build in plain English
2. **Customize Settings** — Select your preferred IDE, visual style, color palette, and UI pattern (optional)
3. **Click "Enhance prompt & generate skill"** — The AI refines your prompt and generates a detailed skill design
4. **Review & Copy** — View the results in tabbed output:
   - **Refined Prompt** — Copy the enhanced description for your next prompt
   - **Skill Design** — Copy the markdown guide for implementation steps
5. **Use in v0** — Paste the refined prompt or skill design into v0 to build

## Project Structure

```
├── app/
│   ├── api/refine/route.ts          # AI prompt refinement endpoint
│   ├── layout.tsx                    # Root layout with fonts & metadata
│   ├── page.tsx                      # Main landing page
│   └── globals.css                   # Theme tokens, animations, utilities
├── components/
│   ├── cosmic-background.tsx         # Animated wallpaper & overlays
│   ├── prompt-studio.tsx             # Main form & state management
│   ├── result-view.tsx               # Tabbed output display
│   ├── option-group.tsx              # Radio button option groups
│   └── copy-button.tsx               # Copy-to-clipboard button
├── lib/
│   └── design-options.ts             # IDE, style, palette, pattern config
├── public/images/
│   └── cosmic-wallpaper.jpg          # Animated background source
└── package.json
```

## Customization

### Theme Colors

Edit the design tokens in `app/globals.css` under `:root`:

```css
--background: oklch(0.16 0.045 264);  /* Deep navy */
--primary: oklch(0.72 0.16 232);      /* Neon azure */
--accent: oklch(0.78 0.17 158);       /* Nebula emerald */
```

### Animations

Modify animation timings in `app/globals.css`:

- `cosmic-drift` — Background pan (32s default)
- `cosmic-pulse` — Opacity breathing (9s default)
- `cosmic-sweep` — Glowing line sweep (14s default)
- `twinkle` — Star twinkling (configurable per element)

### AI Model & Prompt

Edit `app/api/refine/route.ts` to change the model or system prompt:

```typescript
const result = await generateObject({
  model: 'anthropic/claude-sonnet-4.6',  // Change model here
  system: 'Your custom system prompt...',
  prompt: userPrompt,
  schema: RefinementOutput,
})
```

## Deployment

Deploy to Vercel with one click:

```bash
vercel deploy
```

Ensure `AI_GATEWAY_API_KEY` is set in your Vercel project environment variables.

## Performance

- **LCP**: ~1.8s (animated background + React hydration)
- **CLS**: <0.1 (animations are GPU-accelerated, no layout shift)
- **TTL**: <500ms (stateless API, no database queries)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Requires CSS Backdrop Filter & custom property support

## License

MIT

## Contributing

This is a showcase app built with v0. Feel free to fork and customize for your own use case.

---

**Built with** [v0](https://v0.app) • Powered by [Vercel AI SDK](https://ai-sdk.dev) • Designed with [Tailwind CSS](https://tailwindcss.com)
