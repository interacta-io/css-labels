export const LABEL_RENDERER_DIV_ATTR = 'data-label-renderer-root'

export function renderContainer (): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'display: flex; justify-content: center; align-items: center; min-height: 200px;'

  const div = document.createElement('div')
  div.style.cssText = 'position: relative; width: 200px; height: 200px; margin: 1rem;'
  div.setAttribute(LABEL_RENDERER_DIV_ATTR, 'true')

  wrapper.appendChild(div)
  return wrapper
}
