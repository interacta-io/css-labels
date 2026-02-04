import { CssLabel } from '@interacta/css-labels'

export function playSingleLabel (div: HTMLDivElement): void {
  const label = new CssLabel(div, '🐣')
  label.setPosition(100, 110)
  label.setVisibility(true)
  label.setOpacity(1)
  label.draw()
}
