import { LabelRenderer } from '@interacta/css-labels'

export function playLabels (div: HTMLDivElement): void {
  const renderer = new LabelRenderer(div)
  renderer.setLabels([
    { id: 'monster', text: '👾', x: 100, y: 50, opacity: 1 },
    { id: 'alien', text: '👽', x: 50, y: 150, opacity: 1 },
    { id: 'ufo', text: '🛸', x: 150, y: 150, opacity: 1 },
  ])
  renderer.draw()
}
