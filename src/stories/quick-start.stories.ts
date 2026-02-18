import type { Meta, StoryObj } from '@storybook/html-vite'
import { renderContainer, renderContainer200x400, LABEL_RENDERER_DIV_ATTR } from './render-container'
import { playSingleLabel } from './quick-start/single-label'
import { playLabels } from './quick-start/labels'
import { playHtmlMultilineLabels } from './quick-start/html-multiline-labels'
import { playAngleDemo } from './quick-start/angle-demo'
// @ts-expect-error - Vite raw import
import singleLabelSource from './quick-start/single-label.ts?raw'
// @ts-expect-error - Vite raw import
import labelsSource from './quick-start/labels.ts?raw'
// @ts-expect-error - Vite raw import
import htmlMultilineLabelsSource from './quick-start/html-multiline-labels.ts?raw'
// @ts-expect-error - Vite raw import
import angleDemoSource from './quick-start/angle-demo.ts?raw'

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

export const HtmlMultilineLabels: Story = {
  name: 'HTML multi-line labels',
  render: renderContainer200x400,
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: htmlMultilineLabelsSource,
        language: 'typescript',
      },
    },
  },
  play: ({ canvasElement }) => {
    const div = canvasElement.querySelector<HTMLDivElement>(`[${LABEL_RENDERER_DIV_ATTR}]`)
    if (!div) return
    playHtmlMultilineLabels(div)
  },
}

export const AngleDemo: Story = {
  name: 'Angle demo',
  render: renderContainer,
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: angleDemoSource,
        language: 'typescript',
      },
    },
  },
  play: ({ canvasElement }) => {
    const div = canvasElement.querySelector<HTMLDivElement>(`[${LABEL_RENDERER_DIV_ATTR}]`)
    if (!div) return
    playAngleDemo(div)
  },
}
