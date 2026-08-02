const FRAME_COUNT = 894
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
 * @param {(loaded: number, total: number) => void} [onProgress]
 * @returns {Promise<HTMLImageElement[]>}
 */
export async function loadFrames(onProgress) {
  const total = FRAME_COUNT
  let loaded = 0

  const tasks = Array.from({ length: total }, (_, i) => {
    const index = i + 1
    return loadImage(framePath(index)).then((image) => {
      loaded += 1
      onProgress?.(loaded, total)
      return image
    })
  })

  const results = await Promise.all(tasks)
  return results.filter(Boolean)
}
