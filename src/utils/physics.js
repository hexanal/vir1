export function velocity(initialVelocity, acceleration, time) {
  return initialVelocity + acceleration * time;
}

export function displacement(initialDisplacement, initialVelocity, acceleration, time) {
  return initialDisplacement + initialVelocity * time + 0.5 * acceleration * time ** 2;
}

export function acceleration(initialVelocity, finalVelocity, time) {
  return (finalVelocity - initialVelocity) / time;
}

export function kineticEnergy(mass, velocity) {
  return 0.5 * mass * velocity ** 2;
}

export function potentialEnergy(mass, gravity, height) {
  return mass * gravity * height;
}

export function totalEnergy(kineticEnergy, potentialEnergy) {
  return kineticEnergy + potentialEnergy;
}

export function position(initialDisplacement, initialVelocity, acceleration, time) {
  const v = velocity(initialVelocity, acceleration, time);
  const d = displacement(initialDisplacement, initialVelocity, acceleration, time);
  return { position: d, velocity: v };
}
