import { doRectsIntersect } from './helper.js'
import { LEFT_RIGHT_PADDING, TOP_BOTTOM_PADDING, DEFAULT_FONT_SIZE } from './variables.js'
import { Padding, Options } from './types.js'

import { cssLabelStyles, injectStyles, labelClassName, hiddenLabelClassName } from './styles.js'

let globalCssLabelStyles: HTMLStyleElement | undefined
export class CssLabel {
  public element: HTMLDivElement = document.createElement('div')
  public readonly fontWidthHeightRatio = 0.6
  private _container: HTMLDivElement
  private _x = 0
  private _y = 0
  private _estimatedWidth = 0
  private _estimatedHeight = 0
  private _visible = false
  private _prevVisible = false
  private _weight = 0
  private _needsMeasureUpdate = true

  private _customFontSize: number | undefined = undefined
  private _customColor: string | undefined = undefined
  private _customOpacity: number | undefined = undefined
  private _shouldBeShown = false
  private _text: string | number = ''
  /**
   * Tracks whether content was set via `dangerouslySetHtml` (`true`) or `setText` (`false`).
   * Needed so that switching mode with the same string (e.g. `setText` then `dangerouslySetHtml`) still updates the DOM.
   */
  private _contentIsHtml = false
  private _customPadding: Padding | undefined = undefined

  private _customPointerEvents: Options['pointerEvents'] | undefined
  private _customStyle: string | undefined
  private _customClassName: string | undefined

  /**
   * @param container - The parent element for the label.
   * @param text - Initial label content (plain text or, if dangerousHtml is true, HTML).
   * @param dontInjectStyles - When true, global styles are not injected.
   * @param dangerousHtml - When true, text is set via innerHTML (XSS risk). Only use with trusted/sanitized content.
   */
  public constructor (container: HTMLDivElement, text?: string | number, dontInjectStyles?: boolean, dangerousHtml?: boolean) {
    if (!dontInjectStyles && !globalCssLabelStyles) globalCssLabelStyles = injectStyles(cssLabelStyles)
    this._container = container
    this._updateClasses()
    if (text !== undefined) {
      if (dangerousHtml) {
        this.dangerouslySetHtml(text)
      } else {
        this.setText(text)
      }
    }
    this.resetFontSize()
    this.resetPadding()
  }

  /**
   * Sets the text of the element using textContent (safe from XSS).
   * @param text - The text to set.
   */
  public setText (text: string | number): void {
    if (this._text !== text || this._contentIsHtml) {
      this._text = text
      this._contentIsHtml = false
      this.element.textContent = typeof text === 'number' ? String(text) : text
      this._needsMeasureUpdate = true
    }
  }

  /**
   * Sets the inner HTML of the element. Only use with trusted or sanitized content.
   * WARNING: XSS risk — do not pass user-provided or unsanitized HTML.
   * @param html - The HTML to set (string or number; numbers are converted to string).
   */
  public dangerouslySetHtml (html: string | number): void {
    if (this._text !== html || !this._contentIsHtml) {
      this._text = html
      this._contentIsHtml = true
      this.element.innerHTML = typeof html === 'number' ? String(html) : html
      this._needsMeasureUpdate = true
    }
  }

  /**
   * Sets the position of the label
   * @param x - The x coordinate of the label
   * @param y - The y coordinate of the label
   */
  public setPosition (x: number, y: number): void {
    this._x = x
    this._y = y
  }

  /**
   * Sets the CSS style of the element.
   * If a color, opacity or pointer-events is specified using the `setColor`,
   * `setOpacity` or `setPointerEvents` method, it takes priority over all custom styles.
   * The `fontSize` style will not apply from `setStyle`, and the `transform` style
   * will not apply, as it is used in the draw method to update the label position.
   * @param style - The style to be set.
   */
  public setStyle (style: string): void {
    if (this._customStyle !== style) {
      this._customStyle = style
      this.element.style.cssText = this._customStyle

      if (this._customColor) this.element.style.color = this._customColor
      if (this._customOpacity) this.element.style.opacity = String(this._customOpacity)
      if (this._customPointerEvents) this.element.style.pointerEvents = this._customPointerEvents
      if (this._customFontSize) this.element.style.fontSize = `${this._customFontSize}px`
      if (this._customPadding) {
        const { top, right, bottom, left } = this._customPadding
        this.element.style.padding = `${top}px ${right}px ${bottom}px ${left}px`
      }
    }
  }

