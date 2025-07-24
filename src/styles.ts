export const labelsContainer = 'css-label--labels-container'
export const hidden = 'css-label--labels-container-hidden'

export const applyContainerStyles = (element: HTMLElement): void => {
  element.style.transition = 'opacity 100ms'
  element.style.position = 'absolute'
  element.style.width = '100%'
  element.style.height = '100%'
  element.style.overflow = 'hidden'
  element.style.top = '0%'
  element.style.pointerEvents = 'none'
  element.style.opacity = '1'
}

export const applyHiddenStyles = (element: HTMLElement): void => {
  element.style.opacity = '0'
  // Apply pointer-events: none to all child divs
  const childDivs = element.querySelectorAll('div')
  childDivs.forEach(div => {
    div.style.pointerEvents = 'none'
  })
}

// Keep the old function for backward compatibility but make it a no-op
export const createCssStyles = (): void => {
  // No longer needed - styles are applied directly to elements
}
