import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
// import usePointer from '../../hooks/usePointer';

import FunkControl from '../components/FunkControl';

const COLORS = [
  'rgb(255 255 0 / 1)',
  'rgb(255 0 255 / 1)',
  'rgb(0 255 255 / 1)',
  'rgb(255 0 0 / 1)',
  'rgb(0 255 0 / 1)',
  'rgb(0 0 255 / 1)',
];

export default function Asym1(props) {
  const ref = useRef(null);

  const [thing, setThing] = useState(0);

  const changeThing = useCallback( (val) => {
    setThing(val);
  }, [setThing]);
 
  const [activeIds, setActiveIds] = useState([]);
  const [pointers, setPointers] = useState([]);
  const [primary, setPrimary] = useState(null);
  const [secondary, setSecondary] = useState(null);

  const [particles, setParticles] = useState([]);

  const projectiles = useRef([]);

  const periodic = 1000;
  const nextPeriod = useRef(null);
  const elapsedSeconds = useRef(0);

  useRaf( ({t, elapsed}) => {
    const previous = projectiles.current.filter(projectile => {
      const { t: projT } = projectile;
      return t - 1000 < projT;
    });

    if (t > nextPeriod.current) {
      nextPeriod.current = t + periodic;
    }
    elapsedSeconds.current = Math.floor(elapsed / 1000);

    if (pointers.length > 0) {
      const { position } = pointers[0];

      previous.push({
        id: t,
        t,
        position,
      });
    }

    projectiles.current = previous;

  }, [pointers, projectiles, nextPeriod]);

  const onPointerMove = useCallback(e => {

    // TODO special case: is mouse, and is not clicking

    const {
      pointerId,
      clientX,
      clientY,
      buttons,
      pointerType,
    } = e;

    /*
    const newPointers = pointers.map(p => {
      const { id } = p;
      return id === pointerId ? {
        ...p,
        position: [clientX, clientY],
        buttons,
      } : p;
    }).filter(p => p !== null);
    */
    const mouseIsReleased = buttons === 0 && pointerType === 'mouse';

    setPointers(pointers =>
      pointers.map(p => {
        const { id } = p;
        if (id === pointerId && mouseIsReleased) {
          return null;
        }
        return id === pointerId ? {
          ...p,
          position: [clientX, clientY],
          buttons,
        } : p;
      }).filter(p => p !== null)
    );

  }, [pointers, setPointers]);

  const onPointerDown = useCallback(e => {
    const {
      pointerId,
      clientX,
      clientY,
      buttons,
    } = e;

    const newActives = [...activeIds, pointerId];
    setActiveIds(newActives);

    const newPointers = [...pointers, {
      id: pointerId,
      position: [clientX, clientY],
      buttons,
      backgroundColor: COLORS[newActives.length - 1]
    }];
    setPointers(newPointers);

  }, [activeIds, setActiveIds, pointers, setPointers]);

  const onPointerUp = useCallback(e => {
    const { pointerId } = e;

    const newActives = activeIds.filter(id => {
      return id !== pointerId;
    });
    setActiveIds(newActives);

    const newPointers = pointers.map(p => {
      const { id } = p;

      return id !== pointerId ? p : null;
    }).filter(p => p !== null);

    setPointers(newPointers);
  }, [activeIds, setActiveIds, pointers, setPointers]);

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

      <pre>
        {elapsedSeconds.current}
      </pre>

      {projectiles.current.map( (projectile, i) => {
        const { id, position } = projectile;

        return (
          <div
            style={{
              position: 'absolute',
              left: `${position[0]}px`,
              top: `${position[1]}px`,
              width: '2rem',
              height: '2rem',
              backgroundColor: `rgb(255 0 0 / 1)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
          </div>
        );
      })}

      {pointers.map( (p, i) => {
        const { id, position, buttons, backgroundColor } = p;

        return (
          <pre
            key={`pointer-${id}`}
          >
            ID: {id}
            POS: [{position[0]}, {position[1]}]
            BUT: {buttons}
            <div
              style={{
                position: 'absolute',
                left: `${position[0]}px`,
                top: `${position[1]}px`,
                width: '4rem',
                height: '4rem',
                backgroundColor,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
            </div>
          </pre>
        );
      })}
    </div>
  );
};