  /**
   * Sets the class name of the component
   * @param className - The class name to be set
   */
  public setClassName (className: string): void {
    if (this._customClassName !== className) {
      this._customClassName = className
      this._updateClasses()
    }
  }

  /**
   * Sets the font size of the text in pixels.
   * This value cannot be changed through `setStyle` or `setClassName`
   * methods because it is used to measure the width and height of the label.
   * @param fontSize - The font size to set. If not specified, it will use the default value of `14px`.
   */
  public setFontSize (fontSize = DEFAULT_FONT_SIZE): void {
    if (this._customFontSize !== fontSize) {
      this.element.style.fontSize = `${fontSize}px`
      this._customFontSize = fontSize
      this._needsMeasureUpdate = true
    }
  }

  /**
   * Resets the font size of the element to default value.
   */
  public resetFontSize (): void {
    if (this._customFontSize !== DEFAULT_FONT_SIZE) {
      this.element.style.fontSize = `${DEFAULT_FONT_SIZE}px`
      this._customFontSize = DEFAULT_FONT_SIZE
      this._needsMeasureUpdate = true
    }
  }

  /**
   * Sets the color of the element.
   * This color will rewrite the color from `setStyle` CSS style if specified.
   * @param color - The color to set
   */
  public setColor (color: string): void {
    if (this._customColor !== color) {
      this.element.style.color = color
      this._customColor = color
    }
  }

  /**
   * Resets the color of the element.
   */
  public resetColor (): void {
    this.element.style.removeProperty('color')
    this._customColor = undefined
  }

  /**
   * Sets the opacity of the element.
   * This opacity will rewrite the opacity from `setStyle` CSS style if specified.
   * @param opacity - The opacity to set.
   */
  public setOpacity (opacity: number): void {
    if (this._customOpacity !== opacity) {
      this.element.style.opacity = String(opacity)
      this._customOpacity = opacity
    }
  }

  /**
   * Resets the opacity of the element.
   */
  public resetOpacity (): void {
    this.element.style.removeProperty('opacity')
    this._customOpacity = undefined
  }

  /**
   * Sets the `pointerEvents` property to 'none', 'auto', or 'all'.
   * This `pointerEvents` value will rewrite the opacity from `setStyle` CSS style if specified.
   * @param pointerEvents - The `pointerEvents` value to be set.
   */
  public setPointerEvents (pointerEvents: Options['pointerEvents']): void {
    if (this._customPointerEvents !== pointerEvents) {
      this.element.style.pointerEvents = `${pointerEvents}`
      this._customPointerEvents = pointerEvents
    }
  }

  /**
   * Resets the pointer-events of the element.
   */
  public resetPointerEvents (): void {
    this.element.style.removeProperty('pointer-events')
    this._customPointerEvents = undefined
  }

  /**
   * Sets the padding of the element in pixels.
   * This value cannot be changed through `setStyle` or `setClassName`
   * methods because it is used to measure the width and height of the label.
   * @param padding - The padding object with left, top, right and bottom properties.
   * If not specified or partially specified, it will use the default value of
   * `{ left: 9px, top: 6px, right: 9px, bottom: 6px }` for unspecified values.
   */
  public setPadding (padding = {
    left: LEFT_RIGHT_PADDING,
    top: TOP_BOTTOM_PADDING,
    right: LEFT_RIGHT_PADDING,
    bottom: TOP_BOTTOM_PADDING,
  }): void {
    if (!this._customPadding ||
        this._customPadding.left !== padding.left ||
        this._customPadding.top !== padding.top ||
        this._customPadding.right !== padding.right ||
        this._customPadding.bottom !== padding.bottom) {
      this._customPadding = padding
      this.element.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
      this._needsMeasureUpdate = true
    }
  }

  public resetPadding (): void {
    if (this._customPadding !== undefined &&
        this._customPadding.left === LEFT_RIGHT_PADDING &&
        this._customPadding.top === TOP_BOTTOM_PADDING &&
        this._customPadding.right === LEFT_RIGHT_PADDING &&
        this._customPadding.bottom === TOP_BOTTOM_PADDING) {
      return
    }
    const padding = {
      left: LEFT_RIGHT_PADDING,
      top: TOP_BOTTOM_PADDING,
      right: LEFT_RIGHT_PADDING,
      bottom: TOP_BOTTOM_PADDING,
    }
    this.element.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
    this._customPadding = padding
    this._needsMeasureUpdate = true
  }

