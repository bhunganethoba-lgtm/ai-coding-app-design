'use client'

import { useMemo } from 'react'

// Small seeded PRNG so server and client render identical positions (no hydration mismatch)
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function CosmicBackground() {
  const stars = useMemo(() => {
    const rand = mulberry32(20260708)
    return Array.from({ length: 70 }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 2,
      duration: 3 + rand() * 5,
      delay: rand() * 6,
    }))
  }, [])

  const particles = useMemo(() => {
    const rand = mulberry32(19831207)
    return Array.from({ length: 14 }, () => ({
      left: rand() * 100,
      size: 3 + rand() * 5,
      duration: 14 + rand() * 16,
      delay: rand() * 18,
      hue: Math.floor(rand() * 4),
    }))
  }, [])

  const hues = [
    'oklch(0.8 0.16 80)',
    'oklch(0.78 0.17 158)',
    'oklch(0.72 0.16 232)',
    'oklch(0.68 0.18 320)',
  ]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Wallpaper image with slow drift + zoom */}
      <div
        className="animate-cosmic-drift absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cosmic-wallpaper.jpg')" }}
      />

      {/* Breathing glow layer on top of the nebula */}
      <div
        className="animate-cosmic-pulse absolute inset-0 mix-blend-screen"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 45%, oklch(0.5 0.2 200 / 25%), transparent 70%)',
        }}
      />

      {/* Diagonal light sweep */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="animate-cosmic-sweep absolute -inset-y-1/2 left-0 w-1/3"
          style={{
            background:
              'linear-gradient(90deg, transparent, oklch(0.9 0.05 250 / 12%), transparent)',
          }}
        />
      </div>

      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="animate-twinkle absolute rounded-full bg-white"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              '--twinkle-duration': `${s.duration}s`,
              '--twinkle-delay': `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Floating neon particles rising upward */}
      {particles.map((p, i) => (
        <span
          key={`particle-${i}`}
          className="animate-float-up absolute bottom-0 rounded-full"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: hues[p.hue],
              boxShadow: `0 0 10px ${hues[p.hue]}`,
              '--float-duration': `${p.duration}s`,
              '--float-delay': `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Readability vignette so foreground UI always has contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(125% 95% at 50% 42%, transparent 55%, oklch(0.12 0.04 264 / 45%) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-background/15" />
    </div>
  )
}
