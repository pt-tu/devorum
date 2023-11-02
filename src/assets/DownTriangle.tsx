import React, { SVGAttributes } from "react";

function DownTriangle(props: SVGAttributes<string | SVGSVGElement>) {
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
        fill={"#111B2B" || props.fill}
        d="M22.667 13.333L16 20l-6.667-6.667h13.334z"
      ></path>
    </svg>
  );
}

export default DownTriangle;
