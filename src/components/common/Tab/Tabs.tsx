import React from "react";
import TabButton, { TabProps } from "./TabButton";

interface Props{
  tabs:TabProps[];
}

function Tabs({tabs}: Props) {
  //   const { tags } = props;
  return (
    tabs.length && (
      <div className="flex flex-row gap-2">
        {tabs.map((props, index) => (
          <TabButton {...props} key={index} />
        ))}
      </div>
    )
  );
}

export default Tabs;
