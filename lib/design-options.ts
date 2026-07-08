export type Option = {
  id: string
  label: string
  description: string
}

export const IDE_TARGETS: Option[] = [
  { id: 'cursor', label: 'Cursor', description: 'Composer / agent mode' },
  { id: 'claude-code', label: 'Claude Code', description: 'Anthropic terminal agent' },
  { id: 'antigravity', label: 'Antigravity', description: 'Google agent IDE' },
  { id: 'antigravity-cli', label: 'Antigravity CLI', description: 'Terminal agent' },
  { id: 'vscode', label: 'VS Code', description: 'Copilot / extensions' },
  { id: 'copilot-cli', label: 'GitHub Copilot CLI', description: 'gh copilot' },
  { id: 'kiro', label: 'Kiro IDE', description: 'Spec-driven agent' },
  { id: 'generic', label: 'Any Agent', description: 'Framework-agnostic' },
]

export const STYLES: Option[] = [
  {
    id: 'material-3',
    label: 'Material 3 Expressive',
    description: 'Dynamic color, tonal elevation, rounded surfaces',
  },
  {
    id: 'glassmorphism',
    label: 'Glassmorphism',
    description: 'Frosted translucency, blur, soft borders',
  },
  {
    id: 'neo-brutalism',
    label: 'Neo-Brutalism',
    description: 'Hard shadows, thick borders, raw type',
  },
  {
    id: 'minimal-swiss',
    label: 'Minimal / Swiss',
    description: 'Grid discipline, whitespace, restraint',
  },
  {
    id: 'aurora-neon',
    label: 'Aurora Neon',
    description: 'Dark canvas, luminous gradients, glow',
  },
  {
    id: 'editorial',
    label: 'Editorial',
    description: 'Serif display, magazine layout, big type',
  },
]

export const PALETTES: Option[] = [
  {
    id: 'cosmic-prism',
    label: 'Cosmic Prism',
    description: 'Deep navy + neon rainbow accents',
  },
  {
    id: 'monochrome',
    label: 'Monochrome Ink',
    description: 'Near-black, greys, single accent',
  },
  {
    id: 'sunset-warm',
    label: 'Warm Sunset',
    description: 'Amber, coral, terracotta neutrals',
  },
  {
    id: 'forest-calm',
    label: 'Forest Calm',
    description: 'Emerald, moss, warm sand',
  },
  {
    id: 'oceanic',
    label: 'Oceanic',
    description: 'Teal, azure, cool slate',
  },
  {
    id: 'brand-adaptive',
    label: 'Brand Adaptive',
    description: 'Let the agent derive from context',
  },
]

export const PATTERNS: Option[] = [
  {
    id: 'bento-grid',
    label: 'Bento Grid',
    description: 'Modular cards of varied size',
  },
  {
    id: 'hero-split',
    label: 'Hero Split',
    description: 'Copy left, visual right',
  },
  {
    id: 'dashboard',
    label: 'Data Dashboard',
    description: 'Sidebar nav, metric cards, charts',
  },
  {
    id: 'landing',
    label: 'Marketing Landing',
    description: 'Hero, features, social proof, CTA',
  },
  {
    id: 'app-shell',
    label: 'App Shell',
    description: 'Top bar, nav, content region',
  },
  {
    id: 'feed',
    label: 'Content Feed',
    description: 'Infinite list, filters, detail pane',
  },
]

export const DEFAULTS = {
  ide: 'cursor',
  style: 'aurora-neon',
  palette: 'cosmic-prism',
  pattern: 'bento-grid',
}

export function labelFor(list: Option[], id: string) {
  return list.find((o) => o.id === id)?.label ?? id
}
