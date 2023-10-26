import { useRef } from "react";

export default function Circle(props) {
  const {
    style = {},
    stroke = `rgb(0 0 0 / 1)`,
    strokeWidth = 3,
  } = props || {};

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 100 100`}
      style={{
        overflow: 'visible',
        width: '1rem',
        height: '1rem',
        ...style,
      }}
      preserveAspectRatio="xMidYMid meet"
      stroke={stroke}
      fill="none"
    >
      <ellipse
        cx="50"
        cy="50"
        rx="50"
        ry="50"
        vectorEffect="non-scaling-stroke"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

