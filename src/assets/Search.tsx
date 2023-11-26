import React, { SVGAttributes } from 'react'

function Search(props: SVGAttributes<string | SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill={props.fill || 'none'}
      viewBox="0 0 21 21"
      {...props}
    >
      <circle cx="10" cy="9" r="8" stroke={props.fill || 'rgb(var(--color-gray-3))'} strokeWidth="2"></circle>
      <path
        stroke={props.fill || 'rgb(var(--color-gray-3))'}
        strokeLinecap="round"
        strokeWidth="2"
        d="M15.5 15.5l4 4"
      ></path>
    </svg>
  )
}

export default Search
