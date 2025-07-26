export const labelsContainer = 'css-label--labels-container'
export const hidden = 'css-label--labels-container-hidden'
export const label = 'css-label--label'
export const hiddenLabel = 'css-label--hidden'

export const cssLabelRendererStyles = `
  :root {
    --css-label-background-color: #1e2428;
    --css-label-brightness: brightness(150%);
  }

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

export const cssLabelStyles = `
  .${label} {
    position: absolute;
    top: 0;
    left: 0;

    font-weight: 500;
    cursor: pointer;
    
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    filter: var(--css-label-brightness);
    pointer-events: none;
    background-color: var(--css-label-background-color);
    font-weight: 700;
    border-radius: 6px;
    
    transition: opacity 600ms;
    opacity: 1;
  }

  .${hiddenLabel} {
    opacity: 0 !important;
  }
`

export const injectStyles = (styles: string): HTMLStyleElement => {
  const styleElement = document.createElement('style')
  styleElement.innerHTML = styles

  // Insert the global CSS style element into the head of the document if it doesn't already exist
  const firstStyleTagInHead = document.head.getElementsByTagName('style')[0]
  if (firstStyleTagInHead) document.head.insertBefore(styleElement, firstStyleTagInHead)
  else document.head.appendChild(styleElement)

  return styleElement
}
