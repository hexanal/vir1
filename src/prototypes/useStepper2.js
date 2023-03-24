import { useState, useEffect, useRef } from 'react';

export default function useStepper(props) {
  const {
    coords,
    t
  } = props || {};
  const [velocity, setVelocity] = useState(new Array(coords.length).fill(0));
  const [acceleration, setAcceleration] = useState(new Array(coords.length).fill(0));
  const prevCoordsRef = useRef(coords);
  const prevTimestampRef = useRef(t);

  // console.log(coords);

  useEffect(() => {
    const prevCoords = prevCoordsRef.current;
    const prevTimestamp = prevTimestampRef.current;

    // console.log({prevCoords, prevTimestamp});

    const dt = (t - prevTimestamp) / 1000;

    const newVelocity = prevCoords.map((coord, index) => {
      const prevCoord = prevCoords[index];
      const velocity = (coord - prevCoord) / dt;
      return velocity;
    });

    const newAcceleration = newVelocity.map((velocity, index) => {
      const prevVelocity = velocity[index];
      const acceleration = (velocity - prevVelocity) / dt;
      return acceleration;
    });

    setVelocity(newVelocity);
    setAcceleration(newAcceleration);

    // const intervalId = setInterval(() => {
    //   const prevCoords = prevCoordsRef.current;
    //   const prevTimestamp = prevTimestampRef.current;

    //   console.log({prevCoords, prevTimestamp});

    //   const dt = (t - prevTimestamp) / 1000;

    //   const newVelocity = prevCoords.map((coord, index) => {
    //     const prevCoord = prevCoords[index];
    //     const velocity = (coord - prevCoord) / dt;
    //     return velocity;
    //   });

    //   const newAcceleration = newVelocity.map((velocity, index) => {
    //     const prevVelocity = velocity[index];
    //     const acceleration = (velocity - prevVelocity) / dt;
    //     return acceleration;
    //   });

    //   setVelocity(newVelocity);
    //   setAcceleration(newAcceleration);

    //   prevCoordsRef.current = coords;
    //   prevTimestampRef.current = t;
    // }, 1000 / 60);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [coords, t]);

  return { velocity, acceleration };
}

