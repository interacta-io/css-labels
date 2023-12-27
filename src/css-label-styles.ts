export const label = 'css-label--label'
export const hiddenLabel = 'css-label--hidden'

let globalCssLabelStyles: HTMLStyleElement
export const createCssStyles = (): void => {
  if (globalCssLabelStyles) return
  globalCssLabelStyles = document.createElement('style')
  globalCssLabelStyles.innerHTML = `
  :root {
    --css-label-background-color: #1e2428;
    --css-label-brightness: brightness(150%);
  }

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

  // Insert the global CSS style element into the head of the document if it doesn't already exist
  const firstStyleTagInHead = document.head.getElementsByTagName('style')[0]
  if (firstStyleTagInHead) document.head.insertBefore(globalCssLabelStyles, firstStyleTagInHead)
  else document.head.appendChild(globalCssLabelStyles)
}
