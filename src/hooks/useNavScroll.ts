import { useEffect } from 'react'

export function useNavScroll(navId = 'nav') {
  useEffect(() => {
    const nav = document.getElementById(navId)
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navId])
}
