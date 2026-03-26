import type { Meta, StoryObj } from '@storybook/html-vite'
import { renderContainer, renderFullViewportContainer, LABEL_RENDERER_DIV_ATTR } from './render-container'
import { emptyLabelVisibility } from './edge-cases/empty-label-visibility'
import { swarmOfLabels } from './edge-cases/intersect-labels-performance'
// @ts-expect-error - Vite raw import
import emptyLabelVisibilitySource from './edge-cases/empty-label-visibility.ts?raw'
// @ts-expect-error - Vite raw import
import intersectLabelsPerformanceSource from './edge-cases/intersect-labels-performance.ts?raw'

const meta = {
  title: 'Edge Cases',
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
    emptyLabelVisibility(div)
  },
}

let cleanup: (() => void) | undefined

export const IntersectLabelsPerformance: Story = {
  name: '30K intersecting labels',
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
    cleanup = swarmOfLabels(div)
  },
}