  /**
   * Sets the boolean value of whether the element should be forced to shown or not
   * @param shouldBeShown - The boolean value to set
   */
  public setForceShow (shouldBeShown: boolean): void {
    this._shouldBeShown = shouldBeShown
  }

  /**
   * Gets the boolean value of whether the element should be shown or not.
   * @returns The boolean value of whether the element should be shown or not.
   */
  public getForceShow (): boolean {
    return this._shouldBeShown
  }

  /**
   * Draws the element to the container and updates the label's coordinate.
   * The label's coordinate updates using `transform` style. It rewrite
   * the `transform` from `setStyle` CSS style if specified.
   */
  public draw (): void {
    const isVisible = this.getVisibility()
    if (isVisible !== this._prevVisible) {
      if (this._prevVisible === false) {
        this._container.appendChild(this.element)
      } else {
        this._container.removeChild(this.element)
      }
      this._updateClasses()
      this._prevVisible = isVisible
    }

    if (isVisible) {
      this.element.style.transform = `
        translate(-50%, -100%)
        translate3d(${this._x}px, ${this._y}px, 0)
      `
    }
  }

  public overlaps (label: CssLabel): boolean {
    this._measureText()
    label._measureText()
    // Use the same box as getLeft/getRight/getTop/getBottom: centered at (_x, _y), bottom at _y
    return doRectsIntersect({
      x: this._x - this._estimatedWidth / 2,
      y: this._y - this._estimatedHeight,
      width: this._estimatedWidth,
      height: this._estimatedHeight,
    }, {
      x: label._x - label._estimatedWidth / 2,
      y: label._y - label._estimatedHeight,
      width: label._estimatedWidth,
      height: label._estimatedHeight,
    })
  }

  public setVisibility (visible = true): void {
    this._visible = visible
  }

  public getVisibility (): boolean {
    return this._visible && (typeof this._text === 'number' || this._text.trim().length > 0)
  }

  public isOnScreen (containerWidth?: number, containerHeight?: number): boolean {
    const width = containerWidth ?? this._container.offsetWidth
    const height = containerHeight ?? this._container.offsetHeight
    return this._x > 0 && this._y > 0 && this._x < width && this._y < height
  }

  public setWeight (weight: number): void {
    this._weight = weight
  }

  public getWeight (): number {
    return this._weight
  }

  /**
   * Gets the left edge of the label's bounding box.
   * @returns The x coordinate of the left edge.
   */
  public getLeft (): number {
    this._measureText()
    return this._x - this._estimatedWidth / 2
  }

  /**
   * Gets the right edge of the label's bounding box.
   * @returns The x coordinate of the right edge.
   */
  public getRight (): number {
    this._measureText()
    return this._x + this._estimatedWidth / 2
  }

  /**
   * Gets the top edge of the label's bounding box.
   * @returns The y coordinate of the top edge.
   */
  public getTop (): number {
    this._measureText()
    return this._y - this._estimatedHeight
  }

  /**
   * Gets the bottom edge of the label's bounding box.
   * @returns The y coordinate of the bottom edge.
   */
  public getBottom (): number {
    return this._y
  }

  /**
   * Appends the element to the top of the container
   */
  public raise (): void {
    this._container.appendChild(this.element)
  }

  /**
   * Removes the element from the DOM.
   */
  public destroy (): void {
    this.element.remove()
  }

  private _updateClasses (): void {
    const isVisible = this.getVisibility()
    if (isVisible) {
      window.requestAnimationFrame(() => {
        this.element.className = `${labelClassName} ${this._customClassName || ''}`
      })
    } else {
      this.element.className = `${labelClassName} ${this._customClassName || ''} ${hiddenLabelClassName}`
    }
  }

  /**
   * Measures the text if properties affecting dimensions have changed since the last measurement.
   */
  private _measureText (): void {
    if (this._needsMeasureUpdate) {
      const { left, top, right, bottom } = this._customPadding ?? {
        left: LEFT_RIGHT_PADDING,
        top: TOP_BOTTOM_PADDING,
        right: LEFT_RIGHT_PADDING,
        bottom: TOP_BOTTOM_PADDING,
      }
      const fontSize = this._customFontSize ?? DEFAULT_FONT_SIZE
      this._estimatedWidth = fontSize * this.fontWidthHeightRatio * this.element.innerHTML.length + left + right
      this._estimatedHeight = fontSize + top + bottom
      this._needsMeasureUpdate = false
    }
  }
}
