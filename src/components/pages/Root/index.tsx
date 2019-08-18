/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { ScreenshotView } from "components/organisms/ScreenshotView"
import html2canvas from "html2canvas"
import React, { useEffect, useState } from "react"
import { IconSelector } from "components/organisms/IconSelector"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [width, setWidth] = useState<number>(600)
  const [height, setHeight] = useState<number>(600)
  const [icons, setIcons] = useState<string[]>([])

  useEffect(() => {
    document.body.style.width = `${width}px`
    document.body.style.height = `${height}px`
  }, [height, width])

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

  const onChangeSize = (width: number, height: number): void => {
    setWidth(width)
    setHeight(height)
  }

  const onSelect = (target: string): void => {
    setIcons((prev) => {
      if (prev.includes(target)) {
        return prev.filter((p) => p !== target)
      }
      return [...prev, target]
    })
  }

  return (
    <div css={root}>
      <IconSelector onSelect={onSelect} selectedIcons={icons} />
      <button onClick={onScreenshot}>Capture</button>

      {icons.map((icon) => (
        <img key={icon} src={icon} alt="icon" width={100} height={100} />
      ))}

      <button onClick={() => onChangeSize(1920, 1200)}>1920x1200</button>
      <button onClick={() => onChangeSize(600, 600)}>600x600</button>

      {canvas && (
        <ScreenshotView canvas={canvas} onClose={() => setCanvas(null)} />
      )}
    </div>
  )
}

const root = css`
  text-align: center;
`
