import { LabelRenderer } from '@interacta/css-labels'

export function cssVariables (div: HTMLDivElement): () => void {
  const status = document.createElement('div')
  status.textContent = 'Click a label to test pointer events'
  status.style.cssText = 'position: absolute; top: 12px; left: 12px; z-index: 1; font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; color: #d8e1e8; background: rgba(10, 15, 20, 0.7); padding: 6px 8px; border-radius: 8px;'

  div.style.background = 'linear-gradient(180deg, #13212b 0%, #0d151b 100%)'
  div.style.borderRadius = '16px'
  div.style.boxShadow = 'inset 0 0 0 1px rgba(180, 210, 226, 0.14)'
  div.style.setProperty('--css-label-background-color', 'rgba(118, 224, 196, 0.16)')
  div.style.setProperty('--css-label-filter', 'drop-shadow(0 10px 18px rgba(0, 0, 0, 0.28))')
  div.style.setProperty('--css-label-border-radius', '999px')
  div.style.setProperty('--css-label-font-weight', '700')
  div.style.setProperty('--css-label-transition', 'opacity 180ms ease, transform 180ms ease')
  div.style.setProperty('--css-label-pointer-events', 'auto')

  div.appendChild(status)

  const renderer = new LabelRenderer(div, {
    onLabelClick: (_e, label): void => {
      status.textContent = `Clicked: ${String(label.text)}`
    },
    fontSize: 16,
    padding: { top: 10, right: 14, bottom: 10, left: 14 },
  })

  renderer.setLabels([
    { id: 'theme', text: 'Themeable', x: 130, y: 96, opacity: 1, style: 'color: #d6fff4; border: 1px solid rgba(118, 224, 196, 0.4);' },
    { id: 'radius', text: 'Rounded corners', x: 130, y: 156, opacity: 1, style: 'color: #dff7ff; border: 1px solid rgba(125, 197, 255, 0.35); background: rgba(125, 197, 255, 0.15);' },
    { id: 'weight', text: 'Bold weight', x: 130, y: 216, opacity: 1, style: 'color: #fff2c9; border: 1px solid rgba(255, 210, 112, 0.28); background: rgba(255, 210, 112, 0.14);' },
    { id: 'events', text: 'Pointer events on', x: 130, y: 276, opacity: 1, style: 'color: #ffd9ef; border: 1px solid rgba(255, 133, 195, 0.34); background: rgba(255, 133, 195, 0.15);' },
  ])
  renderer.draw()

  return () => {
    renderer.destroy()
  }
}
