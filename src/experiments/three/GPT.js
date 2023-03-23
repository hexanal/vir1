import { v4 as uuidv4 } from 'uuid';
import { Vector3, Quaternion } from 'three';
import { useCallback, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';

function getRandomInt(a = 0, b = 10) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// function to generate random coordinates
function generateRandomCoords() {
  return [
    getRandomInt(-50, 50),
    getRandomInt(-50, 50),
    getRandomInt(-50, 50),
  ];
}

function generateRandomRgbValues() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random().toFixed(2);
  return { r, g, b, a };
}

// function to generate random fill color
function generateRandomRgbColorString() {
  const { r, g, b, a } = generateRandomRgbValues();
  return `rgb(${r}, ${g}, ${b})`;
}

// create an array of 20 objects
const randomPoints = [];
for (let i = 0; i < 200; i++) {
  randomPoints.push({
    id: uuidv4(),
    coords: generateRandomCoords(),
    fill: generateRandomRgbColorString()
  });
}

// console.log(randomPoints);

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

function Ground(props) {
  const rotation = -Math.PI/2;
  const light = {
    x: -50,
    y: 85,
    z: 75,
  };
  const { x,y,z } = light;

  return (
    <group>
      <pointLight position={[x, y, z]} color={0xff00ff} intensity={4} />
      <mesh
        position={[0, -1, 0]} rotation={[rotation, 0, 0]}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color={0x0088ff} />
      </mesh>
    </group>
  );
}

export default function GPT(props) {
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
      <PointerLockControls />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} />

      <Point coords={[0, 15, 10]} fill={`rgb(0, 0, 0)`} />

      <Ground />

      {randomPoints.map(o => {
        const { id } = o || {};
        return (
          <Point key={id} {...o} />
        );
      })}
    </Canvas>
  );
};
