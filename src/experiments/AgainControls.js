import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import usePointer from '../hooks/usePointer';
import useCollision from '../hooks/useCollision';

import Scanner from '../components/viz/Scanner';
import FaderControl from '../components/FaderControl';
import useFaderControl from '../hooks/useFaderControl';

export default function AgainControls(props) {
  const { keys } = useKeys();

  const [size, setSize] = useState([10, 2]);

  const [snapshots, setSnapshots] = useState(256);
  const onHistoryChange = useCallback( val => {
    setSnapshots(val);
  }, [setSnapshots]);

  const [offset, setOffset] = useState(100);
  const onOffsetChange = useCallback( val => {
    setOffset(val);
  }, [setOffset]);

  const {
    value: offset2,
    control: OffsetFader,
  } = useFaderControl({
    label: 'offsetttt',
    value: 0,
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
        <code>
          press some keys to see them on the scanner
        </code>

        <br />

        <FaderControl
          label={`Offset`}
          min={-200}
          max={200}
          current={offset}
          onChange={onOffsetChange}
        />

        <FaderControl
          label={`Snapshots`}
          min={8}
          max={512}
          current={snapshots}
          onChange={onHistoryChange}
        />

        <br />
        <br />

        {/* {offsetControl} */}
        <OffsetFader />

        <Scanner
          label={`offset2`}
          use={offset2}
          processor={n => -0.02 * n}
          history={128}
          offset={100}
          linecolor={`rgb(255 0 255 / 1`}
          withValue
        />

        <Scanner
          label={`HISTORY levels, over time... so meta`}
          use={snapshots}
          processor={n => -1 * n} // TODO "invert"
          scaleFactor={0.002}
          history={128}
          offset={100}
          linecolor={`rgb(255 0 0 / 1`}
          withValue
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

          // indicator={props => {
          //   const {
          //     i,
          //     arr,
          //     frame,
          //   } = props || {};

          //    return (
          //      <div key={frame}>
          //      </div>
          //    );
          // }}

          //  indicator={({
          //    value,
          //    frame,
          //    index,
          //    offset
          //  }) => (
          //    <span
          //      key={`${value}_${frame}`}
          //      style={{
          //        position: 'absolute',
          //        left: `${index}%`,
          //        // width: `${index}%`,
          //        fontSize: `0.5rem`,
          //        fontFamily: 'sans-serif',
          //      }}
          //    >
          //      {/* {frame} */}
          //      {/* {index} */}
          //      {offset}
          //    </span>
          //  )}
          offset={offset}
          history={snapshots}
          size={size}
          linecolor={`rgb(0 0 255 / 1`}
          withValue
        />
      </div>
    </div>
  );
};

