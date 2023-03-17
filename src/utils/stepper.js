let reusedTuple = [0, 0];

export default function stepper({
  target,
  current,
  velocity,
  stiffness = 170,
  damping = 26,
  secondPerFrame = 1000 / 60 / 1000,
  precision = 0.01,
}) {
  const springForce = -stiffness * (current - target);
  const damperForce = -damping * velocity;
  const acceleration = springForce + damperForce;

  const nextVelocity = velocity + acceleration * secondPerFrame;
  const nextTarget = current + nextVelocity * secondPerFrame;

  if ( (Math.abs(nextVelocity) < precision) && (Math.abs(nextTarget - target) < precision) ) {
    reusedTuple[0] = target;
    reusedTuple[0] = 0;

    return reusedTuple;
  }

  reusedTuple[0] = nextTarget;
  reusedTuple[1] = nextVelocity;

  return reusedTuple;
}
