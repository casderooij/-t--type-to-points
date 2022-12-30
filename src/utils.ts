export function resizeCanvas(
  canvas: HTMLCanvasElement,
  newSize: [w: number, h: number]
) {
  const dpr = window.devicePixelRatio
  canvas.width = newSize[0] * dpr
  canvas.height = newSize[1] * dpr

  canvas.style.width = `${newSize[0]}px`
  canvas.style.height = `${newSize[1]}px`
}

export function getTextBounds(metrics: TextMetrics) {
  return {
    x: Math.abs(metrics.actualBoundingBoxLeft),
    y: -Math.abs(metrics.actualBoundingBoxAscent),
    width: Math.ceil(
      Math.abs(metrics.actualBoundingBoxRight) -
        Math.abs(metrics.actualBoundingBoxLeft)
    ),
    height: Math.ceil(
      Math.abs(metrics.actualBoundingBoxAscent) +
        Math.abs(metrics.actualBoundingBoxDescent)
    ),
  }
}

export function getPoints(imageData: ImageData, width: number, height: number) {
  const BITS_PER_PIXEL = 4
  const ALPHA_CHANNEL_OFFSET = 3
  const points = []
  const data = imageData.data

  for (let y = 0; y < height; y += 1) {
    const row = []
    for (let x = 0; x < width; x += 1) {
      const pixelIndex = y * width + x
      const dataIndex = pixelIndex * BITS_PER_PIXEL
      const alphaValue = data[dataIndex + ALPHA_CHANNEL_OFFSET]

      if (alphaValue > 0) {
        row.push(1)
      } else {
        row.push(0)
      }
    }
    points.push(row)
  }

  return points
}
