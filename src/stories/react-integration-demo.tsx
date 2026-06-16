import { useRef, useState } from 'react'

import { VisLabels } from '@cosmograph/vis-labels/react'
import type { VisLabelsHandle } from '@cosmograph/vis-labels/react'
import type { LabelOptions } from '@cosmograph/vis-labels'

function getLabels (): LabelOptions[] {
  return [
    { id: 'alpha', text: 'Alpha', x: 74, y: 58, opacity: 1, weight: 3 },
    { id: 'beta', text: 'Beta', x: 116, y: 92, opacity: 1, weight: 1 },
    { id: 'gamma', text: 'Gamma', x: 152, y: 126, opacity: 1, weight: 0 },
    { id: 'delta', text: 'Delta', x: 190, y: 78, opacity: 1, weight: 1 },
    { id: 'epsilon', text: 'Epsilon', x: 142, y: 170, opacity: 1, weight: 2 },
    { id: 'zeta', text: 'Zeta', x: 238, y: 96, opacity: 1, weight: 2 },
    { id: 'eta', text: 'Eta', x: 264, y: 142, opacity: 1, weight: 1 },
    { id: 'theta', text: 'Theta', x: 220, y: 182, opacity: 1, weight: 0 },
    { id: 'iota', text: 'Iota', x: 100, y: 146, opacity: 1, weight: 1 },
    { id: 'kappa', text: 'Kappa', x: 180, y: 126, opacity: 1, weight: 2 },
    { id: 'lambda', text: 'Lambda', x: 248, y: 62, opacity: 1, weight: 3 },
    { id: 'mu', text: 'Mu', x: 282, y: 112, opacity: 1, weight: 1 },
  ]
}

export function ReactIntegrationDemo (): React.ReactElement {
  const labelsRef = useRef<VisLabelsHandle>(null)
  const [fontSize, setFontSize] = useState(16)
  const [withIntersection, setWithIntersection] = useState(true)

  const labels = getLabels()

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button type="button" onClick={(): void => setFontSize(size => size === 16 ? 24 : 16)}>
          Toggle font size
        </button>
        <button type="button" onClick={(): void => setWithIntersection(value => !value)}>
          Intersection: {withIntersection ? 'on' : 'off'}
        </button>
      </div>

      <div style={{ fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#5f6b76' }}>
        {status}
      </div>

      <div
        style={{
          position: 'relative',
          width: 320,
          height: 220,
          border: '1px solid #d7dee4',
          borderRadius: 12,
          background: 'linear-gradient(180deg, #f8fbfd 0%, #eef3f6 100%)',
          overflow: 'hidden',
        }}
      >
        <VisLabels
          ref={labelsRef}
          labels={labels}
          fontSize={fontSize}
          padding={{ top: 6, right: 10, bottom: 6, left: 10 }}
          withIntersection={withIntersection}
        />
      </div>
    </div>
  )
}
