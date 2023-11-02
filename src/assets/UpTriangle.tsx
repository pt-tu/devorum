import React, { SVGAttributes } from "react";

function UpTriangle(props: SVGAttributes<string | SVGSVGElement>) {
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
        d="M9.333 18.667L16 12l6.667 6.667H9.333z"
      ></path>
    </svg>
  );
}

export default UpTriangle;
