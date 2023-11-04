import React, { SVGAttributes } from "react";

function DropDownArrow(props: SVGAttributes<string | SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="8"
      fill={props.fill || "none"}
      viewBox="0 0 10 8"
    >
      <path
        fill={props.fill || "rgb(var(--color-gray-3))"}
        d="M9 0H1a1 1 0 00-.8 1.6l4 5.333a1 1 0 001.6 0l4-5.333A1 1 0 009 0z"
      ></path>
    </svg>
  );
}

export default DropDownArrow;
