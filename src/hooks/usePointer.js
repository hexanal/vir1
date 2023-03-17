import { useCallback, useState, useEffect, useRef } from 'react';
import useDebounce from './useDebounce';

function positionFromOrigin(position, origin) {
    const [x, y] = position;
    const [originX, originY] = origin;

    return [
      x - originX,
      y - originY
    ];
}

export default function usePointer({
  origin = [0, 0],
  min = [0, 0],
  max = [window.innerWidth, window.innerHeight],
  onPointerMove: onCustomPointerMove,
  onPointerDown: onCustomPointerDown,
  onPointerUp: onCustomPointerUp,
} = {}) {
  // const pointers = useRef({});
  const [pointers, setPointers] = useState([]);
  // current position
  // barycenter / center of mass

  const onPointerMove = useCallback(e => {
    if (typeof onCustomPointerMove === 'function') {
      onCustomPointerMove(e);
    }

    const {
      pointerId,
      clientX = 0,
      clientY = 0,
      movementX = 0,
      movementY = 0,
      pointerType,
      buttons = null,
    } = e || {};
    const position = positionFromOrigin([clientX, clientY], origin);
    const [x, y] = position || [];
    const ratio = [
      x / max[0],
      y / max[1]
    ];

    // const previous = pointers.current[pointerId];
    const previous = pointers[pointerId] || [];
    // TODO this is where I'm basically recreating the object that
    // something like `use-gestures` returns; but I'm whipping my own
    const {
      position: previousPosition,
      // angle: previousAngle = 0,
      // delta: previousDelta = [0, 0],
      displace: previousDisplace = [0, 0],
      distance: previousDistance = 0,
      changes: previousChanges = []
    } = previous || {};
    const [x0, y0] = previousPosition || [];

    const deltaX = x - x0;
    const deltaY = y - y0;
    const delta = [deltaX, deltaY];

    const [prevDisplaceX, prevDisplaceY] = previousDisplace || {};
    const displace = [
      deltaX ? prevDisplaceX + deltaX : 0,
      deltaY ? prevDisplaceY + deltaY : 0,
    ];

    const distanceFromCenter = Math.sqrt( y**2 + x**2 ).toFixed(3);
    const thetaFromCenter = Math.atan2(y, x).toFixed(3);
    const angleFromCenter = (thetaFromCenter * 180 / Math.PI).toFixed(3);

    const distanceRatioFromCenter = parseFloat(Math.sqrt( (1-ratio[0])**2 + (1-ratio[1])**2 ).toFixed(3));

    const distance = Math.sqrt( displace[0]**2 + displace[1]**2 ).toFixed(3) * 1;
    const theta = Math.atan2(displace[1], displace[0]).toFixed(3) * 1;
    const angle = (theta * 180 / Math.PI).toFixed(3) * 1;

    // TODO experiment
    // const angleDelta = angle - previousAngle;
    // const angleChanged = angleDelta < 0;
    const distanceDelta = distance - previousDistance;
    const distanceChanged = distanceDelta < -2;
    const changes = distanceChanged ? [...previousChanges, {
      distance,
      position,
      t: Date.now()
    }] : previousChanges;

    const movement = [movementX, movementY];

    const pointer = {
      ...previous,
      position,
      ratio,
      displace,
      movement,
      distance,
      angle,
      distanceFromCenter,
      distanceRatioFromCenter,
      angleFromCenter,
      delta,
      changes,

      buttons,
    };
    const newPointers = pointers.map((p,i) => {
      if (i === pointerId) {
        return pointer;
      }
      return p;
    });

    setPointers(newPointers);

  }, [pointers, setPointers, origin, onCustomPointerMove]);
  // }, [origin, onCustomPointerMove]);

  const onPointerDown = useCallback(e => {
    if (typeof onCustomPointerDown === 'function') {
      onCustomPointerDown(e);
    }

    const {
      pointerId,
      clientX,
      clientY,
      buttons,
    } = e || {};
    const position = positionFromOrigin([clientX, clientY], origin);
    const previous = pointers[pointerId] || [];
    // const previous = pointers.current[pointerId] || [];
    // TODO this is where I'm basically recreating the object that
    // something like `use-gestures` returns; but I'm whipping my own
    // const {
    //   position: previousPosition,
    //   // angle: previousAngle = 0,
    //   // delta: previousDelta = [0, 0],
    //   displace: previousDisplace = [0, 0],
    //   distance: previousDistance = 0,
    //   changes: previousChanges = []
    // } = previous || {};

    // pointers.current[pointerId] = {
    const newPointer = {
      ...previous,
      position,
      start: [...position],
      ratioStart: [position[0]/max[0], position[1]/max[1]],
      buttons // TODO
    };

    setPointers(p => {
      p[pointerId] = newPointer;
      return p;
    });

  }, [pointers, setPointers, onCustomPointerDown, origin]);

  const onPointerUp = useCallback(e => {
    if (typeof onCustomPointerUp === 'function') {
      onCustomPointerUp(e);
    }

    const {
      pointerId,
    } = e || {};

    // if (pointerId !== 0) {
    //   delete pointers.current[pointerId];
    // }
    if (pointerId !== 0) {
      setPointers(p => {
        delete p[pointerId];
        return p;
      });
    }

    // if (pressedButtons === 0) {
    //   setButtons([]);
    // }
    // // TODO handle more?
    // if (pressedButtons >= 3) {
    //   setButtons( pressedButtons.filter(b => b !== button) );
    // }
  }, [pointers, setPointers, onCustomPointerUp]);

  useEffect(() => {
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerUp);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerDown, onPointerUp]);

  return {
    pointers,
    // pointers: pointers.current,
  };
}

