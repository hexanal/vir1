let reusedTuple = [0, 0];

export default function stepper({
  target,
  current,
  velocity,
  stiffness = 170,
  damping = 26,
  secondPerFrame = 1000 / 60 / 1000,
  precision = 0.00001,
}) {
  // spring params
  const springForce = -stiffness * (current - target);
  const damperForce = -damping * velocity;
  const acceleration = springForce + damperForce;

  // applying velocity and acceleration
  const nextVelocity = velocity + acceleration * secondPerFrame;
  const nextTarget = current + nextVelocity * secondPerFrame;

  // hmm?
  if ( (Math.abs(nextVelocity) < precision) && (Math.abs(nextTarget - target) < precision) ) {
    reusedTuple[0] = target;

    return reusedTuple;
  }

  // meh?
  reusedTuple[0] = nextTarget;
  reusedTuple[1] = nextVelocity;

  return reusedTuple;
}
