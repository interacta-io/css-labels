import type { Meta, StoryObj } from '@storybook/html-vite'
import { renderContainer, LABEL_RENDERER_DIV_ATTR } from './render-container'
import { playSingleLabel } from './quick-start/single-label'
import { playLabels } from './quick-start/labels'
// @ts-expect-error - Vite raw import
import singleLabelSource from './quick-start/single-label.ts?raw'
// @ts-expect-error - Vite raw import
import labelsSource from './quick-start/labels.ts?raw'

const meta = {
  title: 'Quick Start',
} satisfies Meta

// eslint-disable-next-line import/no-default-export
export default meta

type Story = StoryObj

export const SingleLabel: Story = {
  name: 'Single label',
  render: renderContainer,
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: singleLabelSource,
        language: 'typescript',
      },
    },
  },
  play: ({ canvasElement }) => {
    const div = canvasElement.querySelector<HTMLDivElement>(`[${LABEL_RENDERER_DIV_ATTR}]`)
    if (!div) return
    playSingleLabel(div)
  },
}

export const Labels: Story = {
  name: 'Labels',
  render: renderContainer,
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: labelsSource,
        language: 'typescript',
      },
    },
  },
  play: ({ canvasElement }) => {
    const div = canvasElement.querySelector<HTMLDivElement>(`[${LABEL_RENDERER_DIV_ATTR}]`)
    if (!div) return
    playLabels(div)
  },
}
