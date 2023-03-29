export function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}

export function sherp(x, a, b) {
  return x * (b - a) + a;
}

export function smoothstep(x, a, b) {
  x = x * x * (3.0 - 2.0 * x);
  return x * (b - a) + a;
}
