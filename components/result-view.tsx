'use client'

import { useState } from 'react'
import { FileText, Sparkles, Lightbulb } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { cn } from '@/lib/utils'

export type RefineResult = {
  title: string
  summary: string
  enhancedPrompt: string
  skillDesign: string
  tips: string[]
}

type TabId = 'prompt' | 'skill'

export function ResultView({ result }: { result: RefineResult }) {
  const [tab, setTab] = useState<TabId>('prompt')

  const active = tab === 'prompt' ? result.enhancedPrompt : result.skillDesign
  const copyLabel = tab === 'prompt' ? 'Copy prompt' : 'Copy file'

  return (
    <div className="glass-panel flex h-full min-h-0 flex-col rounded-2xl border border-border">
      <div className="border-b border-border p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
          <Sparkles className="size-4" aria-hidden="true" />
          Generated output
        </div>
        <h2 className="mt-2 font-display text-xl font-semibold text-balance text-foreground">
          {result.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
          {result.summary}
        </p>

        {result.tips?.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {result.tips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-foreground/80"
              >
                <Lightbulb
                  className="mt-0.5 size-3.5 shrink-0 text-chart-3"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <div role="tablist" aria-label="Output type" className="flex gap-1">
          <TabButton
            active={tab === 'prompt'}
            onClick={() => setTab('prompt')}
            icon={<Sparkles className="size-4" aria-hidden="true" />}
          >
            Enhanced prompt
          </TabButton>
          <TabButton
            active={tab === 'skill'}
            onClick={() => setTab('skill')}
            icon={<FileText className="size-4" aria-hidden="true" />}
          >
            skill-design.md
          </TabButton>
        </div>
        <CopyButton value={active} label={copyLabel} />
      </div>

      <div className="min-h-0 flex-1 overflow-auto scroll-thin p-4">
        <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-foreground/90">
          {active}
        </pre>
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        active
          ? 'bg-primary/20 text-foreground'
          : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
      )}
    >
      {icon}
      {children}
    </button>
  )
}
