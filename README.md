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

### CSP (Content Security Policy) Support

If you're experiencing CSP issues with automatic style injection, you can use the `dontInjectStyles` option and include the CSS manually:

```javascript
import { LabelRenderer, CssLabel } from '@interacta/css-labels'

// For LabelRenderer
const div = document.querySelector('#labels')  
const renderer = new LabelRenderer(div, { dontInjectStyles: true })

// For CssLabel
const label = new CssLabel(div, '🐣', { dontInjectStyles: true })

// ... rest of your code
```

When using `dontInjectStyles: true`, you need to include the CSS file manually in your project:

1. Copy the `css-labels.css` file from the package to your project
2. Import it in your main CSS file or HTML:

```html
<link rel="stylesheet" href="path/to/css-labels.css">
```

Or import it in your CSS:

```css
@import 'path/to/css-labels.css';
```
