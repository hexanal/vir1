import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import usePointer from '../hooks/usePointer';
import useCollision from '../hooks/useCollision';

import Scanner from '../components/viz/Scanner';
import Graph from '../components/viz/Graph';
import GraphScanner from '../components/viz/GraphScanner';
import useFaderControl from '../hooks/useFaderControl';

export default function EvenMoreControls(props) {
  const { keys } = useKeys();
  const [snapshots, setSnapshots] = useState(256);
  const onHistoryChange = useCallback( val => {
    setSnapshots(val);
  }, [setSnapshots]);

  const {
    value: sizeX,
    control: SizeXFader,
  } = useFaderControl({
    label: 'size x',
    value: 10,
    min: 1,
    max: 20,
    step: 0.5,
  });
  const {
    value: sizeY,
    control: SizeYFader,
  } = useFaderControl({
    label: 'size y',
    value: 2,
    min: 1,
    max: 20,
    step: 0.5,
  });

  const {
    value: offset,
    control: OffsetFader,
  } = useFaderControl({
    label: 'offset',
    value: 100,
    min: 0,
    max: 100,
    step: 10,
  });

  return (
    <div>
      <div
        style={{
          zIndex: 3,
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      >
        <OffsetFader />
        <SizeXFader />
        <SizeYFader />

        <GraphScanner
          size={[sizeX, sizeY]}
          label={`keys`}
          min={[0, 0]}
          max={[100, 100]}
          origin={[0, 100]}
          use={keys.length * -1 * 20}
          history={64}
          colors={{
            indicator: `rgb(0 255 128 / 1` // TODO hmm..
          }}
          // graphStyle={{
          // }}
        />

        <GraphScanner
          size={[sizeX, sizeY]}
          label={`offset`}
          min={[0, 0]}
          max={[100, 100]}
          origin={[0, 100]}
          use={offset * -1}
          history={128}
          colors={{
            indicator: `rgb(255 0 0 / 1` // TODO hmm..
          }}
          // graphStyle={{
          // }}
        />

        <Scanner
          label={`offset`}
          use={offset}
          processor={n => -1 * n} // TODO "invert"
          scaleFactor={0.01}
          history={128}
          offset={100}
          linecolor={`rgb(255 0 0 / 1`}
          withValue
        />

        <Scanner
          label={`type some keyboard keys`}
          use={keys}
          processor={n => -1 * n.length}
          offset={offset}
          history={snapshots}
          size={[10, 2]}
          linecolor={`rgb(0 0 255 / 1`}
          withValue
        />

        <Graph
          origin={[50, 50]}
          size={[8,8]}
        >
          <circle
            cx={50}
            cy={50}
            r={3}
          />
        </Graph>
      </div>
    </div>
  );
};

