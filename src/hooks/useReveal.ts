import { useEffect } from 'react'

export function useReveal(active = true, selector = '.rv') {
  useEffect(() => {
    if (!active) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('on')
        })
      },
      { threshold: 0.14 },
    )

    document.querySelectorAll(selector).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [active, selector])
}
