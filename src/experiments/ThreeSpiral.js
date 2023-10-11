import { v4 as uuidv4 } from 'uuid';
import { Vector3, Quaternion } from 'three';
import { useCallback, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

function norm(value = 0, step = 0.001) {
  return {
    min: -1,
    max: 1,
    value,
    step,
  }
}

function Point(props) {
  const { id, coords, fill } = props || {};
  const [x = 0, y = 0, z = 0] = coords || [];
  const ref = useRef(null);
  const t = useRef(0);

  useFrame((state, delta) => {
    t.current += delta;
    ref.current.position.x = x + Math.sin(t.current * 0.5 + y) * 5;
    ref.current.position.y = y + Math.cos(t.current * 0.5 + y) * 5;
    ref.current.position.z = z + Math.sin(t.current * 0.5 + y) * 5;
  });

  return (
    <group>
      <mesh position={[x, y, z]} ref={ref}>
         <sphereGeometry args={[1, 16, 16]} />
         {/* <meshStandardMaterial color={fill} transparent /> */}
         <meshStandardMaterial color={fill} transparent />
      </mesh>
    </group>
  );
}

export default function ThreeSpiral(props) {
  const {
    origin = [0.5, 0.5],
    color = `rgb(0 0 0 / 1)`,
    timeOffset = 0,
    noControls = false,
  } = props;

  const {
    POINTS,
    ALPHA,
    BETA,
    THETA,
    TIMESCALE,
  } = useControls({
    POINTS: {
      value: 1024,
      min: 0,
      max: 1024,
      step: 1,
    },
    ALPHA: {
      min: 1.28,
      max: 2,
      value: 0.2,
      step: 0.001,
    },
    BETA: {
      min: 1,
      max: 100,
      value: 1,
      step: 0.1,
    },
    THETA: {
      min: 0.01,
      max: 0.5,
      value: 0.25,
      step: 0.01,
    },
    TIMESCALE: {
      min: 0.1,
      max: 100,
      value: 1,
      step: 0.1,
    }
  });

  const { t, dt, elapsed } = useRaf();

  const { pointers, mouse, active } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });

  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];


  const d = useCallback( t => {
    const [originX, originY] = origin || [0.5, 0.5];
    let str = `M ${originX * 100},${originY * 100}`;

    const angleWobble = (1 + Math.sin((t + timeOffset) * 0.0005)) * 10;
    const angleProgress = (t + timeOffset) * -0.005 * TIMESCALE;

    for (let i = 0; i <= POINTS; i++) {
      const r = (i * ALPHA) + BETA * THETA;
      const lx = originX * 100 + r * Math.cos(i * THETA + angleProgress);
      const ly = originY * 100 + r * Math.sin(i * THETA + angleProgress);

      str += `
        L ${lx},${ly}
      `;
    }

    return str;
  }, [POINTS, ALPHA, BETA, THETA, TIMESCALE, origin, timeOffset]);

  return (
    <Canvas
      style={{
        position: 'absolute',
        zIndex: 1,
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} />

      <Point coords={[0, 15, 10]} fill={`rgb(0, 0, 0)`} />
    </Canvas>
  );
};
