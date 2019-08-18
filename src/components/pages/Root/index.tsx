/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { ScreenshotView } from "components/organisms/ScreenshotView"
import html2canvas from "html2canvas"
import React, { useEffect, useState } from "react"

type OwnProps = {
  children?: never
}

const head = "https://raw.githubusercontent.com/arx-8/aws-icons/master"

const links = [
  `${head}/PNG Dark/Application Integration/AWS-Step-Functions@4x.png`,
  `${head}/PNG Dark/Application Integration/Amazon-Simple-Notification-Service-SNS_dark-bg@4x.png`,
]

export const Root: React.FC<OwnProps> = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [width, setWidth] = useState<number>(600)
  const [height, setHeight] = useState<number>(600)

  useEffect(() => {
    document.body.style.width = `${width}px`
    document.body.style.height = `${height}px`
  }, [height, width])

  const onChangeSize = (width: number, height: number): void => {
    setWidth(width)
    setHeight(height)
  }

  const onScreenshot = async (): Promise<void> => {
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      width,
      height,
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
      <div css={inner}>
        {links.map((l) => (
          <img key={l} src={l} alt="logo" width={100} height={100} />
        ))}
        <p>Hello React</p>
        <button onClick={onScreenshot}>Capture</button>

        <button onClick={() => onChangeSize(1920, 1200)}>1920x1200</button>
        <button onClick={() => onChangeSize(600, 600)}>600x600</button>

        {canvas && (
          <ScreenshotView canvas={canvas} onClose={() => setCanvas(null)} />
        )}
      </div>
    </div>
  )
}

const root = css`
  text-align: center;
`

const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`
