"use client";
import classNames from "classnames";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  containerClassName?: classNames.Argument;
  onClick?: () => void;
}

export default function AppButton({
  containerClassName,
  className,
  leftIcon,
  rightIcon,
  title,
  onClick,
  ...props
}: Props) {
  return (
    <div
      className={classNames(
        "flex flex-row px-5 bg-orange-8 items-center justify-between rounded-[6px] hover:cursor-pointer",
        containerClassName
      )}
      onClick={onClick}
    >
      {leftIcon}
      <button
        className={classNames(
          "text-white text-sm flex-1 bg-transparent outline-none",
          className
        )}
        {...props}
      >
        {title}
      </button>
      {rightIcon}
    </div>
  );
}
