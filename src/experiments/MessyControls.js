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

export default function MessyControls(props) {
  const { t } = useRaf();
  const { keys } = useKeys();

  const [testValue, ScannerTestValueControl] = useFaderControl({
    label: 'Scanner test value',
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  });
  const [scannerWidth, ScannerWidthControl] = useFaderControl({
    label: 'Scanner width',
    value: 10,
    min: 1,
    max: 100,
    step: 0.5,
  });
  const [scannerHeight, ScannerHeightControl] = useFaderControl({
    label: 'Scanner height',
    value: 2,
    min: 1,
    max: 100,
    step: 0.5,
  });
  const [scannerOffset, ScannerOffsetControl] = useFaderControl({
    label: 'Scanner offset',
    value: 100,
    min: -100,
    max: 100,
    step: 10,
  });

  // RECURSE!!!
  const [fuck, ScannerFuck] = useFaderControl({
    label: 'Scanner fuckery',
    value: 512,
    min: 16,
    max: 1024,
    step: 8,
  });

  const [scannerHistory, ScannerHistoryControl] = useFaderControl({
    label: 'Scanner history snapshots',
    value: 64,
    min: 8,
    max: fuck,
    step: 8,
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
        <ul style={{padding: 0, margin: '1rem 0', listStyle: 'none'}}>
          <li>
            <ScannerTestValueControl />
          </li>
          <li>
            <ScannerWidthControl />
          </li>
          <li>
            <ScannerHeightControl />
          </li>
          <li>
            <ScannerOffsetControl />
          </li>
          <li>
            <ScannerFuck />
          </li>
          <li>
            <ScannerHistoryControl />
          </li>
        </ul>

        <Scanner
          label={`offset2`}
          use={testValue * (2 + Math.sin(t * 0.005))}
          size={[scannerWidth, scannerHeight]}
          processor={n => -1 * n}
          offset={scannerOffset}
          history={scannerHistory}
          linecolor={`rgb(0 0 255 / 1`}
          withValue
        />
      </div>
    </div>
  );
};

