import { Vector3, Quaternion } from 'three';
import { useCallback, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { useControls } from 'leva';
import useKeys from '../hooks/useKeys';

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function BoxGroup(props) {
  const ref = useRef();
  const { keys } = useKeys();

  useFrame((state, delta) => {
    const d = delta * 2;
  });

  return (
    <group ref={ref}>
      <Box position={[-1.2, 0, -10]} />
      <Box position={[1.2, 0, -10]} />
    </group>
  );
}

function PlayerCamera(props) {
  const ref = useRef();
  const { keys } = useKeys();

  useFrame((state, delta) => {
    // const { camera } = state;
    // let target = new Vector3();
    // const dir = camera.getWorldDirection(target);
    //
    const p = ref.current;
    const d = delta * 10;

    if ( keys.includes('w') ) {
      console.log({p, d});
      p.moveForward(d);
    }
    if ( keys.includes('a') ) {
      p.moveRight(-d);
    }
    if ( keys.includes('s') ) {
      p.moveForward(-d);
    }
    if ( keys.includes('d') ) {
      p.moveRight(d);
    }
  });

  return (
    <PointerLockControls ref={ref} />
  );
}

function Ground(props) {
  const { yo, light } = useControls({
    yo: -Math.PI/2,
    light: {
      x: -50,
      y: 85,
      z: 75,
    }
  });
  const { x,y,z } = light || {};

  return (
    <group>
      <pointLight position={[x, y, z]} color={0xff00ff} intensity={4} />
      <mesh
        position={[0, -1, 0]} rotation={[yo, 0, 0]}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color={0x0088ff} />
      </mesh>
    </group>
  );
}

export default function MoveThree(props) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '50%',
          left: '50%',
          width: 32,
          height: 32,
          transform: `translate(-50%, -50%)`,
        }}
        stroke={`rgb(0 0 0 / 1)`}
      >
        <path d="M 50,0 L 50,100" vectorEffect="non-scaling-stroke" />
        <path d="M 0,50 L 100,50" vectorEffect="non-scaling-stroke" />
      </svg>
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
        <PlayerCamera />
        <BoxGroup />
        <Ground />
      </Canvas>
    </div>
  );
};
