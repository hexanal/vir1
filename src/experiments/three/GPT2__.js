import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf from '../../hooks/useRaf';
import usePointer from '../../hooks/usePointer';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const parent = new THREE.Object3D();
const cameraRotation = new THREE.Euler();
// cameraRotation.copy(parent.quaternion;
scene.add(parent);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(2, 0, -3);
parent.add(cube);
parent.add(camera);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const pointLight1 = new THREE.PointLight( 0xff00ff, 1, 100);
pointLight1.position.set( 0, -2, 2 );
scene.add( pointLight1 );

const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const otherCube = new THREE.Mesh(geometry2, material2);
otherCube.position.set(1, 1, -4);
otherCube.rotation.set(0, Math.PI / 2, 0);

scene.add(otherCube);

const groundGeo = new THREE.PlaneGeometry(300, 300);
const groundMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.set(0, -5, 0);
ground.rotation.set(-Math.PI/2, 0, 0);

scene.add(ground);

export default function GPT2(props) {
  const ref = useRef();

  const { pointers } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position, buttons, displace, distance } = pointers[0] || {};
  const [x, y] = position || [];

  useEffect(() => {
    ref.current.appendChild(renderer.domElement);
  }, []);

  const { t } = useRaf();

  useEffect(() => {
    if (buttons === 2) {
      cameraRotation.setFromQuaternion( parent.quaternion );
      cameraRotation.y = (-x / window.innerWidth) * Math.PI;
      cameraRotation.x = (-y / window.innerHeight) * Math.PI;
      parent.quaternion.setFromEuler( cameraRotation );
    }

    if (buttons === 1 && displace) {
      console.log(displace[0]);
      parent.position.set(
        parent.position.x + displace[0] * 0.1,
        parent.position.y + displace[1] * 0.1,
        parent.position.z
      );
    }
    // const elevation = (y / window.innerHeight) * Math.PI *2;
    // const heading = (x / window.innerWidth) * Math.PI *2;
    // parent.rotation.set(elevation, heading, 0);

    renderer.render(scene, camera);
  }, [t, x, y, buttons, displace]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        zIndex: 1,
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      }}
      onContextMenu={e => e.preventDefault()}
    ></div>
  );
};
