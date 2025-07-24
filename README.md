<p align="center" style="color: #444">
  <h1 align="center">CSS Labels</h1>
</p>

Renders HTML labels with built-in intersection logic.

### Quick Start

Install the package:

```bash
npm install @interacta/css-labels
```

Create HTML div element and render labels:

```javascript
import { LabelRenderer } from '@interacta/css-labels'

const div = document.querySelector('#labels')  
const renderer = new LabelRenderer(div)

renderer.setLabels([
  { id: 'monster', text: '👾', x: 100, y: 50, opacity: 1 },
  { id: 'alien', text: '👽', x: 50, y: 150, opacity: 1 },
  { id: 'ufo', text: '🛸', x: 150, y: 150, opacity: 1 },
])
renderer.draw()
```

Or create single Css label:

```javascript
import { CssLabel } from '@interacta/css-labels'
const div = document.querySelector('#labels')

const label = new CssLabel(div, '🐣')
label.setPosition(100, 110)
label.setVisibility(true)
label.setOpacity(1)
label.draw()
```

### CSP Compatibility

This library is designed to work with Content Security Policy (CSP) restrictions. By default, it applies styles directly to elements using inline styles, avoiding the need to inject `<style>` tags into the document head.

If you prefer to use CSS classes instead of inline styles, you can include the provided CSS file in your HTML:

```html
<link rel="stylesheet" href="node_modules/@interacta/css-labels/src/css-styles.css">
```

Or copy the CSS content from `src/css-styles.css` into your own stylesheet.

This approach ensures compatibility with strict CSP policies that prevent dynamic style injection.