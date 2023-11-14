import classNames from "classnames";
import React from "react";

interface Props {
  className?: classNames.Argument;
}

function Divider({ className }: Props) {
  return (
    <div
      className={classNames(
        "border-t-[0.75px] my-4 border-gray-300",
        className
      )}
    />
  );
}

export default Divider;
