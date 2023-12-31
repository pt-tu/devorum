"use client";
import classNames from "classnames";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  containerClassName?: classNames.Argument;
}

export default function AppInput({
  containerClassName,
  className,
  leftIcon,
  rightIcon,
  ...props
}: Props) {

  return (
    <div
      className={classNames(
        "flex flex-row flex-1 px-5 bg-dark-4 items-center justify-between rounded-[6px]",
        containerClassName
      )}
    >
      {leftIcon}
      <input
        className={classNames(
          "h-[46px] mx-3 text-gray-4 text-sm flex-1 bg-dark-4 outline-none",
          className
        )}
        {...props }
      />
      {rightIcon}
    </div>
  );
}
