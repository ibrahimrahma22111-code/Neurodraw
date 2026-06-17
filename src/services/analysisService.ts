import { apiClient } from './apiClient'

export interface StrokePoint {
  x: number
  y: number
  timestamp: number
}

export interface SpiralAnalysis {
  tremorScore: number
  smoothness: number
  symmetry: number
  speed: number
  parkinsonIndicator: 'low' | 'moderate' | 'high'
}

export const analysisService = {
  async analyzePoints(points: StrokePoint[]): Promise<SpiralAnalysis> {
    const useRealApi = import.meta.env.VITE_USE_REAL_SPIRAL_API === 'true'

    if (useRealApi) {
      return apiClient.post<SpiralAnalysis>('/spiral/analyze', { points })
    }

    // Client-side fallback (same as SpiralCanvas)
    return heuristicAnalyze(points)
  },

  async saveToHistory(analysis: SpiralAnalysis, notes?: string): Promise<void> {
    const useRealApi = import.meta.env.VITE_USE_REAL_HISTORY_API === 'true'
    if (useRealApi) {
      await apiClient.post('/patient/history', { analysis, notes })
    }
  },
}

function heuristicAnalyze(points: StrokePoint[]): SpiralAnalysis {
  if (points.length < 10) {
    return { tremorScore: 0, smoothness: 100, symmetry: 100, speed: 0, parkinsonIndicator: 'low' }
  }

  const centerX = points.reduce((s, p) => s + p.x, 0) / points.length
  let totalDeviation = 0
  for (let i = 2; i < points.length - 2; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const next = points[i + 1]
    const expectedX = (prev.x + next.x) / 2
    const expectedY = (prev.y + next.y) / 2
    totalDeviation += Math.hypot(curr.x - expectedX, curr.y - expectedY)
  }

  const avgDeviation = totalDeviation / (points.length - 4)
  const tremorScore = Math.min(100, (avgDeviation / 5) * 100)
  const smoothness = Math.max(0, 100 - tremorScore)

  let left = 0
  let right = 0
  for (const p of points) {
    if (p.x < centerX) left++
    else right++
  }
  const symmetry = Math.min(100, (Math.min(left, right) / Math.max(left, right)) * 100)

  const duration = points[points.length - 1].timestamp - points[0].timestamp
  const speed = duration > 0 ? (points.length / duration) * 1000 : 0

  let parkinsonIndicator: 'low' | 'moderate' | 'high' = 'low'
  if (tremorScore > 40 || smoothness < 60) parkinsonIndicator = 'high'
  else if (tremorScore > 20 || smoothness < 80) parkinsonIndicator = 'moderate'

  return {
    tremorScore: Math.round(tremorScore),
    smoothness: Math.round(smoothness),
    symmetry: Math.round(symmetry),
    speed: Math.round(speed),
    parkinsonIndicator,
  }
}
