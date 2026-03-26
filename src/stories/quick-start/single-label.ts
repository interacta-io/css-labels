import { VisLabel } from '@cosmograph/vis-labels'

export function individualLabel (div: HTMLDivElement): void {
  const label = new VisLabel(div, '🐣')
  label.setPosition(100, 110)
  label.setVisibility(true)
  label.setOpacity(1)
  label.setFontSize(40)
  label.draw()
}
