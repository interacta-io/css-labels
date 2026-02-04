import type { Meta, StoryObj } from '@storybook/html-vite'
import { renderContainer, LABEL_RENDERER_DIV_ATTR } from './render-container'
import { playEmptyLabelVisibility } from './test/empty-label-visibility'
// @ts-expect-error - Vite raw import
import emptyLabelVisibilitySource from './test/empty-label-visibility.ts?raw'

const meta = {
  title: 'Test',
} satisfies Meta

// eslint-disable-next-line import/no-default-export
export default meta

type Story = StoryObj

export const EmptyLabelVisibility: Story = {
  name: 'Empty label visibility',
  render: renderContainer,
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: emptyLabelVisibilitySource,
        language: 'typescript',
      },
    },
  },
  play: ({ canvasElement }) => {
    const div = canvasElement.querySelector<HTMLDivElement>(`[${LABEL_RENDERER_DIV_ATTR}]`)
    if (!div) return
    playEmptyLabelVisibility(div)
  },
}
