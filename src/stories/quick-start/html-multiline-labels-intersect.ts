import { LabelRenderer } from '@cosmograph/vis-labels'
import type { LabelOptions } from '@cosmograph/vis-labels'

const labelPadding = { left: 12, top: 8, right: 12, bottom: 8 }

const HTML_LABELS: Omit<LabelOptions, 'x' | 'y'>[] = [
  { id: 'berlin', text: '<strong>Berlin</strong><br><span style="color:#88c0d0">12.4M</span> <em>pop.</em> · Capital', opacity: 1, padding: labelPadding, weight: 500 },
  { id: 'cafe', text: '<strong>Café Central</strong><br>Open now · <span style="color:#a3be8c">4.6★</span>', opacity: 1, padding: labelPadding },
  { id: 'revenue', text: 'Revenue<br><strong style="color:#8fbcbb">$2.4M</strong> <span style="color:#a3be8c;font-size:0.9em">+12%</span>', opacity: 1, padding: labelPadding },
  { id: 'sensor', text: '<strong>Temp</strong> <span style="color:#d08770">24°C</span><br><small>Humidity 65%</small>', opacity: 1, padding: labelPadding },
  { id: 'flight', text: '<strong>LX 123</strong><br>Zurich → <span style="color:#88c0d0">Berlin</span> · 14:30', opacity: 1, padding: labelPadding },
  { id: 'stock', text: '<strong>AAPL</strong> <span style="color:#a3be8c">▲ 2.1%</span><br><em>$178.42</em>', opacity: 1, padding: labelPadding },
  { id: 'weather', text: '<strong>Forecast</strong><br><span style="color:#ebcb8b">Sunny</span> · High 27°C', opacity: 1, padding: labelPadding },
  { id: 'orders', text: '<strong>Orders</strong><br><span style="color:#b48ead">1,248</span> fulfilled today', opacity: 1, padding: labelPadding },
  { id: 'hotel', text: '<strong>Nord Hotel</strong><br><span style="color:#a3be8c">8 rooms</span> left tonight', opacity: 1, padding: labelPadding },
  { id: 'battery', text: '<strong>Battery</strong> <span style="color:#a3be8c">81%</span><br><small>Charging in progress</small>', opacity: 1, padding: labelPadding },
  { id: 'shipment', text: '<strong>Shipment</strong><br>ETA <span style="color:#88c0d0">09:15</span> · Dock 3', opacity: 1, padding: labelPadding },
  { id: 'campaign', text: '<strong>Campaign</strong><br><span style="color:#d08770">CTR 3.8%</span> · 42k impressions', opacity: 1, padding: labelPadding },
]

function positions (time: number, width: number, height: number): { x: number; y: number }[] {
  const radiusX = width * 0.35
  const radiusY = height * 0.35
  const cx = width / 2
  const cy = height / 2
  return HTML_LABELS.map((_, i) => {
    const angle = (i / HTML_LABELS.length) * Math.PI * 2 + time * 0.0004 + i * 0.3
    const x = cx + Math.cos(angle) * radiusX + Math.sin(time * 0.0005 + i) * 30
    const y = cy + Math.sin(angle) * radiusY + Math.cos(time * 0.00045 + i * 0.7) * 25
    return {
      x: Math.max(20, Math.min(width - 20, x)),
      y: Math.max(20, Math.min(height - 20, y)),
    }
  })
}

export function htmlMultilineLabelsIntersect (div: HTMLDivElement): () => void {
  const renderer = new LabelRenderer(div, { fontSize: 12, padding: labelPadding, dangerousHtml: true })
  let rafId: number

  function tick (): void {
    if (!div.isConnected) {
      renderer.destroy()
      return
    }
    const w = div.offsetWidth
    const h = div.offsetHeight
    if (w === 0 || h === 0) {
      rafId = requestAnimationFrame(tick)
      return
    }
    const t = performance.now()
    const pos = positions(t, w, h)
    const labels: LabelOptions[] = HTML_LABELS.map((l, i) => ({ ...l, x: pos[i].x, y: pos[i].y }))
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
