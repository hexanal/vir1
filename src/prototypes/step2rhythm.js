export default function stepper(props) {
  const {
    coords,
    dt
  } = props || {}
  const prevCoordsRef = { current: coords };
  const prevCoords = prevCoordsRef.current;
  const v = new Array(coords.length).fill(0);
  const a = new Array(coords.length).fill(0);

  const newVelocity = prevCoords.map((coord, index) => {
    const prevCoord = prevCoords[index];
    const velocity = (coord - prevCoord) / dt;
    return velocity;
  });

  const newAcceleration = newVelocity.map((velocity, index) => {
    const prevVelocity = v[index];
    const acceleration = (velocity - prevVelocity) / dt;
    return acceleration;
  });

  prevCoordsRef.current = coords;

  return { velocity: newVelocity, acceleration: newAcceleration };
}
