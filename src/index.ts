import { CssLabel } from './css-label.js'
import { LabelOptions, OnClickCallback, Options, Padding } from './types.js'

import { cssLabelContainerStyles, injectStyles, labelsContainerClassName, hiddenLabelsContainerClassName } from './styles.js'

let globalCssLabelRendererStyles: HTMLStyleElement | undefined
export class LabelRenderer {
  private _cssLabels = new Map<string, CssLabel>()
  private _container: HTMLDivElement
  private _onClickCallback: OnClickCallback | undefined
  private _pointerEvents: Options['pointerEvents'] | undefined
  private _elementToData = new Map<HTMLDivElement, LabelOptions>()
  private _dispatchWheelEventElement: HTMLElement | undefined
  private _dontInjectStyles: boolean | undefined
  private _padding: Padding | undefined
  private _fontSize: number | undefined

  public constructor (container: HTMLDivElement, options?: Options) {
    if (!options?.dontInjectStyles && !globalCssLabelRendererStyles) globalCssLabelRendererStyles = injectStyles(cssLabelContainerStyles)
    this._container = container
    container.addEventListener('click', this._onClick.bind(this))

    this._container.className = labelsContainerClassName
    if (options?.onLabelClick) this._onClickCallback = options.onLabelClick
    if (options?.pointerEvents) this._pointerEvents = options.pointerEvents
    if (options?.dontInjectStyles) this._dontInjectStyles = options.dontInjectStyles
    if (options?.padding) this._padding = options.padding
    if (options?.fontSize) this._fontSize = options.fontSize

    if (options?.dispatchWheelEventElement) {
      this._dispatchWheelEventElement = options.dispatchWheelEventElement
      this._container.addEventListener('wheel', this._onWheel.bind(this))
    }
  }

  public setLabels (labels: LabelOptions[]): void {
    // Add new labels and take into account existing labels
    const labelsToDelete = new Map(this._cssLabels)
    labels.forEach(label => {
      const { x, y, fontSize, color, text, weight, opacity, shouldBeShown, style, className, padding } = label
      const exists = this._cssLabels.get(label.id)
      if (exists) {
        labelsToDelete.delete(label.id)
      } else {
        const cssLabel = new CssLabel(this._container, label.text, this._dontInjectStyles)
        this._cssLabels.set(label.id, cssLabel)
        this._elementToData.set(cssLabel.element, label)
      }
      const labelToUpdate = this._cssLabels.get(label.id)
      if (labelToUpdate) {
        labelToUpdate.setText(text)
        labelToUpdate.setPosition(x, y)
        if (style !== undefined) labelToUpdate.setStyle(style)
        if (weight !== undefined) labelToUpdate.setWeight(weight)

        if (color !== undefined) labelToUpdate.setColor(color)

        /**
         * We need to check if the font size and padding are specified in the Options.
         * These properties can't be set using general CSS styles or class names because
         * they are used to calculate the label's size.
         */
        if (fontSize !== undefined) labelToUpdate.setFontSize(fontSize)
        else if (this._fontSize !== undefined) labelToUpdate.setFontSize(this._fontSize)
        else labelToUpdate.resetFontSize()
        if (padding !== undefined) labelToUpdate.setPadding(padding)
        else if (this._padding !== undefined) labelToUpdate.setPadding(this._padding)
        else labelToUpdate.resetPadding()

        if (this._pointerEvents !== undefined) labelToUpdate.setPointerEvents(this._pointerEvents)
        if (opacity !== undefined) labelToUpdate.setOpacity(opacity)
        if (shouldBeShown !== undefined) labelToUpdate.setForceShow(shouldBeShown)
        if (className !== undefined) labelToUpdate.setClassName(className)
      }
    })

    // Remove labels from points that don't longer exist
    for (const [key] of labelsToDelete) {
      const cssLabel = this._cssLabels.get(key)
      if (cssLabel) {
        this._elementToData.delete(cssLabel.element)
        cssLabel.destroy()
      }
      this._cssLabels.delete(key)
    }
  }

  public draw (withIntersection = true): void {
    if (withIntersection) {
      this._intersectLabels()
    } else {
      const containerWidth = this._container.offsetWidth
      const containerHeight = this._container.offsetHeight
      this._cssLabels.forEach(cssLabel =>
        cssLabel.setVisibility(cssLabel.isOnScreen(containerWidth, containerHeight)))
    }
    this._cssLabels.forEach(cssLabel => cssLabel.draw())
  }

  public show (): void {
    this._container.className = labelsContainerClassName
  }

  public hide (): void {
    this._container.className = `${labelsContainerClassName} ${hiddenLabelsContainerClassName}`
  }

  public destroy (): void {
    this._container.removeEventListener('click', this._onClick.bind(this))
    this._container.removeEventListener('wheel', this._onWheel.bind(this))
    this._cssLabels.forEach(cssLabel => cssLabel.destroy())
  }

  private _onClick (e: MouseEvent): void {
    const label = this._elementToData.get(e.target as HTMLDivElement)
    if (label) {
      this._onClickCallback?.(e, label)
    }
  }

  private _onWheel (e: WheelEvent): void {
    e.preventDefault()
    const newWheelEvent = new WheelEvent('wheel', e)
    this._dispatchWheelEventElement?.dispatchEvent(newWheelEvent)
  }

  private _intersectLabels (): void {
    const cssLabels = Array.from(this._cssLabels.values())

    // Cache container dimensions to avoid repeated layout recalculations
    const containerWidth = this._container.offsetWidth
    const containerHeight = this._container.offsetHeight

    cssLabels.forEach(l => l.setVisibility(l.isOnScreen(containerWidth, containerHeight)))

    if (cssLabels.length <= 1) return

    // Sweep and Prune: Sort labels by their left edge (X-axis)
    cssLabels.sort((a, b) => a.getLeft() - b.getLeft())

    // Check for overlaps using the sorted order
    for (let i = 0; i < cssLabels.length; i += 1) {
      const label1 = cssLabels[i]
      if (!label1.getVisibility()) continue

      for (let j = i + 1; j < cssLabels.length; j += 1) {
        const label2 = cssLabels[j]
        if (!label2.getVisibility()) continue

        // No further x-overlap possible (sorted by left edge)
        if (label2.getLeft() > label1.getRight()) break

        const isOverlapping = label1.overlaps(label2)
        if (isOverlapping) {
          if (label2.getWeight() > label1.getWeight()) {
            label1.setVisibility(label2.getForceShow() ? false : label1.getForceShow())
            if (!label1.getVisibility()) break // no further comparisons with this label
          } else {
            label2.setVisibility(label1.getForceShow() ? false : label2.getForceShow())
          }
        }
      }
    }
  }
}

export { CssLabel }
export type { LabelOptions }
