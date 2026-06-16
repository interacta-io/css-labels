import type { Preview } from '@storybook/html-vite'
import { themes } from 'storybook/theming'

import './style.css'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Introduction', 'React Integration', 'Quick Start', 'Edge Cases'],
      },
    },
    controls: {
      disable: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
      codePanel: true,
    },
  actions:  { disable: true },
  interactions: { disable: true },
  },
}

export default preview
