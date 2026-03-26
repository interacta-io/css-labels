import type { Meta, StoryObj } from '@storybook/html-vite'
import { renderContainer, renderFullViewportContainer, LABEL_RENDERER_DIV_ATTR } from './render-container'
import { emptyLabelVisibility } from './2-edge-cases/empty-label-visibility'
import { swarmOfLabels, smallSwarmOfLabels } from './2-edge-cases/intersect-labels-performance'
// @ts-expect-error - Vite raw import
import emptyLabelVisibilitySource from './2-edge-cases/empty-label-visibility.ts?raw'
// @ts-expect-error - Vite raw import
import intersectLabelsPerformanceSource from './2-edge-cases/intersect-labels-performance.ts?raw'

const meta = {
  id: 'test',
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

let cleanupSmallSwarm: (() => void) | undefined

export const SmallSwarm: Story = {
  name: 'Small swarm',
  render: () => {
    cleanupSmallSwarm?.()
    const wrapper = renderContainer({ width: '100%', height: '420px' })
    const div = wrapper.querySelector<HTMLDivElement>(`[${LABEL_RENDERER_DIV_ATTR}]`)
    if (div) cleanupSmallSwarm = smallSwarmOfLabels(div)
    return wrapper
  },
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
    cleanupSmallSwarm = undefined
    return () => cleanupSmallSwarm?.()
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
