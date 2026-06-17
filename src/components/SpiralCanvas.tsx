import { useRef, useState, useEffect, useCallback } from 'react'
import { analysisService } from '../services/analysisService'

interface Point {
  x: number
  y: number
  timestamp: number
  pressure?: number
}

interface SpiralAnalysis {
  tremorScore: number
  smoothness: number
  symmetry: number
  speed: number
  parkinsonIndicator: 'low' | 'moderate' | 'high'
}

interface SpiralCanvasProps {
  onComplete?: (analysis: SpiralAnalysis) => void
  width?: number
  height?: number
  showGuides?: boolean
}

export function SpiralCanvas({
  onComplete,
  width = 600,
  height = 600,
  showGuides = true,
}: SpiralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const [analysis, setAnalysis] = useState<SpiralAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.min(width, height) * 0.4

  const drawGuides = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!showGuides) return
      ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])

      // Draw concentric circles as guides
      for (let i = 1; i <= 4; i++) {
        const radius = (maxRadius * i) / 4
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw center crosshair
      ctx.setLineDash([])
      ctx.strokeStyle = '#cbd5e1'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(centerX - 10, centerY)
      ctx.lineTo(centerX + 10, centerY)
      ctx.moveTo(centerX, centerY - 10)
      ctx.lineTo(centerX, centerY + 10)
      ctx.stroke()
    },
    [showGuides, centerX, centerY, maxRadius]
  )

  const drawSpiral = useCallback(
    (ctx: CanvasRenderingContext2D, pointsToDraw: Point[]) => {
      if (pointsToDraw.length < 2) return

      ctx.strokeStyle = '#0ea5e9'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.setLineDash([])

      ctx.beginPath()
      ctx.moveTo(pointsToDraw[0].x, pointsToDraw[0].y)

      for (let i = 1; i < pointsToDraw.length; i++) {
        ctx.lineTo(pointsToDraw[i].x, pointsToDraw[i].y)
      }

      ctx.stroke()
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw guides
    drawGuides(ctx)

    // Draw spiral
    if (points.length > 0) {
      drawSpiral(ctx, points)
    }
  }, [points, drawGuides, drawSpiral, width, height])

  const analyzeDrawing = useCallback(
    (pointsToAnalyze: Point[]): SpiralAnalysis => {
      if (pointsToAnalyze.length < 10) {
        return {
          tremorScore: 0,
          smoothness: 100,
          symmetry: 100,
          speed: 0,
          parkinsonIndicator: 'low',
        }
      }

      // Calculate tremor (deviation from smooth path)
      let totalDeviation = 0
      for (let i = 2; i < pointsToAnalyze.length - 2; i++) {
        const prev = pointsToAnalyze[i - 1]
        const curr = pointsToAnalyze[i]
        const next = pointsToAnalyze[i + 1]

        // Expected position based on linear interpolation
        const expectedX = (prev.x + next.x) / 2
        const expectedY = (prev.y + next.y) / 2

        const deviation = Math.sqrt(
          Math.pow(curr.x - expectedX, 2) + Math.pow(curr.y - expectedY, 2)
        )
        totalDeviation += deviation
      }

      const avgDeviation = totalDeviation / (pointsToAnalyze.length - 4)
      const tremorScore = Math.min(100, (avgDeviation / 5) * 100)

      // Calculate smoothness (inverse of tremor)
      const smoothness = Math.max(0, 100 - tremorScore)

      // Calculate symmetry (compare left vs right halves)
      let leftPoints = 0
      let rightPoints = 0
      for (const point of pointsToAnalyze) {
        if (point.x < centerX) leftPoints++
        else rightPoints++
      }
      const symmetry = Math.min(100, (Math.min(leftPoints, rightPoints) / Math.max(leftPoints, rightPoints)) * 100)

      // Calculate speed (points per second)
      const duration = pointsToAnalyze[pointsToAnalyze.length - 1].timestamp - pointsToAnalyze[0].timestamp
      const speed = duration > 0 ? (pointsToAnalyze.length / duration) * 1000 : 0

      // Determine Parkinson's indicator
      let parkinsonIndicator: 'low' | 'moderate' | 'high' = 'low'
      if (tremorScore > 40 || smoothness < 60) {
        parkinsonIndicator = 'high'
      } else if (tremorScore > 20 || smoothness < 80) {
        parkinsonIndicator = 'moderate'
      }

      return {
        tremorScore: Math.round(tremorScore),
        smoothness: Math.round(smoothness),
        symmetry: Math.round(symmetry),
        speed: Math.round(speed),
        parkinsonIndicator,
      }
    },
    [centerX]
  )

  const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    let x: number
    let y: number

    if ('touches' in event) {
      x = event.touches[0].clientX - rect.left
      y = event.touches[0].clientY - rect.top
    } else {
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }

    return { x, y }
  }

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const coords = getCoordinates(event)
    if (!coords) return

    setIsDrawing(true)
    const newPoint: Point = {
      x: coords.x,
      y: coords.y,
      timestamp: Date.now(),
    }
    setPoints([newPoint])
    setAnalysis(null)
  }

  const draw = (
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return

    const coords = getCoordinates(event)
    if (!coords) return

    const newPoint: Point = {
      x: coords.x,
      y: coords.y,
      timestamp: Date.now(),
    }

    setPoints((prev) => [...prev, newPoint])
  }

  const stopDrawing = () => {
    if (!isDrawing || points.length < 5) {
      setIsDrawing(false)
      return
    }

    setIsAnalyzing(true)
    void (async () => {
      try {
        const useApi = import.meta.env.VITE_USE_REAL_SPIRAL_API === 'true'
        const result = useApi
          ? await analysisService.analyzePoints(points)
          : analyzeDrawing(points)
        setAnalysis(result)
        onComplete?.(result)
      } catch (err) {
        console.error('Analysis failed, using local fallback', err)
        const result = analyzeDrawing(points)
        setAnalysis(result)
        onComplete?.(result)
      } finally {
        setIsAnalyzing(false)
        setIsDrawing(false)
      }
    })()
  }

  const clearCanvas = () => {
    setPoints([])
    setAnalysis(null)
    setIsDrawing(false)
  }

  return (
    <div className="space-y-4">
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair rounded-2xl border-2 border-slate-200 bg-white shadow-lg transition-all hover:border-sky-300 hover:shadow-xl"
          style={{ touchAction: 'none' }}
        />
        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
              <p className="mt-3 text-sm font-semibold text-slate-700">Analyzing drawing...</p>
            </div>
          </div>
        )}
      </div>

      {analysis && (
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Analysis Results</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-slate-500">Tremor Score</p>
              <p className="mt-1 text-lg font-bold text-slate-900">{analysis.tremorScore}/100</p>
            </div>
            <div>
              <p className="text-slate-500">Smoothness</p>
              <p className="mt-1 text-lg font-bold text-emerald-600">{analysis.smoothness}%</p>
            </div>
            <div>
              <p className="text-slate-500">Symmetry</p>
              <p className="mt-1 text-lg font-bold text-blue-600">{analysis.symmetry}%</p>
            </div>
            <div>
              <p className="text-slate-500">Speed</p>
              <p className="mt-1 text-lg font-bold text-purple-600">{analysis.speed} pts/s</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-slate-900 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-300">
              Parkinson's Indicator
            </p>
            <p
              className={`mt-2 text-lg font-bold ${
                analysis.parkinsonIndicator === 'high'
                  ? 'text-rose-500'
                  : analysis.parkinsonIndicator === 'moderate'
                    ? 'text-amber-500'
                    : 'text-emerald-500'
              }`}
            >
              {analysis.parkinsonIndicator.toUpperCase()}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              {analysis.parkinsonIndicator === 'high'
                ? 'Significant tremor detected. Recommend clinical evaluation.'
                : analysis.parkinsonIndicator === 'moderate'
                  ? 'Moderate irregularities observed. Monitor and follow up.'
                  : 'Drawing appears smooth. Low risk indicators.'}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={clearCanvas}
          disabled={points.length === 0}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear & Redraw
        </button>
        {points.length > 0 && !analysis && (
          <button
            onClick={stopDrawing}
            className="flex-1 rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
          >
            Complete Analysis
          </button>
        )}
      </div>
    </div>
  )
}



