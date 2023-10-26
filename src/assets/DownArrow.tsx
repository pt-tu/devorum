import React, { SVGAttributes } from "react";

function ArrowDown(props: SVGAttributes<string | SVGSVGElement>) {
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
        d="M10.694 10.667l5.875 5.862 5.875-5.862 1.805 1.805-7.68 7.68-7.68-7.68 1.805-1.805z"
      ></path>
    </svg>
  );
}

export default ArrowDown;
