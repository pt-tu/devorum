import React, { useState } from 'react'
import TabButton, { TabProps } from './TabButton'

interface Props {
  tabs: TabProps[]
}

function Tabs({ tabs }: Props) {
  const getSelected = () => tabs.findIndex((item) => item.isSelected) | 0
  const [selected, setSelected] = useState(getSelected)
  const newTabs = tabs.map((item, index) =>
    index === selected ? { ...item, isSelected: true } : { ...item, isSelected: false },
  )

  return (
    tabs.length && (
      <div className="flex flex-row gap-2">
        {newTabs.map((props, index) => (
          <TabButton {...props} key={index} onClick={() => setSelected(index)} />
        ))}
      </div>
    )
  )
}

export default Tabs
