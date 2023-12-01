import { v4 as uuidv4 } from 'uuid';
import { Vector3, Quaternion } from 'three';
import { Fragment, useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import usePointer from '../hooks/usePointer.js';
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
    ref.current.position.x = x + Math.sin(t.current * 0.5 + x) * 5;
    ref.current.position.y = y + Math.cos(t.current * 0.5 + y) * 5;
    ref.current.position.z = z + Math.sin(t.current * 0.5 + z) * 5;
  });

  return (
    <group key={id}>
      <mesh position={[x, y, z]} ref={ref}>
         <sphereGeometry args={[1, 16, 16]} />
         <meshStandardMaterial color={fill} transparent />
      </mesh>
    </group>
  );
}

const POINTS = 128;

export default function ThreeSpiral2(props) {
  const {
    origin = [0.5, 0.5],
    color = `rgb(0 0 0 / 1)`,
    timeOffset = 0,
    noControls = false,
  } = props;

  const { t, dt, elapsed } = useRaf();

  const { pointers, mouse, active } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });

  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];

  const points = useMemo(() => {
    let p = [];
    for (let i = 0; i <= POINTS; i++) {
      p.push((
        <Point id={i} coords={[0, i + 5, i / 2]} fill={`rgb(${i}, 0, 0)`} />
      ));
    }

    return p;
  }, []);

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

    </Canvas>
  );
};
