import type { StorybookConfig } from '@storybook/html-vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/html-vite',
  viteFinal (config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@cosmograph/vis-labels/react': path.resolve(__dirname, '../src/react.tsx'),
          '@cosmograph/vis-labels': path.resolve(__dirname, '../src/index.ts'),
        },
      },
    }
  },
}
export default config
