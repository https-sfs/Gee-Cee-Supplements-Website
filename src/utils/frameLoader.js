const FRAME_COUNT = 894
const FRAME_PAD = 4

function framePath(index) {
  const frameNumber = String(index).padStart(FRAME_PAD, '0')
  return `/frames/frame_${frameNumber}.png`
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image()
    const isFirstFrame = src.includes('frame_0001.png')

    image.onload = () => {
      if (isFirstFrame) {
        console.log(
          '[debug] 4. frame_0001 finished downloading',
          performance.now(),
          'ms',
          { imageWidth: image.width, imageHeight: image.height },
        )
      }
      resolve(image)
    }
    image.onerror = () => {
      if (isFirstFrame) {
        console.log(
          '[debug] 4. frame_0001 finished downloading (ERROR)',
          performance.now(),
          'ms',
        )
      }
      console.warn(`Failed to load frame: ${src}`)
      resolve(null)
    }

    if (isFirstFrame) {
      console.log('[debug] 3. frame_0001 request started', performance.now(), 'ms')
    }
    image.src = src
  })
}

/**
 * Loads every PNG frame from /frames/frame_0001.png through frame_0894.png.
 * Frame 0001 resolves first via onFirstFrame; remaining frames load in parallel after.
 * @param {(loaded: number, total: number) => void} [onProgress]
 * @param {(image: HTMLImageElement | null) => void} [onFirstFrame]
 * @returns {Promise<HTMLImageElement[]>}
 */
export async function loadFrames(onProgress, onFirstFrame) {
  const total = FRAME_COUNT
  let loaded = 0

  const first = await loadImage(framePath(1))
  loaded = 1
  onProgress?.(loaded, total)
  onFirstFrame?.(first)

  const restTasks = Array.from({ length: total - 1 }, (_, i) => {
    const index = i + 2
    return loadImage(framePath(index)).then((image) => {
      loaded += 1
      onProgress?.(loaded, total)
      return image
    })
  })

  console.log('[debug] 9. Promise.all started', performance.now(), 'ms')
  const rest = await Promise.all(restTasks)
  console.log('[debug] 10. Promise.all finished', performance.now(), 'ms')
  return [first, ...rest].filter(Boolean)
}
