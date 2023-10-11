export default function Star(props) {
  const {
    style = {},
    stroke = `rgb(0 0 0 / 1)`,
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
          C 50,50, 50,50, 50,0
          C 50,50, 50,50, 100,50
          C 50,50, 50,50, 50,100
          C 50,50, 50,50, 0,50
        `}
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

