import { LabelRenderer } from '@interacta/css-labels'

export function playAngleDemo (div: HTMLDivElement): void {
  const renderer = new LabelRenderer(div)
  renderer.setLabels([
    { id: 'a', text: '−45°', x: 45, y: 55, style: 'background: none', rotation: -45, opacity: 1 },
    { id: 'b', text: '0°', x: 100, y: 105, style: 'background: none', rotation: 0, opacity: 1 },
    { id: 'c', text: '45°', x: 155, y: 55, style: 'background: none', rotation: 45, opacity: 1 },
  ])
  renderer.draw()
}
