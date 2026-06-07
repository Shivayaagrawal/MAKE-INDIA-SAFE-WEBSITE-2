import { useEffect } from 'react'

export function useCounterReveal(active = true) {
  useEffect(() => {
    if (!active) return

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = parseInt(el.dataset.target ?? '0', 10)
          const suffix = target === 94 ? '%' : '+'
          const start = performance.now()
          const dur = 1900

          const step = (now: number) => {
            const p = Math.min((now - start) / dur, 1)
            const ease = 1 - Math.pow(1 - p, 4)
            el.textContent = Math.floor(ease * target) + suffix
            if (p < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
          cio.unobserve(el)
        })
      },
      { threshold: 0.5 },
    )

    document.querySelectorAll('[data-target]').forEach((el) => cio.observe(el))
    return () => cio.disconnect()
  }, [active])
}
