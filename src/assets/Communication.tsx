import React, { SVGAttributes } from "react";

function Communication(props: SVGAttributes<string | SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <ellipse
        cx="10"
        cy="15"
        fill={props.fill || "rgb(var(--color-gray-3))"}
        rx="6"
        ry="3"
      ></ellipse>
      <circle
        cx="10"
        cy="6"
        r="4"
        fill={props.fill || "rgb(var(--color-gray-3))"}
      ></circle>
      <path
        fill={props.fill || "rgb(var(--color-gray-3))"}
        fillRule="evenodd"
        d="M5.25 3.468A3.499 3.499 0 003.5 6.5c0 1.295.704 2.427 1.75 3.032a3.5 3.5 0 110-6.064zM14.75 3.468A3.499 3.499 0 0116.5 6.5a3.499 3.499 0 01-1.75 3.032 3.5 3.5 0 100-6.064zM15.5 12a2.5 2.5 0 012 4 2.5 2.5 0 10-2-4zM4.5 12a2.5 2.5 0 00-2 4 2.5 2.5 0 112-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Communication;
