import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useSize from '../hooks/useSize';
import useKeys from '../hooks/useKeys';
import usePointer from '../hooks/usePointer';
// import useFart from '../hooks/useFart';

import Graph from './Graph';
// import Scanner from './Scanner';
// import BiAxialScanner from './BiAxialScanner';
// import BiAxialControls from './BiAxialControls';

export default function HitsOnly(props) {
  const ref = useRef();
  const { t } = useRaf();
  const { pointers, mouse } = usePointer({
    // origin: [],
    // max: []
  });
  const { position: mousePosition } = mouse || {};
  const [mouseX = 0, mouseY = 0] = mousePosition || [];

  const { position, } = pointers[0] || [];
  const [x, y] = position || [];

  const hit = useRef([0, 0]);
  const { size, rect } = useSize({
    ref
  });

  useEffect(() => {
    if (x && y) {
      const { left, width, top, height } = rect || {};
      // const hx = 
      hit.current = [x / width * 100 - left / 100, y / height * 100 - top / 100];
    }
  }, [x, y, rect]);

  return (
    <div ref={ref} style={{display: 'flex', height: '100%', justifyContent: 'center'
    }}>
      <Graph style={{width: 'auto', height: '100%'}}>
        {rect !== null ? (
          <text
            x={51}
            y={1}
            stroke="none"
            style={{font: '1px monospace'}}
          >
            {rect.width}, {rect.height}
          </text>
        ):null}

        {hit.current !== null ? (
          <text
            x={51}
            y={3}
            stroke="none"
            style={{font: '1px monospace'}}
          >
            {hit.current[0]}, {hit.current[1]}
          </text>
        ):null}

        <text
          x={1}
          y={1}
          stroke="none"
          style={{font: '1px monospace'}}
        >
          experiment: where did I touch you?
        </text>

        {hit.current ? (
          <>
            <circle
              cx={hit.current[0]}
              cy={hit.current[1]}
              r={1.5}
              fill="rgb(0 0 255 / 1)"
              stroke="none"
              style={{
                transform: `translate(-50, -50%)`
              }}
            />
            <text
              x={hit.current[0] + 2}
              y={hit.current[1] + 0.5}
              stroke="none"
              style={{font: '1px monospace'}}
            >
              here
            </text>
          </>
        ): null}

      </Graph>
    </div>
  );
};

