import { Fragment, useMemo } from 'react';

// GREEK.alpha
// GREEK.beta
// GREEK.gamma ?

export default function GraphAxes(props) {
  const {
    xOffset = 50,
    yOffset = 50,
    withoutX = false,
    withoutY = false,
    subdivisions = 0,
    dashes = 5,
  } = props || {};

  // TODO styling?
  const stroke = `rgb(0 0 0 / 0.25)`;
  const strokeDasharray = dashes;

  let subs = [];
  for (let i = 0; i <= subdivisions; i++) {
    subs.push(i);
  }

  // ! i'm tired?!
  const divisions = useMemo(() => {
    if (subs.length === 0) return null;

    return subs.map( sub => (
      <Fragment key={`sub-${sub}`}>
        {/* positives */}
        <line
          stroke={stroke}
          strokeDasharray={strokeDasharray}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          x1={0}
          x2={100}
          y1={xOffset + (100 / subdivisions * 0.5) * sub}
          y2={xOffset + (100 / subdivisions * 0.5) * sub}
        />
        <line
          stroke={stroke}
          strokeDasharray={strokeDasharray}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          x1={yOffset + (100 / subdivisions * 0.5) * sub}
          x2={yOffset + (100 / subdivisions * 0.5) * sub}
          y1={0}
          y2={100}
        />

        {/* negatives */}
        <line
          stroke={stroke}
          strokeDasharray={strokeDasharray}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          x1={0}
          x2={100}
          y1={xOffset - (100 / subdivisions * 0.5) * sub}
          y2={xOffset - (100 / subdivisions * 0.5) * sub}
        />
        <line
          stroke={stroke}
          strokeDasharray={strokeDasharray}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          x1={yOffset - (100 / subdivisions * 0.5) * sub}
          x2={yOffset - (100 / subdivisions * 0.5) * sub}
          y1={0}
          y2={100}
        />
      </Fragment>
    ));
  }, [subdivisions, subs, xOffset, yOffset]);

  return (
    <>
      {/* x axis  */}
      <line
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        x1={0}
        x2={100}
        y1={xOffset}
        y2={xOffset}
      />

      {/* y axis  */}
      <line
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        x1={yOffset}
        x2={yOffset}
        y1={0}
        y2={100}
      />

      {divisions}
    </>
  );
}

