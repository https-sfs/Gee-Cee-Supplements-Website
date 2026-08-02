import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadFrames } from '../utils/frameLoader'

gsap.registerPlugin(ScrollTrigger)

function drawCoverImage(canvas, image) {
  console.log('[debug] 7. drawCoverImage entered', performance.now(), 'ms')

  if (!canvas || !image) {
    if (!canvas) {
      console.log('[debug] drawCoverImage skipped: canvas is null', performance.now(), 'ms')
    }
    if (!image) {
      console.log('[debug] drawCoverImage skipped: image is null', performance.now(), 'ms')
    }
    return
  }

  const width = window.innerWidth
  const height = window.innerHeight
  const dpr = window.devicePixelRatio || 1

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.log('[debug] drawCoverImage skipped: getContext("2d") returned null', performance.now(), 'ms')
    return
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, width, height)

  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  const x = (width - drawWidth) / 2
  const y = (height - drawHeight) / 2

  console.log('[debug] drawCoverImage metrics', {
    imageWidth: image.width,
    imageHeight: image.height,
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  })

  ctx.drawImage(image, x, y, drawWidth, drawHeight)
  console.log('[debug] 8. drawImage completed', performance.now(), 'ms')
}

export default function LandingSequence() {
  console.log('[debug] 1. LandingSequence mounted', performance.now(), 'ms')

  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const frameIndexRef = useRef(0)

  useEffect(() => {
    console.log('[debug] 2. useEffect started', performance.now(), 'ms')

    let cancelled = false
    let ctx = null

    const renderFrame = (index) => {
      if (index === 0) {
        console.log('[debug] 6. renderFrame(0) entered', performance.now(), 'ms')
      }

      const frames = framesRef.current
      const max = frames.length - 1
      if (max < 0) {
        console.log(
          '[debug] renderFrame skipped: frames cache empty (max < 0)',
          performance.now(),
          'ms',
          { index, framesLength: frames.length },
        )
        return
      }

      const clamped = Math.max(0, Math.min(max, index))
      const image = frames[clamped]
      if (!image) {
        console.log(
          '[debug] renderFrame skipped: image missing at index',
          performance.now(),
          'ms',
          { index, clamped, framesLength: frames.length },
        )
        return
      }

      if (canvasRef.current == null) {
        console.log('[debug] canvasRef is null before drawCoverImage', performance.now(), 'ms')
      }

      frameIndexRef.current = clamped
      drawCoverImage(canvasRef.current, image)
    }

    loadFrames(undefined, (firstImage) => {
      console.log('[debug] 5. onFirstFrame called', performance.now(), 'ms', {
        hasImage: Boolean(firstImage),
        imageWidth: firstImage?.width,
        imageHeight: firstImage?.height,
        cancelled,
      })

      if (cancelled || !firstImage) {
        if (cancelled) {
          console.log(
            '[debug] onFirstFrame returned early: cancelled is true',
            performance.now(),
            'ms',
          )
        }
        if (!firstImage) {
          console.log(
            '[debug] onFirstFrame returned early: firstImage is null/falsy',
            performance.now(),
            'ms',
          )
        }
        return
      }
      framesRef.current = [firstImage]
      renderFrame(0)
    })
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
      console.log('[debug] useEffect cleanup: setting cancelled = true', performance.now(), 'ms')
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
