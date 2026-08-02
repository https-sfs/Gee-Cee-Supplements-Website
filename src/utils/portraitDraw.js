/**
 * Mobile-only portrait compositor for the 1280×720 frame sequence.
 *
 * Baseline restored from the first good portrait pass:
 *   scale = min(cover, widthCap)  — never blends back toward hard cover crop
 *
 * Refinement on top of that baseline:
 *   - higher minimum visible source width (wider cinematic framing)
 *   - true center focus (no side sacrificed)
 *   - soft concrete/sky atmosphere behind residual vertical padding
 *
 * Desktop never calls this module.
 */

const PORTRAIT_MAX_WIDTH = 767

/**
 * Minimum fraction of source width that must remain visible.
 * Higher than the previous good baseline (was ~0.72–0.86 mid-sequence)
 * so framing is always ≥ that version — never narrower.
 */
const MIN_VISIBLE_WIDTH = 0.92

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export function isPortraitMobile() {
  return window.matchMedia(`(max-width: ${PORTRAIT_MAX_WIDTH}px)`).matches
}

/** Soft concrete / sky wash for residual top/bottom padding. Keep this. */
function fillHeroAtmosphere(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, '#e7eef6')
  gradient.addColorStop(0.42, '#d4dbe4')
  gradient.addColorStop(0.72, '#c2c8d0')
  gradient.addColorStop(1, '#a8b0ba')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

/**
 * Portrait draw: width-protected scale + centered focal crop + atmosphere.
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasImageSource & { naturalWidth: number, naturalHeight: number }} image
 * @param {number} _frameIndex unused — uniform framing across all scenes
 */
export function drawPortraitFrame(canvas, image, _frameIndex) {
  if (!canvas || !image) return

  const width = window.innerWidth
  const height = window.innerHeight
  const dpr = window.devicePixelRatio || 1
  const iw = image.naturalWidth
  const ih = image.naturalHeight
  if (!iw || !ih) return

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  fillHeroAtmosphere(ctx, width, height)

  // Same math as the previous good baseline — no blend toward hard cover.
  const scaleCover = Math.max(width / iw, height / ih)
  const scaleWidthCap = width / (iw * MIN_VISIBLE_WIDTH)
  const scale = Math.min(scaleCover, scaleWidthCap)

  const drawWidth = iw * scale
  const drawHeight = ih * scale

  // Dead-center composition — left typography and right graphics share the crop.
  const fx = 0.5
  const fy = 0.5

  let x = width / 2 - fx * drawWidth
  let y = height / 2 - fy * drawHeight

  if (drawWidth >= width) {
    x = clamp(x, width - drawWidth, 0)
  } else {
    x = (width - drawWidth) / 2
  }

  if (drawHeight >= height) {
    y = clamp(y, height - drawHeight, 0)
  } else {
    y = (height - drawHeight) / 2
  }

  ctx.drawImage(image, x, y, drawWidth, drawHeight)
}
