import { useCallback, useState, useEffect } from 'react';

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
  onPointerMove: onCustomPointerMove,
  onPointerDown: onCustomPointerDown,
  onPointerUp: onCustomPointerUp,
} = {}) {
  const [pointers, setPointers] = useState([]);
  const [mouse, setMouse] = useState(null);
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
      pointerType
    } = e || {};
    const position = positionFromOrigin([clientX, clientY], origin);
    const [x, y] = position || [];

    if (pointerType === 'mouse') {
      setMouse({
        position: [x, y],
      });
    }

    setPointers(p => p.map(o => {
      if (o.pointerId !== pointerId) return o;

      // TODO this is where I'm basically recreating the object that
      // something like `use-gestures` returns; but I'm whipping my own
      const {
        position: previousPosition,
        // angle: previousAngle = 0,
        // delta: previousDelta = [0, 0],
        displace: previousDisplace = [0, 0],
        distance: previousDistance = 0,
        changes: previousChanges = []
      } = o || {};
      const [x0, y0] = previousPosition || {};

      const deltaX = x - x0;
      const deltaY = y - y0;
      const delta = [deltaX, deltaY];

      const [prevDisplaceX, prevDisplaceY] = previousDisplace || {};
      const displace = [
        prevDisplaceX + deltaX,
        prevDisplaceY + deltaY,
      ];

      const distanceFromCenter = Math.sqrt( y**2 + x**2 ).toFixed(3);
      const thetaFromCenter = Math.atan2(y, x).toFixed(3);
      const angleFromCenter = (thetaFromCenter * 180 / Math.PI).toFixed(3);

      const distance = Math.sqrt( displace[0]**2 + displace[1]**2 ).toFixed(3);
      const theta = Math.atan2(displace[1], displace[0]).toFixed(3);
      const angle = (theta * 180 / Math.PI).toFixed(3);

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

      return {
        ...o,
        position,
        displace,
        distance,
        angle,
        distanceFromCenter,
        angleFromCenter,
        delta,
        changes,
      };
    }));
  }, [setPointers, setMouse, origin, onCustomPointerMove]);

  const onPointerDown = useCallback(e => {
    // console.log({pointerdown: true, e});
    if (typeof onCustomPointerDown === 'function') {
      onCustomPointerDown(e);
    }

    const {
      pointerId,
      clientX,
      clientY,
      // button = 0,
      // pressedButtons = 0
    } = e || {};
    const position = positionFromOrigin([clientX, clientY], origin);

    setPointers(p => [...p, {
      pointerId,
      position,
    }]);
  }, [setPointers, onCustomPointerDown, origin]);

  const onPointerUp = useCallback(e => {
    // console.log({Pointerup: true, e});
    if (typeof onCustomPointerUp === 'function') {
      onCustomPointerUp(e);
    }

    const {
      pointerId,
      // button = 0,
      // buttons: pressedButtons = 0
    } = e || {};

    setPointers(p => p.filter(o => o.pointerId !== pointerId));

    // if (pressedButtons === 0) {
    //   setButtons([]);
    // }
    // // TODO handle more?
    // if (pressedButtons >= 3) {
    //   setButtons( pressedButtons.filter(b => b !== button) );
    // }
  }, [setPointers, onCustomPointerUp]);

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
    mouse,
  };
}

