/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
}

export const Header: React.FC<OwnProps> = () => {
  return <header css={root}></header>
}

const root = css`
  text-align: center;
  background: #111;
  display: flex;
  justify-content: space-around;
`
