import * as React from 'react'
import ThreeCanvas from '../three/'

export interface ThreeDisplayProps {
  code: string
}

export class ThreeDisplay extends React.Component<ThreeDisplayProps, {}> {
  private myRef = React.createRef<HTMLDivElement>()
  threeCanvas: ThreeCanvas | null

  constructor(props: ThreeDisplayProps) {
    super(props)
    this.threeCanvas = null
  }

  componentDidMount() {
    if (this.myRef.current != null) {
      this.threeCanvas = new ThreeCanvas(this.myRef.current, this.props.code)
    }
  }

  componentDidUpdate() {
    if (this.threeCanvas != null) {
      this.threeCanvas.newCode(this.props.code)
    }
  }

  render() {
    return (
    <div
      ref={this.myRef}
      style={{
        display: 'block',
        backgroundColor: '#333',
        backgroundImage:
          `linear-gradient(
            45deg,
            #222 25%,
            transparent 25%,
            transparent 75%,
            #222 75%,
            #222
          ),
          linear-gradient(
            -45deg,
            #222 25%,
            transparent 25%,
            transparent 75%,
            #222 75%,
            #222
          )`,
        backgroundSize: '20px 20px',
        cursor: 'grab',
        width: 500,
        height: 500,
      }}
    />
    )
  }
}
