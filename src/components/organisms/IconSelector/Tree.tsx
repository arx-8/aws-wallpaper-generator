/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import DropdownTreeSelect from "react-dropdown-tree-select"
import "react-dropdown-tree-select/dist/styles.css"
import { FixMeAny } from "types/Utils"

type OwnProps = {
  children?: never
  onSelect: (target: string) => void
  selectedIcons: readonly string[]
}

const data = {
  label: "search me",
  value: "searchme",
  children: [
    {
      label: "search me too",
      value: "searchmetoo",
      children: [
        {
          label: "No one can get me",
          value: "anonymous",
        },
      ],
    },
  ],
}

const onChange = (currentNode: FixMeAny, selectedNodes: FixMeAny): FixMeAny => {
  console.log("onChange::", currentNode, selectedNodes)
}
const onAction = (node: FixMeAny, action: FixMeAny): FixMeAny => {
  console.log("onAction::", action, node)
}
const onNodeToggle = (currentNode: FixMeAny): FixMeAny => {
  console.log("onNodeToggle::", currentNode)
}

export const IconSelector: React.FC<OwnProps> = () => {
  return (
    <DropdownTreeSelect
      data={data}
      onChange={onChange}
      onAction={onAction}
      onNodeToggle={onNodeToggle}
    />
  )
}
