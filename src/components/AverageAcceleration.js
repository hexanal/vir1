import { useState, useEffect } from 'react';
import usePointer from '../hooks/usePointer.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';
import { useControls }  from 'leva';

import Logger from './Logger';
import Graph from './Graph';

function control(others = {}) {
  return {
    value: 0,
    min: -100,
    max: 100,
    step: 1,
    ...others
  };
}

export default function AverageAcceleration(props) {
  // const { keys } = useKeys();
  // const { pointers, mouse } = usePointer();
  // const { position: mousePosition } = mouse || {};
  // const [x, y] = mousePosition || [];
  // const { t } = useRaf();

  const {
    x2,
    x1,
    // y2,
    // y1,
    t2,
    t1,
  } = useControls({
    x2: control({value: 5}),
    x1: control(),
    // y2: control({value: 5}),
    // y1: control(),
    t2: control({value: 5}),
    t1: control(),
  });

  // useEffect( () => {
  // }, [x2, x1, t2, t1]);

  const vav = (x2 - x1) / (t2 - t1);
  // const vyav = (y2 - y1) / (t2 - t1);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'crosshair'
      }}
    >
      <Logger use={{
        x2, x1, t2, t1, vav
      }} />

      <Graph>
        <circle
          cx={50 + t1}
          cy={50 - x1}
          r={1}
          fill="rgb(0 0 0 / 1)"
        />
        <circle
          cx={50 + t2}
          cy={50 - x2}
          r={1}
          fill="rgb(0 0 0 / 1)"
        />
      </Graph>
    </div>
  );
};
