import * as React from 'react'
import { ThreeDisplay } from './three-display'

export interface DisplayBoxProps {
  code: string
}

export class DisplayBox extends React.Component<DisplayBoxProps, {}> {
  constructor(props: DisplayBoxProps) {
    super(props)
  }

  render() {
    return (
      <div
        id="display"
        style={{
          position: 'absolute',
          right: '0.75em',
          top: '0.75em',
          zIndex: 10,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow:
            '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          overflow: 'hidden',
        }}
      >
        <ThreeDisplay
          code={this.props.code}
        />
        <div
          id="data"
          style={{
            height: '1em',
            padding: '1em',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        />
      </div>
    )
  }
}
