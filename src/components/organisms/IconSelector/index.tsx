/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
  onSelect: (target: string) => void
  selectedIcons: readonly string[]
}

const head = "https://raw.githubusercontent.com/arx-8/aws-icons/master"

const links = [
  `${head}/PNG Dark/Application Integration/AWS-Step-Functions@4x.png`,
  `${head}/PNG Dark/Application Integration/Amazon-Simple-Notification-Service-SNS_dark-bg@4x.png`,
]

export const IconSelector: React.FC<OwnProps> = ({
  onSelect,
  selectedIcons,
}) => {
  return (
    <div css={root}>
      {links.map((l) => (
        <div key={l} css={selectedIcons.includes(l) ? iconWrapper : null}>
          <button onClick={() => onSelect(l)}>{l.slice(-16)}</button>
        </div>
      ))}
    </div>
  )
}

const root = css`
  float: left;
  position: fixed;
`

const iconWrapper = css`
  border: medium solid #ff00ff;
`
