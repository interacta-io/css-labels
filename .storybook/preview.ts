import type { Preview } from '@storybook/html-vite'
import { themes } from 'storybook/theming'

import './style.css'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
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
      canvas: {
        sourceState: 'shown',
      },
    },
  actions:  { disable: true },
  interactions: { disable: true },
  },
}

export default preview