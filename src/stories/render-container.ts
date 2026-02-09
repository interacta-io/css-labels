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

export function renderContainer200x400 (): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'display: flex; justify-content: center; align-items: center; min-height: 400px;'

  const div = document.createElement('div')
  div.style.cssText = 'position: relative; width: 200px; height: 400px; margin: 1rem;'
  div.setAttribute(LABEL_RENDERER_DIV_ATTR, 'true')

  wrapper.appendChild(div)
  return wrapper
}

export function renderFullViewportContainer (): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'position: relative; width: 100vw; height: 100vh; box-sizing: border-box; padding: 0; margin: 0;'

  const div = document.createElement('div')
  div.style.cssText = 'position: absolute; inset: 0; width: 100%; height: 100%; border: 1px solid #333; box-sizing: border-box;'
  div.setAttribute(LABEL_RENDERER_DIV_ATTR, 'true')

  wrapper.appendChild(div)
  return wrapper
}
