import { LabelRenderer } from '@cosmograph/vis-labels'
import type { LabelOptions } from '@cosmograph/vis-labels'

const LABEL_COLORS = [
  '#5eead4',
  '#60a5fa',
  '#f472b6',
  '#facc15',
  '#fb7185',
  '#a78bfa',
  '#4ade80',
]

function generateLabels (time: number, width: number, height: number, labelCount: number): LabelOptions[] {
  const labels: LabelOptions[] = []
  const radiusX = width * 0.4
  const radiusY = height * 0.4
  const centerX = width / 2
  const centerY = height / 2

  for (let i = 0; i < labelCount; i += 1) {
    const angle = (i / labelCount) * Math.PI * 2 + time * 0.0008 + (i % 7) * 0.1
    const x = centerX + Math.cos(angle) * radiusX + Math.sin(time * 0.001 + i) * 40
    const y = centerY + Math.sin(angle) * radiusY + Math.cos(time * 0.0009 + i * 0.7) * 30
    labels.push({
      id: `label-${i}`,
      text: `L${i % 99}`,
      x: Math.max(10, Math.min(width - 10, x)),
      y: Math.max(10, Math.min(height - 10, y)),
      color: LABEL_COLORS[i % LABEL_COLORS.length],
      weight: i % 3,
    })
  }
  return labels
}

function animateSwarm (container: HTMLDivElement, labelCount: number): () => void {
  const renderer = new LabelRenderer(container)

  let rafId: number

  function tick (): void {
    if (!container.isConnected) {
      renderer.destroy()
      return
    }
    const now = performance.now()
    const w = container.offsetWidth
    const h = container.offsetHeight
    if (w === 0 || h === 0) {
      rafId = requestAnimationFrame(tick)
      return
    }
    const labels = generateLabels(now, w, h, labelCount)
    renderer.setLabels(labels)
    renderer.draw()

    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(rafId)
    renderer.destroy()
  }
}

export function swarmOfLabels (container: HTMLDivElement): () => void {
  const LABEL_COUNT = 30000
  return animateSwarm(container, LABEL_COUNT)
}

export function smallSwarmOfLabels (container: HTMLDivElement): () => void {
  const SMALL_LABEL_COUNT = 250
  return animateSwarm(container, SMALL_LABEL_COUNT)
}
