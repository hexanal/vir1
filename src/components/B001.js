import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect } from 'react';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

import Logger from './Logger';
import Graph from './Graph';

export default function B001(props) {
  const {
    FUCK,
  } = useControls({
    FUCK: {
      value: 3,
      min: 1,
      max: 100,
      step: 0.1,
    },
  });

  // const { t, dt, elapsed } = useRaf();

  const { pointers, mouse } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];
  const [pathPoints, setPathPoints] = useState([
    {
      id: uuidv4(),
      type: 'M',
      coords: [25, 25],
    },
    {
      id: uuidv4(),
      type: 'L',
      coords: [75, 25],
    },
    {
      id: uuidv4(),
      type: 'L',
      coords: [75, 55],
    },
    {
      id: uuidv4(),
      type: 'C',
      coords: [50, 55, 50, 55, 50, 100],
    },
    {
      id: uuidv4(),
      type: 'C',
      coords: [50, 55, 50, 55, 25, 55],
    },
    {
      id: uuidv4(),
      type: 'L',
      coords: [25, 25],
    },
  ]);

  const { keys } = useKeys();

  useEffect(()=> {
    if ( keys.includes('a') ) {
      const coords = [
        50 + (x / window.innerWidth * 100),
        50 + (y / window.innerHeight * 100),
      ]
      console.log(coords);
      setPathPoints(p => [...p, {
        type: 'L',
        coords
      }]);
    }

    if ( keys.includes('d') ) {
      setPathPoints(p => {
        p.unshift();
        return p;
      });
    }
    if ( keys.includes('o') ) {
      setPathPoints(p => {
        p.pop();
        return p;
      });
    }
  }, [keys, x, y, setPathPoints]);

  const onPointChange = useCallback(e => {
    console.log(e);
  }, []);

  // return `
  //   M 25,25
  //   L 75,25
  //     75,75
  //   C 50,75,50,75,50,100
  //     50,75,50,75,100,25
  //   L 25,25
  // `;

  return (
    <div>
      {/*
      <form style={{
        fontSize: '0.7rem',
        position: 'absolute',
        top: '1rem',
        left: '1rem',
      }}>
        {pathPoints.map(({ type, coords }, i) => {
          return (
            <div key={`${coords.join('-')}-${type}`}>
              <label>
                {i} —
                <input style={{ width: '2rem' }} value={type} type="text" onInput={onPointChange} />
                <input value={coords[0]} type="number" onInput={onPointChange} />
                <input value={coords[1]} type="number" onInput={onPointChange} />
              </label>
            </div>
          );
        })}
      </form>
      */}

      <Graph>
        <circle
          cx={50}
          cy={50}
          r={3}
          fill="rgb(150 150 150 / 0.5)"
          stroke="none"
        />
        <path
          d={pathPoints.map(({ type, coords }, i) => {
            const finalType = i === 0 ? 'M' : type;
            const pointString = `${finalType} ${coords.join(',')}`;
            return pointString;
            // return `
              
            // `;
          }).join(' ') }
          stroke="rgb(128 128 255 / 1)"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </Graph>
    </div>
  );
};
