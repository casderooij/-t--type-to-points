import { useEffect, useRef, useState } from 'react'
import { resizeCanvas, getTextBounds, getPoints } from './utils'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState(45)
  const [text, setText] = useState('Cas')
  const [points, setPoints] = useState<number[][]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d', {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D
      resizeCanvas(canvas, [300, 300])

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${size}px serif`
      const { x, y, width, height } = getTextBounds(ctx.measureText(text))

      ctx.fillText(text, -x, -y)

      setPoints(
        getPoints(ctx.getImageData(0, 0, width | 1, height | 1), width, height)
      )
    }
  }, [text, size])

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black', display: 'none' }}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ display: 'block' }}
      />
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        style={{ display: 'block' }}
      />

      <div>
        {points.map((row, i) => (
          <div
            key={i}
            style={{
              height: '6px',
            }}
          >
            {row.map((col, j) => (
              <div
                key={j}
                style={{
                  display: 'inline-block',
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: 'red',
                  opacity: col === 1 ? '1' : '0',
                }}
              >
                M
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Canvas />
    </div>
  )
}

export default App
