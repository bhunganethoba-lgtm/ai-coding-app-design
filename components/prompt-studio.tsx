'use client'

import { useState } from 'react'
import { Wand2, Loader2, AlertCircle, Palette, Compass } from 'lucide-react'
import { OptionGroup } from '@/components/option-group'
import { ResultView, type RefineResult } from '@/components/result-view'
import {
  IDE_TARGETS,
  STYLES,
  PALETTES,
  PATTERNS,
  DEFAULTS,
} from '@/lib/design-options'
import { cn } from '@/lib/utils'

const EXAMPLES = [
  'A focus timer app for developers with session history',
  'A dashboard for tracking indie SaaS revenue',
  'A recipe discovery app with weekly meal planning',
  'A minimal reading list with tags and highlights',
]

export function PromptStudio() {
  const [prompt, setPrompt] = useState('')
  const [ide, setIde] = useState(DEFAULTS.ide)
  const [style, setStyle] = useState(DEFAULTS.style)
  const [palette, setPalette] = useState(DEFAULTS.palette)
  const [pattern, setPattern] = useState(DEFAULTS.pattern)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<RefineResult | null>(null)

  const MAX_CHARS = 20000
  const promptLength = prompt.trim().length
  const rawLength = prompt.length
  const canSubmit = promptLength >= 3 && !loading
  const validationError =
    promptLength > 0 && promptLength < 3
      ? `Please enter a prompt of at least 3 characters. (${promptLength}/3)`
      : null

  async function handleGenerate() {
    if (!canSubmit) {
      setError(validationError || 'Please enter a prompt.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, ide, style, palette, pattern }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error ?? 'Something went wrong.')
      }
      setResult(data as RefineResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
      {/* Input column */}
      <section
        aria-label="Design brief"
        className="glass-panel rounded-2xl border border-border p-5 sm:p-6"
      >
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
          <Compass className="size-4" aria-hidden="true" />
          Design brief
        </div>

        <label
          htmlFor="idea"
          className="mt-3 block font-display text-lg font-semibold text-foreground"
        >
          Describe what you want to build
        </label>
        <textarea
          id="idea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={6}
          maxLength={MAX_CHARS}
          placeholder="e.g. A habit tracker with streaks, reminders, and a weekly overview…"
          className={cn(
            'mt-2 w-full resize-y rounded-xl border bg-background/40 p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
            validationError ? 'border-destructive/50' : 'border-input',
          )}
        />
        <div className="mt-1 flex items-start justify-between gap-2">
          {validationError ? (
            <p className="text-xs text-destructive">{validationError}</p>
          ) : (
            <span />
          )}
          <p
            className={cn(
              'shrink-0 text-right text-xs tabular-nums',
              rawLength >= MAX_CHARS * 0.95
                ? 'text-destructive'
                : rawLength >= MAX_CHARS * 0.8
                  ? 'text-chart-3'
                  : 'text-muted-foreground',
            )}
          >
            {rawLength.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setPrompt(ex)}
              className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          <OptionGroup
            legend="Target agent / IDE"
            options={IDE_TARGETS}
            value={ide}
            onChange={setIde}
          />
          <OptionGroup
            legend="Visual style"
            options={STYLES}
            value={style}
            onChange={setStyle}
          />
          <OptionGroup
            legend="Color palette"
            options={PALETTES}
            value={palette}
            onChange={setPalette}
          />
          <OptionGroup
            legend="Layout pattern"
            options={PATTERNS}
            value={pattern}
            onChange={setPattern}
          />
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/15 p-3 text-sm text-foreground"
          >
            <AlertCircle
              className="mt-0.5 size-4 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <span>{error}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canSubmit}
          className={cn(
            'mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-base font-semibold text-primary-foreground transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            canSubmit
              ? 'hover:brightness-110 shadow-[0_0_28px_-6px_var(--primary)]'
              : 'cursor-not-allowed opacity-50',
          )}
        >
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              Refining your design…
            </>
          ) : (
            <>
              <Wand2 className="size-5" aria-hidden="true" />
              Enhance prompt &amp; generate skill
            </>
          )}
        </button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Press{' '}
          <kbd className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px]">
            ⌘/Ctrl + Enter
          </kbd>{' '}
          to generate
        </p>
      </section>

      {/* Output column */}
      <section aria-label="Generated output" className="min-h-[520px]">
        {result ? (
          <ResultView result={result} />
        ) : (
          <EmptyState loading={loading} />
        )}
      </section>
    </div>
  )
}

function EmptyState({ loading }: { loading: boolean }) {
  return (
    <div className="glass-panel flex h-full min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
      <div
        className={cn(
          'flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary',
          loading && 'animate-pulse',
        )}
      >
        {loading ? (
          <Loader2 className="size-8 animate-spin" aria-hidden="true" />
        ) : (
          <Palette className="size-8" aria-hidden="true" />
        )}
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
        {loading ? 'Composing your design system…' : 'Your refined output appears here'}
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
        {loading
          ? 'Blending Claude UI design skills with Google Stitch methodology to craft a detailed prompt and a reusable skill file.'
          : 'Write a brief, pick a style, palette and pattern, then generate a paste-ready prompt plus a skill-design.md for your coding agent.'}
      </p>
    </div>
  )
}
