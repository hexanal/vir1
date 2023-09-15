import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

import useRaf from '../hooks/useRaf';
import usePointers from './usePointers';

function worldline(x0, y0, z0, t0, vx, vy, vz) {
  let t = 0;
  let x = x0;
  let y = y0;
  let z = z0;
  let dt = 0.001;
  let c = 1;

  while (t < t0) {
    let v = Math.sqrt(vx * vx + vy * vy + vz * vz);
    let gamma = 1 / Math.sqrt(1 - (v * v / (c * c)));

    x += vx * gamma * dt;
    y += vy * gamma * dt;
    z += vz * gamma * dt;
    t += dt;
  }

  return [x, y, z, t];
}

function computeNewCoordinates({ current, mass, forces, dt }) {
  let acceleration = [0, 0, 0];
  let velocity = [0, 0, 0];

  // Compute the net force vector
  const netForce = forces.reduce((acc, force) => acc.map((f, i) => f + force[i]), [0, 0, 0]);

  // Check if the net force vector is all zeroes
  const isZeroForce = netForce.every((f) => f === 0);

  // Compute the acceleration and velocity based on the net force vector
  if (!isZeroForce) {
    acceleration = netForce.map((f) => f / mass);
    velocity = current.map((c, i) => c + acceleration[i] * dt);
  }

  // Compute the new coordinates based on the velocity and time delta
  const newCoords = current.map((c, i) => c + velocity[i]);

  return newCoords;
}

let prevCoords = [];
function getMotion({ coords, dt }) {
  let prevVelocity = new Array(coords.length).fill(0);

  const velocity = coords.map((coord, index) => {
    const velocity = (coord - prevCoords[index]) / dt;
    prevCoords[index] = coord;
    return velocity;
  });

  const acceleration = velocity.map((velocity, index) => {
    const acceleration = (velocity - prevVelocity[index]) / dt;
    prevVelocity[index] = velocity;
    return acceleration;
  });

  prevCoords = coords;

  return { velocity, acceleration };
}

export default function ProtoTwo(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers, primaryPointer, mouseButtonsPressed } = usePointers();

  const testCoords = useRef([50, 50]);

  useRaf( ({ t, dt } ) => {
    const c = ref.current.getContext('2d');
    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    if (!pointers[0]) {
      return;
    }

    Object.keys(pointers).map( pointerId => {
      console.log(pointerId);
      const { x, y } = pointers[pointerId] || {};
      c.font = '13px monospace';
      // c.fillStyle = `rgb(255 0 0 / 1)`;
      // c.fillText(
      //   `trying to do physics`,
      //   window.innerWidth / 2 + Math.sin(primaryY * 0.01) * 10,
      //   window.innerHeight / 2 + Math.cos(primaryY * 0.01) * 10
      // );


      c.fillStyle = `rgb(0 0 255 / 1)`;
      c.fillText(`x ${x}`, 20, 20);
      c.fillText(`y ${y}`, 20, 40);




      c.fillStyle = `hsl(${60 * (mouseButtonsPressed.has('right') ? 2 : 1)} 50% 50%)`;
      c.beginPath();
      c.arc(
        x,
        y,
        20 * (mouseButtonsPressed.has('left') ? 2 : 1),
        0,
        2 * Math.PI
      );
      c.fill();


      c.fillStyle = `rgb(0 0 0 / 1)`;
      c.fillText(`x ${x}`, x, y);
      c.fillText(`y ${y}`, x, y + 15);

    });

    // const { velocity, acceleration } = getMotion({
    //   coords: [x, y],
    //   dt
    // });
    // const [vx, vy] = velocity || [];
    // const [ax, ay] = acceleration || [];

    /*
    c.fillStyle = `rgb(255 0 255 / 1)`;
    c.fillText(`vx ${vx}`, 20, 60);
    c.fillText(`vy ${vy}`, 20, 80);

    c.fillStyle = `rgb(255 255 100 / 1)`;
    c.fillText(`ax ${ax}`, 20, 100);
    c.fillText(`ay ${ay}`, 20, 120);

    const [x2, y2] = computeNewCoordinates({
      current: testCoords.current,
      mass: 0.1,
      forces: [
        [0, 0]
      ],
      dt
    });
    // console.log([x2, y2]);
    testCoords.current = [Math.min(vw, x2), Math.min(vh, y2)];

    c.fillStyle = `rgb(0 0 0 / 1)`;
    c.fillText(`ax ${x2}`, 20, 140);
    c.fillText(`ay ${y2}`, 20, 160);
    */
  });


  return (
    <div>
      <canvas
        ref={ref}
        width={vw}
        height={vh}
        style={{
          position: 'fixed',
          zIndex: 2,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

