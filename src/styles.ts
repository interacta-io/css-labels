export const labelsContainer = 'css-label--labels-container'
export const hidden = 'css-label--labels-container-hidden'

let globalContainerStyle: HTMLStyleElement
export const createCssStyles = (): void => {
  if (globalContainerStyle) return
  globalContainerStyle = document.createElement('style')
  globalContainerStyle.innerHTML = `
  .${labelsContainer} {
    transition: opacity 100ms;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0%;
    pointer-events: none;
    opacity: 1;
  }
  .${hidden} {
    opacity: 0;

    div {
      pointer-events: none;
    }
  }
`

  // Insert the global CSS style element into the head of the document if it doesn't already exist
  const firstStyleTagInHead = document.head.getElementsByTagName('style')[0]
  if (firstStyleTagInHead) document.head.insertBefore(globalContainerStyle, firstStyleTagInHead)
  else document.head.appendChild(globalContainerStyle)
}
