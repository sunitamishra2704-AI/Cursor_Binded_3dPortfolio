import { useEffect, useRef, useCallback } from 'react'

const TOTAL_FRAMES = 64
const LERP_FACTOR = 0.26 // fast response, ~35ms tracking
const DEADZONE_RADIUS = 0.12 // 12% of screen diagonal
const TWO_PI = Math.PI * 2
const BG_COLOR = '#890f12'

// Face center as fraction of viewport (character is roughly centered horizontally,
// face is in upper portion of frame)
const FACE_CX = 0.50
const FACE_CY = 0.38

interface Props {
  onLoaded: () => void
}

/**
 * Shortest-path circular angular lerp.
 * Always takes the shortest arc between angles a and b.
 */
function lerpAngle(a: number, b: number, t: number): number {
  const diff = (((b - a + Math.PI) % TWO_PI) + TWO_PI) % TWO_PI - Math.PI
  return a + diff * t
}

/**
 * Maps standard cursor angle (-PI to PI, where 0=right, PI/2=down, -PI/2=up)
 * to 64 evenly spaced frames around the 360° circular video trajectory:
 * - UP (-PI/2) -> Frame 0
 * - UP-RIGHT (-PI/4) -> Frame 8
 * - RIGHT (0) -> Frame 16
 * - DOWN-RIGHT (PI/4) -> Frame 24
 * - DOWN (PI/2) -> Frame 32
 * - DOWN-LEFT (3*PI/4) -> Frame 40
 * - LEFT (PI) -> Frame 48
 * - UP-LEFT (-3*PI/4) -> Frame 56
 */
function angleToFrameIndex(angle: number): number {
  const shifted = (((angle + Math.PI / 2) % TWO_PI) + TWO_PI) % TWO_PI
  return Math.round((shifted / TWO_PI) * TOTAL_FRAMES) % TOTAL_FRAMES
}

/**
 * Calculate cover-fit dimensions (like CSS object-fit: cover)
 */
function coverFit(
  imgW: number, imgH: number, canvasW: number, canvasH: number
): { sx: number; sy: number; sw: number; sh: number; dx: number; dy: number; dw: number; dh: number } {
  const imgRatio = imgW / imgH
  const canvasRatio = canvasW / canvasH

  let sx = 0, sy = 0, sw = imgW, sh = imgH

  if (imgRatio > canvasRatio) {
    // Image is wider — crop sides
    sw = imgH * canvasRatio
    sx = (imgW - sw) / 2
  } else {
    // Image is taller — crop top/bottom
    sh = imgW / canvasRatio
    sy = (imgH - sh) / 2
  }

  return { sx, sy, sw, sh, dx: 0, dy: 0, dw: canvasW, dh: canvasH }
}

/**
 * Calculate face center coordinates on screen
 */
function getFaceScreenPos(imgW: number, imgH: number, canvasW: number, canvasH: number) {
  const imgRatio = imgW / imgH
  const canvasRatio = canvasW / canvasH
  let faceX = canvasW * 0.50
  let faceY = canvasH * 0.40

  if (canvasRatio > imgRatio) {
    // Canvas is wider than image (image is scaled to width and cropped top/bottom)
    const scale = canvasW / imgW
    const renderedH = imgH * scale
    const offsetY = (canvasH - renderedH) / 2
    faceY = offsetY + (imgH * 0.40) * scale
  }
  return { faceX, faceY }
}

export default function HeroCanvas({ onLoaded }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const centerRef = useRef<HTMLImageElement | null>(null)
  const loadedCountRef = useRef(0)
  const allLoadedRef = useRef(false)

  // Animation state (all in refs to avoid re-renders)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const smoothAngleRef = useRef(-Math.PI / 2) // start looking neutral/up
  const currentFrameRef = useRef(-2) // forces initial render
  const rafRef = useRef(0)

  // Preload all frames
  useEffect(() => {
    const totalToLoad = TOTAL_FRAMES + 1 // 64 directional + 1 center
    let loaded = 0

    function onLoad() {
      loaded++
      loadedCountRef.current = loaded
      if (loaded === totalToLoad) {
        allLoadedRef.current = true
        onLoaded()
      }
    }

    // Load directional frames
    const frames: HTMLImageElement[] = []
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/frames/frame_${String(i).padStart(2, '0')}.webp`
      img.onload = onLoad
      img.onerror = onLoad
      frames.push(img)
    }
    framesRef.current = frames

    // Load center frame
    const center = new Image()
    center.src = '/frames/center.webp'
    center.onload = onLoad
    center.onerror = onLoad
    centerRef.current = center
  }, [onLoaded])

  // Mouse tracking
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }

    function onMouseLeave() {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // Resize handler
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    currentFrameRef.current = -2 // force redraw on resize
  }, [])

  // Animation loop
  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    function tick() {
      rafRef.current = requestAnimationFrame(tick)

      const canvas = canvasRef.current
      if (!canvas || !allLoadedRef.current) return

      // If hero canvas is scrolled completely out of view, pause rendering to save battery
      const rect = canvas.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        return
      }

      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const cw = canvas.width
      const ch = canvas.height
      const screenW = rect.width
      const screenH = rect.height

      // Use center image for aspect ratio
      const sampleImg = centerRef.current
      const imgW = sampleImg?.naturalWidth || 1920
      const imgH = sampleImg?.naturalHeight || 1080

      const localFacePos = getFaceScreenPos(imgW, imgH, screenW, screenH)
      const faceX = rect.left + localFacePos.faceX
      const faceY = rect.top + localFacePos.faceY

      const mouse = mouseRef.current
      let targetFrameIdx: number

      if (!mouse.active) {
        // Mouse outside viewport — center eye contact
        targetFrameIdx = -1
      } else {
        const dx = mouse.x - faceX
        const dy = mouse.y - faceY
        const dist = Math.hypot(dx, dy)
        const screenDiag = Math.hypot(window.innerWidth, window.innerHeight)

        // Continuous cursor angle relative to face
        const rawAngle = Math.atan2(dy, dx)

        // Always keep updating smoothed angle with shortest-path lerp (~0.26 response factor)
        // so entering/exiting deadzone remains completely smooth without angular jumps
        smoothAngleRef.current = lerpAngle(smoothAngleRef.current, rawAngle, LERP_FACTOR)

        // Deadzone: within ~12% screen radius, make direct eye contact
        if (dist < screenDiag * DEADZONE_RADIUS) {
          targetFrameIdx = -1
        } else {
          // Map smoothed angle to calibrated frame index (0..63)
          targetFrameIdx = angleToFrameIndex(smoothAngleRef.current)
        }
      }

      // Only redraw if frame changed
      if (targetFrameIdx === currentFrameRef.current) return
      currentFrameRef.current = targetFrameIdx

      // Select image to draw
      const img = targetFrameIdx === -1
        ? centerRef.current
        : framesRef.current[targetFrameIdx]

      if (!img || !img.complete) return

      // Calculate cover-fit
      const fit = coverFit(img.naturalWidth, img.naturalHeight, cw, ch)

      // Draw EXACTLY ONE crisp frame at 100% opacity — NO alpha blending
      ctx.globalAlpha = 1.0
      ctx.drawImage(img, fit.sx, fit.sy, fit.sw, fit.sh, fit.dx, fit.dy, fit.dw, fit.dh)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [resizeCanvas])

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      style={{ backgroundColor: BG_COLOR }}
    />
  )
}
