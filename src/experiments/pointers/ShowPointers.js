import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../../hooks/useRaf';
import useKeys from '../../hooks/useKeys';
import useGamepads from '../../hooks/useGamepads';
import usePointer from '../../hooks/usePointer';

import BiAxialControls from '../../components/BiAxialControls';
import BiAxialScanner from '../../components/viz/BiAxialScanner';
import Graph from '../../components/viz/Graph';
import Scanner from '../../components/viz/Scanner';

export default function ShowPointers(props) {
  const ref = useRef(null);
  const [activeIds, setActiveIds] = useState([]);
  const [primary, setPrimary] = useState(null);
  const [secondary, setSecondary] = useState(null);

  const onPointerMove = useCallback(e => {
    console.log('pointer move');
  }, []);
  const onPointerDown = useCallback(e => {
    const { pointerId } = e;

    console.log('pointer id', pointerId);
    console.log('pointer down', e);

    const newActives = activeIds.includes(pointerId) ? activeIds : [...activeIds, pointerId];
    setActiveIds(newActives);

  }, [primary, setPrimary, activeIds, setActiveIds]);

  const onPointerUp = useCallback(e => {
    const { pointerId } = e;

    console.log('pointer up');
    const newActives = activeIds.filter(id => {
      return id !== pointerId;
    });
    setActiveIds(newActives);
  }, [primary, setPrimary, activeIds, setActiveIds]);

  useEffect(() => {
    ref.current.addEventListener('pointermove', onPointerMove);
    ref.current.addEventListener('pointerdown', onPointerDown);
    ref.current.addEventListener('pointerup', onPointerUp);

    return () => {
      ref.current.removeEventListener('pointermove', onPointerMove);
      ref.current.removeEventListener('pointerdown', onPointerDown);
      ref.current.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerDown, onPointerUp]);

  /*
      {pointers.map( (pointer) => {
        const { position } = pointer || {};
        const [x, y] = position;
        return (
          <div
            style={{
              position: 'absolute',
              top: `${y}px`,
              left: `${x}px`
            }}
          >
            <div>x: {x}</div>
            <div>y: {y}</div>
          </div>
        );
      })}
      */

  return (
    <div 
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'grey'
      }}
    >
      {activeIds.map( activeId => {
        return (
          <div key={activeId}>
            ID: {activeId}
          </div>
        );
      })}
    </div>
  );
};

