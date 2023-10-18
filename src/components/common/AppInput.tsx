"use client";
import classNames from "classnames";
import React, { HTMLAttributes } from "react";

interface Props {
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  containerClassName?: classNames.Argument;
  className?: classNames.Argument;
}

export default function AppInput(
  props: HTMLAttributes<HTMLInputElement> & Props
) {
  const {
    containerClassName: containerStyle,
    className,
    leftIcon,
    rightIcon,
  } = props;
  return (
    <div
      className={classNames(
        "flex flex-row flex-1 px-5 bg-dark-4 items-center justify-between rounded-[6px]",
        containerStyle
      )}
    >
      {leftIcon}
      <input
        className={classNames(
          "h-[46px] mx-3 text-secondary-4 text-sm flex-1 bg-dark-4 outline-none",
          className
        )}
      />
      {rightIcon}
    </div>
  );
}
