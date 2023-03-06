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
  const what = useRef([0, 0]);

  useEffect(() => {
    const fuck = ref.current ? ref.current.getBoundingClientRect() : null;
    const { x: elx, y: ely } = fuck || {};
    what.current = [elx, ely];
  }, [rect]);

  useEffect(() => {
    if (x && y) {
      const [offsetX, offsetY] = what.current;
      const { width, height } = rect || {};
      // console.log(what.current);
      // const offsetX = (window.innerWidth - width) / 2;
      const diffX = x - offsetX;
      const ratioX = diffX / width;

      // const offsetY = (window.innerHeight - height) / 2;
      const diffY = y - offsetY;
      const ratioY = diffY / height;

      hit.current = [ratioX * 100, ratioY * 100];
    }
  }, [x, y]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        width: '50%',
        // height: '20%',
        cursor: x && y ? 'crosshair' : 'default'
      }}
    >
    <Graph
      style={{
        cursor: x && y ? 'crosshair' : 'default'
      }}
    >
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

      {x && y  ? (
        <text
          x={30}
          y={3}
          stroke="none"
          style={{font: '1px monospace'}}
        >
          {x}, {y}
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

