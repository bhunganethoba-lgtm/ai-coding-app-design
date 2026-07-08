import { Gem, GitFork } from 'lucide-react'
import { CosmicBackground } from '@/components/cosmic-background'
import { PromptStudio } from '@/components/prompt-studio'

export default function Page() {
  return (
    <>
      <CosmicBackground />

      <div className="relative flex min-h-screen flex-col">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/40">
              <Gem className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Prism Studio
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <GitFork className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-3xl pt-6 pb-10 text-center sm:pt-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground/80">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Powered by Claude UI design &amp; Google Stitch methodology
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              <span className="text-gradient-neon">Refine any idea</span>
              <br />
              into a design your agent can build
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              Turn a rough prompt into a polished, paste-ready design brief and a
              reusable <span className="font-mono text-foreground/90">skill-design.md</span>{' '}
              file for Cursor, Claude Code, Antigravity, Copilot CLI and more.
            </p>
          </section>

          <PromptStudio />
        </main>

        <footer className="mx-auto w-full max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          Prism Studio · Prompt &amp; skill refiner for AI coding agents
        </footer>
      </div>
    </>
  )
}
