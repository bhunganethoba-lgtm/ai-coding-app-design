import { generateObject } from 'ai'
import { z } from 'zod'
import {
  IDE_TARGETS,
  STYLES,
  PALETTES,
  PATTERNS,
  labelFor,
} from '@/lib/design-options'

export const maxDuration = 60

const requestSchema = z.object({
  prompt: z.string().min(3).max(4000),
  ide: z.string(),
  style: z.string(),
  palette: z.string(),
  pattern: z.string(),
})

const resultSchema = z.object({
  title: z
    .string()
    .describe('A short 3-6 word project title for the design.'),
  summary: z
    .string()
    .describe('One or two sentences describing the improved design direction.'),
  enhancedPrompt: z
    .string()
    .describe(
      'The improved, detailed frontend design prompt, ready to paste into an AI coding agent. Use clear sections and markdown.',
    ),
  skillDesign: z
    .string()
    .describe(
      'The full contents of a skill-design.md file following the Claude Agent Skills format, including YAML frontmatter with name and description.',
    ),
  tips: z
    .array(z.string())
    .max(5)
    .describe('3-5 short actionable tips for getting the best result.'),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: 'Please enter a prompt of at least 3 characters.' },
      { status: 400 },
    )
  }

  const { prompt, ide, style, palette, pattern } = parsed.data

  const ideLabel = labelFor(IDE_TARGETS, ide)
  const styleLabel = labelFor(STYLES, style)
  const paletteLabel = labelFor(PALETTES, palette)
  const patternLabel = labelFor(PATTERNS, pattern)

  const system = `You are Prism Studio, an elite frontend design director that fuses Anthropic's Claude frontend UI design skill and Google's Stitch design methodology.

Your job: take a user's rough idea and turn it into (1) a world-class, copy-paste-ready design prompt for an AI coding agent, and (2) a complete skill-design.md file.

Design principles you always apply:
- One primary task per screen, minimal cognitive load.
- Strong visual hierarchy, purposeful whitespace, and a deliberate type scale.
- Exactly 3-5 colors total: one primary, 2-3 neutrals, 1-2 accents. Never overuse purple unless requested.
- Max two font families. Use a defined modular type scale.
- Accessibility: WCAG 2.1 AA (>= 4.5:1 text contrast), visible keyboard focus, full screen-reader labeling, touch targets >= 48x48 with >= 8px spacing.
- Responsive at 320px, 768px, 1024px, and 1440px breakpoints.
- Prefer flexbox, then grid for 2D layouts. Semantic HTML and ARIA.
- Real content and imagery direction over lorem ipsum and filler shapes.

The enhancedPrompt must be tailored so it can be pasted directly into ${ideLabel}. Write it in markdown with sections like Overview, Visual Style, Color System, Typography, Layout & Components, Interaction & Motion, Accessibility, and Responsive Behavior. Be specific and opinionated with concrete values (hex/oklch colors, px sizes, font names) but never invent brand names.

The skillDesign file MUST follow the Claude Agent Skills format: start with YAML frontmatter containing 'name' (kebab-case) and 'description', then markdown sections that document the reusable design skill (When to use, Design tokens, Component patterns, Do / Don't, Accessibility checklist).`

  const user = `User idea: """${prompt}"""

Chosen constraints:
- Target agent / IDE: ${ideLabel}
- Visual style: ${styleLabel}
- Color palette direction: ${paletteLabel}
- Layout pattern: ${patternLabel}

Enhance the idea into the requested outputs while honoring these constraints.`

  try {
    const { object } = await generateObject({
      model: 'anthropic/claude-sonnet-4.6',
      schema: resultSchema,
      system,
      prompt: user,
    })

    return Response.json(object)
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.log('[v0] refine error:', detail)
    const needsBilling = /credit card|billing|payment/i.test(detail)
    return Response.json(
      {
        error: needsBilling
          ? 'The AI Gateway needs a valid credit card on file to unlock your free credits. Add one in your Vercel dashboard, then try again.'
          : 'The design engine could not generate a result. Please try again.',
      },
      { status: needsBilling ? 402 : 500 },
    )
  }
}
