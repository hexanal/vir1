import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

import useRaf from '../../hooks/useRaf';
import useKeys from '../../hooks/useKeys';
import useGamepads from '../../hooks/useGamepads';
import useFart from '../../hooks/useFart';
import usePointer from '../../hooks/usePointer';
import useFaderControl from '../../hooks/useFaderControl';
import useToggleControl from '../../hooks/useToggleControl';

/*
 * chatgpt
 *

distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)

      v1 = v1 - 2 * dot(v1 - v2, x1 - x2) / dot(x1 - x2, x1 - x2) * (x1 - x2)
? vx = vx - 2 * dot(vx - vx2, x1 - x2) / dot(x1 - x2, x1 - x2) * (x1 - x2)
? vy = vy - 2 * dot(vy - vy2, y1 - y2) / dot(y1 - y2, y1 - y2) * (y1 - y2)
? vz = vz - 2 * dot(vz - vz2, z1 - z2) / dot(z1 - z2, z1 - z2) * (z1 - z2)

x = x + vx * dt
y = y + vy * dt
z = z + vz * dt

*/

function applyForceVectorWithMass(coords, delta, force, mass = 1, inertia) {
  // Calculate the acceleration vector using F = ma
  let acceleration = force.map(f => f / mass);
  // Calculate the change in velocity using a = F/m and delta t = delta
  let delta_v = acceleration.map(a => a * delta);
  // Calculate the change in position using v = d/t and delta t = delta
  let delta_d = coords.map((c, i) => delta_v[i] * delta + 0.5 * acceleration[i] * Math.pow(delta, 2));
  // Apply the change in position to the coordinates
  let new_coords = coords.map((c, i) => c + delta_d[i]);
  // Calculate the change in orientation using delta t = delta and I = mr^2
  // let delta_theta = inertia.map((i, j) => delta_v[j] * delta / i);
  // Apply the change in orientation to the coordinates
  // let new_orientation = coords.map((c, i) => c + delta_theta[i]);
  // return { coords: new_coords, orientation: new_orientation };
  return new_coords;
}

function applyForceVector(coords, delta, force) {
  let displacement = force.map(f => delta * f);
  let new_coords = coords.map((c, i) => c + displacement[i]);

  return new_coords;
}

const gravityForceVector = [0, 1.5, 0];

const GRAVITY_CONSTANT = 9.81;

export default function Phys1(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers } = usePointer({
    // origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position, buttons, displace, distance } = pointers[0] || {};
  const [x, y] = position || [];

  const balls = useRef([]);

  // const [ballSize, BallSizeControl] = useFaderControl({
  //   label: 'Size of the ball',
  //   value: 64,
  //   min: 0,
  //   max: vh / 2,
  //   step: 1,
  // });
  // const [lambda, LambdaControl] = useFaderControl({
  //   label: '𝜆',
  //   value: 0.2,
  //   min: 0.001,
  //   max: 5,
  //   step: 0.001,
  // });

  useEffect(() => {
    if (buttons === 1) {
      balls.current.push({
        id: uuidv4(),
        coords: [x, y],
        radius: 10,
      });
    }
  }, [buttons, x, y]);

  useRaf( ({t, dt, elapsed}) => {
    const c = ref.current.getContext('2d');
    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    balls.current = balls.current.map((b,i) => {
      const { id, coords, radius } = b || {};
      // const [dotX, dotY] = coords || [];

      // const newCoords = applyForceVector(coords, dt, gravityForceVector);
      const newCoords = applyForceVectorWithMass(coords, dt, gravityForceVector, 30);
      const [dx, dy, dz] = newCoords || [];

      let newX = Math.min(vw, dx);
      let newY = Math.min(vh, dy);

      if (newY === vh) {
         newY = 0;
      }

      if (i === 0) {
        // console.log(dt);
      }

      c.beginPath();
      c.arc(
        newX,
        newY,
        radius,
        0,
        2 * Math.PI
      );
      c.fill();

      // c.font = '12px monospace';
      // c.fillStyle = `rgb(0 0 255 / 1)`;
      // c.fillText(id, dotX + radius + 1, dotY + Math.sin(t * 0.001) * 10);
      return {
        ...b,
        coords: [
          newX,
          newY
        ],
      };
    });
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
      </div>

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




/*
 *
float x, float y, float radius,
float startAngle, float endAngle,

beginPath()
closePath()
fill()
stroke()
clip()
moveTo(float x, float y)
lineTo(float x, float y)
quadraticCurveTo(float cpx, float cpy, float x, float y)
bezierCurveTo(
float cp1x, float cp1y, float cp2x,
float cp2y, float x, float y)
arcTo(float x1, float y1, float x2, float y2, float radius)
arc(
float x, float y, float radius,
float startAngle, float endAngle,
boolean anticlockwise)
rect(float x, float y, float w, float h)
isPointInPath(float x, float y)


*/

function TESTwave({ A, lambda, x, v, t, }) {
  const w1 = A * Math.sin(
    (2 * Math.PI * x)
    / (lambda - 2 * Math.PI * v * t)
  );
  console.table({ w1, A, lambda, x, v, t });
  return w1.toFixed(3);
}
