import { useEffect, useRef } from 'react'

const DOT_SIZE = 8
const RING_SIZE = 40
const RING_LERP = 0.15

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const hoverRef = useRef(false)
  const visibleRef = useRef(false)

  useEffect(() => {
    // Hide custom cursor on touch devices
    if ('ontouchstart' in window) return

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (!visibleRef.current) {
        visibleRef.current = true
        if (dotRef.current) dotRef.current.style.opacity = '1'
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }
    }

    function onMouseLeave() {
      visibleRef.current = false
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    function onMouseEnterInteractive(e: Event) {
      hoverRef.current = true
    }

    function onMouseLeaveInteractive(e: Event) {
      hoverRef.current = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    // Track hover on interactive elements
    const interactives = document.querySelectorAll('a, button, .btn')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, .btn')
      els.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Animation loop for ring trailing
    let raf: number
    function tick() {
      raf = requestAnimationFrame(tick)

      const dot = dotRef.current
      const ring = ringRef.current
      if (!dot || !ring) return

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Dot follows mouse instantly
      dot.style.transform = `translate(${mx - DOT_SIZE / 2}px, ${my - DOT_SIZE / 2}px)`

      // Ring trails with lerp
      ringPosRef.current.x += (mx - ringPosRef.current.x) * RING_LERP
      ringPosRef.current.y += (my - ringPosRef.current.y) * RING_LERP

      const scale = hoverRef.current ? 1.5 : 1
      ring.style.transform = `translate(${ringPosRef.current.x - RING_SIZE / 2}px, ${ringPosRef.current.y - RING_SIZE / 2}px) scale(${scale})`
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          opacity: 0,
        }}
      />
    </>
  )
}
