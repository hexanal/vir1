import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf from '../../hooks/useRaf';
import Graph from './Graph';

function Err(props) {
  const { style = null, } = props || {};
  return (
    <h1 style={{fontSize: '2rem', margin: 0, lineHeight: 1, ...style }}>ERR</h1>
  );
}

export default function GraphScanner(props) {
  const {
    id = '—',
    size = [10,2],
    use = null,
    // timeframe = 1000, // TODO
    snapshots = 256,
    processor = null,
    colors = {
      indicator: 'rgb(255 0 255 / 1)',
      background: 'rgb(255 0 255 / 1)',
      axes: 'rgb(255 0 255 / 1)',
      // TODO etc.
    },
    label = null,
    min = [0, 0],
    max = [100, 100],
    origin = [0, 100],
    indicator = 'wire', // TODO bar, point, cross, ...?
    style = null,
    graphStyle = null,
  } = props || {};
  const start = useRef(Date.now());
  const v = useRef([]);
  const { t, dt, elapsed } = useRaf();
  const [width, height] = size;
  const latest = useRef(null);

  const [ox, oy] = origin;

  useEffect(() => {
    const newV = {
      frame: t,
      value: processor !== null ? processor(use) : use,
      raw: use,
    };
    const { frame = null, value = null } = v.current[0] || {};

    latest.current = value;

    if (t !== frame) {
      v.current.unshift(newV);
      v.current = v.current.slice(0, snapshots);
    }
  }, [t, dt, elapsed, use, snapshots]);

  const d = useCallback( t => {
    let str = '';

    for (let i = 0; i <= snapshots; i++) {
      const { frame = null, value = null} = v.current[i] || {};

      if (value === null) continue;

      const lx = ox + i;
      const ly = oy + value;
      const type = i === 0
        ? `M`
        : `L`;

      str += `
        ${type} ${lx},${ly}
      `;
    }

    return str;
  }, [snapshots, ox, oy]);

  return (
    <div
      className="scanner"
    >
      {label !== null
        ? (
          <h1
            style={{
              fontSize: '0.6rem',
              fontWeight: '400',
              margin: 0,
            }}
          >
            {label}
          </h1>
        )
        : null
      }

      <Graph
        size={size}
        origin={origin}
        min={min}
        max={max}
      >
        {indicator === 'wire' || indicator === 'line'
          ? (
            <path
              d={d(t)}
              stroke="rgb(255 0 0 / 1)"
              // fill="rgb(255 0 0 / 1)"
              fill="transparent"
              vectorEffect="non-scaling-stroke"
            />
          ): null
        }
      </Graph>
    </div>
  );
};
