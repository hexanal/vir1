import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'react';
import  {
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';

import Graph from '../components/viz/Graph';

import useCollision from '../hooks/useCollision';
import usePointer from '../hooks/usePointer';

import useFaderControl from '../hooks/useFaderControl';
import useToggleControl from '../hooks/useToggleControl';
import useSelection from '../hooks/useSelection';

export default function SizeUp(props) {
  // const [xx, setXx] = useState('chicken');
  const [withCoords, WithCoordsToggle] = useToggleControl({
    label: 'With coordinates',
    value: false,
  });
  const [posX, PosXFader] = useFaderControl({
    label: 'X Position',
    value: 0,
    max: window.innerWidth,
  });
  const [posY, PosYFader] = useFaderControl({
    label: 'Y Position',
    value: 0,
    max: window.innerHeight,
  });

  const { pointers } = usePointer();
  const { position, buttons } = pointers[0] || {};
  const [x, y] = position || [];

  const graphRef = useRef(null);
  const { hit } = useCollision({
    ref: graphRef,
    cursor: [x, y]
  });
  const [hitX = 0 , hitY = 0] = hit || [];

  const {
    selectionPath,
    selectedPath,
    from,
    to,
    selected,
    isSelected,
  } = useSelection({
    coords: buttons === 1 ? hit : null
  });

  // current sel
  const [x1 = 0, y1 = 0] = from || [];
  const [x2 = 0, y2 = 0] = to || [];

  const items = useRef([]);
  const newItem = useRef(null);

  useEffect( () => {
    if (buttons === 1) {
      const r = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      newItem.current = {
        coords: [x1, y1, x2, y2],
        radius: r
      };
    }
    if (buttons === 0 && newItem.current !== null) {
      const created = {
        ...newItem.current,
        id: uuidv4(),
      };
      items.current = [...items.current, created];

      newItem.current = null;
    }
  }, [buttons, x1, y1, x2, y2]);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1rem',
          left: '1rem',
        }}
      >
        <WithCoordsToggle />

        <button type="button" onClick={() => items.current = []}>
          CLEAR!
        </button>
      </div>

      <Graph
        ref={graphRef}
        style={{
          position: 'absolute',
          left: '50%',
          width: 'auto',
          height: '100%',
          transform: `
            translateX(-50%)
          `,
        }}
        withoutLines
      >
        <GraphAxes />

        {selectionPath ? (
          <>
            {withCoords ? (
              <>
                <text
                  x={x2}
                  y={y2}
                  style={{
                    fontSize: '1px'
                  }}
                  fill={`rgb(0 0 0 / 1)`}
                  stroke={`none`}
                >[{x1}, {y1}]</text>

                <text
                  x={x2}
                  y={y2 + 2}
                  style={{
                    fontSize: '1px'
                  }}
                  fill={`rgb(0 0 0 / 1)`}
                  stroke={`none`}
                >[{x2}, {y2}]</text>
              </>
            ):null}

            <path
              style={{
                stroke: 'rgb(255 0 255 / 1)',
                fill: `rgb(0 0 0 / 0)`,
              }}
              d={selectionPath}
              vectorEffect="non-scaling-stroke"
            />
          </>
        ): null}

        {hit ? (
          <circle
            cx={hitX}
            cy={hitY}
            r={2}
            fill={'rgb(0 0 255 / 1)'}
            stroke={'none'}
          />
        ): null}

        {newItem.current !== null ? (
          <circle
            cx={newItem.current.coords[0]}
            cy={newItem.current.coords[1]}
            // r={Math.abs( newItem.current[0] - newItem.current[2] )}
            r={newItem.current.radius
            }
            fill={`rgb(255 128 64 / 1)`}
            stroke={`none`}
          />
        ):null}

        {items.current.map(item => {
          const { id, coords, radius } = item || {};
          const [itemX, itemY] = coords || [];

          return (
            <Fragment key={id}>
              <circle
                cx={itemX}
                cy={itemY}
                r={radius}
                fill={`rgb(255 0 0 / 1)`}
                stroke={`none`}
                vectorEffect={`non-scaling-stroke`}
              />
            </Fragment>
          );
        })}

      </Graph>
    </div>
  );
};

function GraphAxes() {
  return (
    <>
      {/* x axis  */}
      <line
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        x1={0}
        x2={100}
        y1={50}
        y2={50}
      />
      {/* y axis  */}
      <line
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        x1={50}
        x2={50}
        y1={0}
        y2={100}
      />
    </>
  );
}

