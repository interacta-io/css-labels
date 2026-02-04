import type { Meta, StoryObj } from '@storybook/html-vite'
import { renderContainer, renderFullViewportContainer, LABEL_RENDERER_DIV_ATTR } from './render-container'
import { playEmptyLabelVisibility } from './test/empty-label-visibility'
import { playIntersectLabelsPerformance } from './test/intersect-labels-performance'
// @ts-expect-error - Vite raw import
import emptyLabelVisibilitySource from './test/empty-label-visibility.ts?raw'
// @ts-expect-error - Vite raw import
import intersectLabelsPerformanceSource from './test/intersect-labels-performance.ts?raw'

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

let cleanup: (() => void) | undefined

export const IntersectLabelsPerformance: Story = {
  name: 'Many moving labels',
  render: () => renderFullViewportContainer(),
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: intersectLabelsPerformanceSource,
        language: 'typescript',
      },
    },
  },
  async beforeEach () {
    cleanup = undefined
    return () => cleanup?.()
  },
  play: ({ canvasElement }) => {
    const div = canvasElement.querySelector<HTMLDivElement>(`[${LABEL_RENDERER_DIV_ATTR}]`)
    if (!div) return
    cleanup = playIntersectLabelsPerformance(div)
  },
}
