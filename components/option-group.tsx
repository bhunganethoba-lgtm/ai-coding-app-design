'use client'

import type { Option } from '@/lib/design-options'
import { cn } from '@/lib/utils'

export function OptionGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: Option[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {legend}
      </legend>
      <div
        role="radiogroup"
        aria-label={legend}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const selected = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
              title={option.description}
              className={cn(
                'group min-h-11 rounded-lg border px-3 py-2 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                selected
                  ? 'border-primary/70 bg-primary/15 shadow-[0_0_20px_-6px_var(--primary)]'
                  : 'border-border bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70',
              )}
            >
              <span
                className={cn(
                  'block text-sm font-medium',
                  selected ? 'text-foreground' : 'text-foreground/90',
                )}
              >
                {option.label}
              </span>
              <span className="block text-xs text-muted-foreground">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
