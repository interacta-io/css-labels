import { LabelRenderer } from '@interacta/css-labels'

const labelPadding = { left: 12, top: 8, right: 12, bottom: 8 }

export function playHtmlMultilineLabels (div: HTMLDivElement): void {
  const renderer = new LabelRenderer(div, {
    fontSize: 12,
    padding: labelPadding,
  })
  // Container is 200×400; all labels at x = 100, y = 60, 120, 180, 240, 300, 360
  renderer.setLabels([
    {
      id: 'berlin',
      text: '<strong>Berlin</strong><br><span style="color:#88c0d0">12.4M</span> <em>pop.</em> · Capital',
      x: 100,
      y: 60,
      opacity: 1,
      padding: labelPadding,
    },
    {
      id: 'cafe',
      text: '<strong>Café Central</strong><br>Open now · <span style="color:#a3be8c">4.6★</span>',
      x: 100,
      y: 120,
      opacity: 1,
      padding: labelPadding,
    },
    {
      id: 'revenue',
      text: 'Revenue<br><strong style="color:#8fbcbb">$2.4M</strong> <span style="color:#a3be8c;font-size:0.9em">+12%</span>',
      x: 100,
      y: 180,
      opacity: 1,
      padding: labelPadding,
    },
    {
      id: 'sensor',
      text: '<strong>Temp</strong> <span style="color:#d08770">24°C</span><br><small>Humidity 65%</small>',
      x: 100,
      y: 240,
      opacity: 1,
      padding: labelPadding,
    },
    {
      id: 'flight',
      text: '<strong>LX 123</strong><br>Zurich → <span style="color:#88c0d0">Berlin</span> · 14:30',
      x: 100,
      y: 300,
      opacity: 1,
      padding: labelPadding,
    },
    {
      id: 'stock',
      text: '<strong>AAPL</strong> <span style="color:#a3be8c">▲ 2.1%</span><br><em>$178.42</em>',
      x: 100,
      y: 360,
      opacity: 1,
      padding: labelPadding,
    },
  ])
  renderer.draw()
}
