export default function Wave(props) {
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
      preserveAspectRatio="none"
      stroke={stroke}
      fill="none"
    >
      <path
        d={`
          M 0,50
          Q 25,0 50,50
          Q 75,100 100,50
        `}
        vectorEffect="non-scaling-stroke"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

