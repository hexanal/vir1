import { forwardRef } from 'react';

const GraphWithRef = forwardRef(function Graph(
  {
    children,
    style,
    // size = [3,3],
    size = null,
    origin = [0, 100],
    max = [100, 100],
    min = [0, 0],
    withoutLines = false,
  },
  ref
) {
  const [ox, oy] = origin;
  const [maxx, maxy] = max;
  const [minx, miny] = min;
  const [sx = 100, sy = 100] = size || [];

  // viewBox={`0 0 ${maxx} ${maxy}`}

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 100 100`}
      preserveAspectRatio={size === null ? 'all' : 'none'}
      style={{
        width: size === null ? '100%' : `${sx}rem` ,
        height: size === null ? '100%' : `${sy}rem`,
        stroke: 'rgb(0 0 0 / 1)',
        strokeWidth: '1px',
        ...style,
      }}
    >
      {!withoutLines ? (
        <>
          <line
            vectorEffect="non-scaling-stroke"
            x1={minx}
            x2={maxx}
            y1={oy}
            y2={oy}
          />

          {/*
          <line
            vectorEffect="non-scaling-stroke"
            x1={minx}
            x2={maxx}
            y1={oy}
            y2={oy}
          />
          */}

          <line
            vectorEffect="non-scaling-stroke"
            x1={ox}
            x2={ox}
            y1={miny}
            y2={maxy}
          />

          {/* <line vectorEffect="non-scaling-stroke" x1="50" x2="50" y1="0" y2="100" /> */}
        </>
      ): null}
      {children}
    </svg>
  );
});

export default GraphWithRef;
