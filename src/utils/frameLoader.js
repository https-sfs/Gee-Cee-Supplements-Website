export const FRAME_COUNT = 894
const FRAME_PAD = 4

function framePath(index) {
  const frameNumber = String(index).padStart(FRAME_PAD, '0')
  return `/frames/frame_${frameNumber}.png`
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => {
      console.warn(`Failed to load frame: ${src}`)
      resolve(null)
    }

    image.src = src
  })
}

/**
 * Loads every PNG frame from /frames/frame_0001.png through frame_0894.png.
 * Frame 0001 resolves first via onFirstFrame; remaining frames load in parallel after
 * into the same fixed-length array (index-stable, including null holes on failure).
 * @param {(loaded: number, total: number) => void} [onProgress]
 * @param {(image: HTMLImageElement | null, frames: (HTMLImageElement | null)[]) => void} [onFirstFrame]
 * @returns {Promise<(HTMLImageElement | null)[]>}
 */
export async function loadFrames(onProgress, onFirstFrame) {
  const total = FRAME_COUNT
  const frames = new Array(total)
  let loaded = 0

  const first = await loadImage(framePath(1))
  frames[0] = first
  loaded = 1
  onProgress?.(loaded, total)
  onFirstFrame?.(first, frames)

  const restTasks = Array.from({ length: total - 1 }, (_, i) => {
    const frameNumber = i + 2
    const frameIndex = frameNumber - 1
    return loadImage(framePath(frameNumber)).then((image) => {
      frames[frameIndex] = image
      loaded += 1
      onProgress?.(loaded, total)
      return image
    })
  })

  await Promise.all(restTasks)
  return frames
}
