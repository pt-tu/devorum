import React, { SVGAttributes } from "react";

function Alarm(props: SVGAttributes<string | SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill={props.fill || "none"}
      viewBox="0 0 20 20"
    >
      <path
        fill={props.fill || "rgb(var(--color-gray-3))"}
        fillRule="evenodd"
        d="M18.332 13.061h-.42c1.157 0 2.088.914 2.088 2.04v.41a.823.823 0 01-.834.816H.834A.825.825 0 010 15.51v-.41c0-1.126.934-2.04 2.087-2.04h-.42a.826.826 0 00.833-.817V7.347C2.5 3.287 5.858 0 10 0c4.143 0 7.5 3.29 7.5 7.347v4.897c0 .454.373.817.833.817zM7.083 17.143h5.833C12.916 18.72 11.61 20 10 20c-1.611 0-2.917-1.28-2.917-2.857z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Alarm;
