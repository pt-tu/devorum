import React, { SVGAttributes } from "react";

function UpArrow(props: SVGAttributes<string | SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill={props.fill || "#111B2B"}
        d="M9.88 20.547L16 14.44l6.12 6.107 1.88-1.88-8-8-8 8 1.88 1.88z"
      ></path>
    </svg>
  );
}

export default UpArrow;
