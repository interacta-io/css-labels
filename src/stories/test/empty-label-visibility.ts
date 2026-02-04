import { CssLabel } from '@interacta/css-labels'

export function playEmptyLabelVisibility (div: HTMLDivElement): void {
  const withText = new CssLabel(div, 'Visible')
  withText.setPadding({ left: 8, top: 4, right: 8, bottom: 4 })
  withText.setPosition(100, 60)
  withText.setVisibility(true)
  withText.draw()

  const whitespaceOnly = new CssLabel(div, '   ')
  whitespaceOnly.setPadding({ left: 8, top: 4, right: 8, bottom: 4 })
  whitespaceOnly.setPosition(100, 140)
  whitespaceOnly.setVisibility(true)
  whitespaceOnly.draw()
}
