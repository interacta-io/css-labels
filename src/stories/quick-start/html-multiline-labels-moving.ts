import { LabelRenderer } from '@interacta/css-labels'
import type { LabelOptions } from '@interacta/css-labels'

const PAD = { left: 10, top: 6, right: 10, bottom: 6 }

// Fractional (0–1) positions relative to container size
const STATIC_DEFS = [
  { id: 's0', fx: 0.12, fy: 0.15, text: '<strong>Berlin</strong><br><span style="color:#88c0d0">52.5°N · 3.7M pop.</span>' },
  { id: 's1', fx: 0.80, fy: 0.18, text: '<strong>Revenue</strong><br><span style="color:#a3be8c">$2.4M</span> <em>+12%</em>' },
  { id: 's2', fx: 0.52, fy: 0.60, text: 'Server · <span style="color:#a3be8c">● Healthy</span><br><small>load 0.42 · uptime 99.9%</small>' },
  { id: 's3', fx: 0.15, fy: 0.80, text: '<strong>AAPL</strong> <span style="color:#a3be8c">▲ 2.1%</span><br><em>$178.42</em>' },
  { id: 's4', fx: 0.85, fy: 0.70, text: '<strong>LX 123</strong><br>ZRH → <span style="color:#88c0d0">BER</span> · 14:30' },
  { id: 's5', fx: 0.62, fy: 0.88, text: 'Temp <span style="color:#d08770">24 °C</span><br><small>Humidity 65%</small>' },
  { id: 's6', fx: 0.38, fy: 0.28, text: '<strong>Zurich HQ</strong><br>Team · <span style="color:#a3be8c">12 online</span>' },
  { id: 's7', fx: 0.88, fy: 0.42, text: 'CO₂ <span style="color:#d08770">412 ppm</span><br><small>↑ from last week</small>' },
]

// Orbiting labels — positions driven by time
const ORBIT_DEFS = [
  {
    id: 'm0',
    text: '<strong>Café Central</strong><br><span style="color:#a3be8c">4.6 ★</span> · Open now',
    cx: 0.46, cy: 0.48, rx: 0.31, ry: 0.22, phase: 0, speed: 0.00055,
  },
  {
    id: 'm1',
    text: '<strong>Hotel Nord</strong><br>⭐⭐⭐ · 0.3 km away',
    cx: 0.46, cy: 0.48, rx: 0.31, ry: 0.22, phase: Math.PI, speed: 0.00055,
  },
  {
    id: 'm2',
    text: 'Flight <strong>EW 451</strong><br>On time · Gate B7',
    cx: 0.50, cy: 0.50, rx: 0.17, ry: 0.11, phase: Math.PI * 0.5, speed: 0.0010,
  },
  {
    id: 'm3',
    text: '<strong>Sensor #4</strong><br>PM2.5 <span style="color:#d08770">18 µg/m³</span>',
    cx: 0.50, cy: 0.50, rx: 0.17, ry: 0.11, phase: Math.PI * 1.5, speed: 0.0010,
  },
]

// Renders small red anchor dots at each label's (x, y) bottom-center anchor point
function createAnchorOverlay (container: HTMLDivElement): {
  update: (points: Array<{ id: string; x: number; y: number }>) => void
  destroy: () => void
} {
  const overlay = document.createElement('div')
  overlay.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:10;overflow:hidden;'
  container.appendChild(overlay)

  const dotMap = new Map<string, HTMLDivElement>()

  function update (points: Array<{ id: string; x: number; y: number }>): void {
    const active = new Set<string>()

    for (const { id, x, y } of points) {
      active.add(id)
      let dot = dotMap.get(id)
      if (!dot) {
        dot = document.createElement('div')
        // Centered on anchor point; anchor is bottom-center of label
        dot.style.cssText = `
          position:absolute;
          width:6px;
          height:6px;
          background:#ff4d4d;
          border-radius:50%;
          transform:translate(-50%,-50%);
          box-shadow:0 0 0 2px rgba(255,255,255,0.8);
        `
        overlay.appendChild(dot)
        dotMap.set(id, dot)
      }
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
    }

    for (const [id, dot] of dotMap) {
      if (!active.has(id)) {
        dot.remove()
        dotMap.delete(id)
      }
    }
  }

  return {
    update,
    destroy: () => overlay.remove(),
  }
}

export function playHtmlMultilineLabelsMoving (container: HTMLDivElement): () => void {
  const renderer = new LabelRenderer(container, {
    fontSize: 11,
    padding: PAD,
    dangerousHtml: true,
  })

  const anchors = createAnchorOverlay(container)
  let rafId: number

  function tick (time: number): void {
    if (!container.isConnected) {
      renderer.destroy()
      anchors.destroy()
      return
    }

    const w = container.offsetWidth
    const h = container.offsetHeight
    if (w === 0 || h === 0) {
      rafId = requestAnimationFrame(tick)
      return
    }

    const labels: LabelOptions[] = []
    const anchorPoints: Array<{ id: string; x: number; y: number }> = []

    for (const def of STATIC_DEFS) {
      const x = def.fx * w
      const y = def.fy * h
      labels.push({ id: def.id, text: def.text, x, y, padding: PAD, opacity: 1 })
      anchorPoints.push({ id: def.id, x, y })
    }

    for (const def of ORBIT_DEFS) {
      const angle = def.phase + time * def.speed
      const x = (def.cx + Math.cos(angle) * def.rx) * w
      const y = (def.cy + Math.sin(angle) * def.ry) * h
      labels.push({ id: def.id, text: def.text, x, y, padding: PAD, opacity: 1 })
      anchorPoints.push({ id: def.id, x, y })
    }

    renderer.setLabels(labels)
    renderer.draw()
    anchors.update(anchorPoints)

    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(rafId)
    renderer.destroy()
    anchors.destroy()
  }
}
