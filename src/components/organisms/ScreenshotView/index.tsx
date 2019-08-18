/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  canvas: HTMLCanvasElement
  onClose: () => void
}

export class ScreenshotView extends React.Component<OwnProps> {
  private container: HTMLDivElement | null = null

  constructor(props: OwnProps) {
    super(props)
    this.state = { open: false, complete: false }
  }

  componentDidMount(): void {
    if (this.container) {
      this.container.appendChild(this.props.canvas)
      setTimeout(() => {
        this.props.canvas.style.opacity = "1"
        this.props.canvas.style.transform = "scale(0.8)"
      }, 10)
    }
  }

  render(): React.ReactElement {
    const { onClose } = this.props

    return (
      <div css={root} ref={(container) => (this.container = container)}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    )
  }
}

const root = css`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999998;
  width: 100%;
  height: 100%;
`
