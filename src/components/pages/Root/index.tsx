/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import logo from "assets/logo.svg"
import React, { useState } from "react"
import html2canvas from "html2canvas"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const onClick = async (): Promise<void> => {
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
      x: window.pageXOffset,
      y: window.pageYOffset,
    })

    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.opacity = "0"
    canvas.style.transform = "scale(0)"
    canvas.style.zIndex = "99999999"
    canvas.style.transition =
      "transform 0.3s cubic-bezier(0.42, 0, 0.58, 1),opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1),-webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1)"

    setCanvas(canvas)
  }

  return (
    <div css={root}>
      <header css={header}>
        <img css={logoCss} src={logo} alt="logo" />
        <p>Hello React</p>
        <button onClick={onClick}>Capture</button>
        {canvas && (
          <CanvasContainer canvas={canvas} onClose={() => setCanvas(null)} />
        )}
        <a
          css={link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

const root = css`
  text-align: center;
`

const header = css`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const logoCss = css`
  height: 40vmin;
`

const link = css`
  color: #61dafb;
`

type InnerOwnProps = {
  canvas: HTMLCanvasElement
  onClose: () => void
}

class CanvasContainer extends React.Component<InnerOwnProps> {
  private container: HTMLDivElement | null = null

  constructor(props: InnerOwnProps) {
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
    return (
      <div
        css={canvasContainerCss}
        ref={(container) => (this.container = container)}
      >
        <button
          onClick={() => this.props.onClose()}
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

const canvasContainerCss = css`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999998;
  width: 100%;
  height: 100%;
`
