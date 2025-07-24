export const label = 'css-label--label'
export const hiddenLabel = 'css-label--hidden'

export const applyLabelStyles = (element: HTMLElement): void => {
  element.style.position = 'absolute'
  element.style.top = '0'
  element.style.left = '0'
  element.style.fontWeight = '500'
  element.style.cursor = 'pointer'
  element.style.userSelect = 'none'
  element.style.filter = 'brightness(150%)'
  element.style.pointerEvents = 'none'
  element.style.backgroundColor = '#1e2428'
  element.style.fontWeight = '700'
  element.style.borderRadius = '6px'
  element.style.transition = 'opacity 600ms'
  element.style.opacity = '1'
}

export const applyHiddenLabelStyles = (element: HTMLElement): void => {
  element.style.opacity = '0'
}

// Keep the old function for backward compatibility but make it a no-op
export const createCssStyles = (): void => {
  // No longer needed - styles are applied directly to elements
}
