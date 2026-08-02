import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadFrames } from '../utils/frameLoader'

gsap.registerPlugin(ScrollTrigger)

function drawCoverImage(canvas, image) {
  if (!canvas || !image) return

  const width = window.innerWidth
  const height = window.innerHeight
  const dpr = window.devicePixelRatio || 1

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, width, height)

  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  const x = (width - drawWidth) / 2
  const y = (height - drawHeight) / 2

  ctx.drawImage(image, x, y, drawWidth, drawHeight)
}

export default function LandingSequence() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const frameIndexRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    let ctx = null

    const renderFrame = (index) => {
      const frames = framesRef.current
      const max = frames.length - 1
      if (max < 0) return

      const clamped = Math.max(0, Math.min(max, index))
      const image = frames[clamped]
      if (!image) return

      frameIndexRef.current = clamped
      drawCoverImage(canvasRef.current, image)
    }

    loadFrames()
      .then((images) => {
        if (cancelled || !sectionRef.current || !pinRef.current) return

        framesRef.current = images
        const totalFrames = images.length
        if (totalFrames === 0) return

        renderFrame(0)

        const state = { frame: 0 }

        ctx = gsap.context(() => {
          gsap.to(state, {
            frame: totalFrames - 1,
            ease: 'none',
            snap: 'frame',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
              pin: pinRef.current,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
            onUpdate: () => {
              renderFrame(Math.round(state.frame))
            },
          })
        }, sectionRef)
      })
      .catch((error) => {
        console.error('Frame loading failed:', error)
      })

    const handleResize = () => {
      renderFrame(frameIndexRef.current)
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true
      ctx?.revert()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[900vh] w-full bg-black"
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </section>
  )
}
