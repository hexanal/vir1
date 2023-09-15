export function worldline(x0, y0, z0, t0, vx, vy, vz, dt) {
  let t = 0;
  let x = x0;
  let y = y0;
  let z = z0;
  let c = 1;

  while (t < t0) {
    // Calculate acceleration due to gravitation
    let ax = -G * mass(x, y, z) * x / Math.pow(distance(x, y, z), 3);
    let ay = -G * mass(x, y, z) * y / Math.pow(distance(x, y, z), 3);
    let az = -G * mass(x, y, z) * z / Math.pow(distance(x, y, z), 3);

    // Calculate Lorentz factor
    let v = Math.sqrt(vx * vx + vy * vy + vz * vz);
    let gamma = 1 / Math.sqrt(1 - (v * v / (c * c)));

    // Calculate position and velocity using Runge-Kutta method
    let k1x = vx * gamma;
    let k1y = vy * gamma;
    let k1z = vz * gamma;
    let k1vx = ax * gamma * dt;
    let k1vy = ay * gamma * dt;
    let k1vz = az * gamma * dt;

    let k2x = (vx + k1vx / 2) * gamma;
    let k2y = (vy + k1vy / 2) * gamma;
    let k2z = (vz + k1vz / 2) * gamma;
    let k2vx = ax * gamma * (dt / 2);
    let k2vy = ay * gamma * (dt / 2);
    let k2vz = az * gamma * (dt / 2);

    let k3x = (vx + k2vx / 2) * gamma;
    let k3y = (vy + k2vy / 2) * gamma;
    let k3z = (vz + k2vz / 2) * gamma;
    let k3vx = ax * gamma * (dt / 2);
    let k3vy = ay * gamma * (dt / 2);
    let k3vz = az * gamma * (dt / 2);

    let k4x = (vx + k3vx) * gamma;
    let k4y = (vy + k3vy) * gamma;
    let k4z = (vz + k3vz) * gamma;
   
    let k4vx = ax * gamma * dt;
    let k4vy = ay * gamma * dt;
    let k4vz = az * gamma * dt;

    vx += (k1vx + 2 * k2vx + 2 * k3vx + k4vx) / 6;
    vy += (k1vy + 2 * k2vy + 2 * k3vy + k4vy) / 6;
    vz += (k1vz + 2 * k2vz + 2 * k3vz + k4vz) / 6;

    x += (k1x + 2 * k2x + 2 * k3x + k4x) * (dt / 6);
    y += (k1y + 2 * k2y + 2 * k3y + k4y) * (dt / 6);
    z += (k1z + 2 * k2z + 2 * k3z + k4z) * (dt / 6);
    vx += (k1vx + 2 * k2vx + 2 * k3vx + k4vx) * (dt / 6);
    vy += (k1vy + 2 * k2vy + 2 * k3vy + k4vy) * (dt / 6);
    vz += (k1vz + 2 * k2vz + 2 * k3vz + k4vz) * (dt / 6);

    t += dt;
  }

  return { x, y, z, t };
}

export function distance(x, y, z) {
  return Math.sqrt(x * x + y * y + z * z);
}

export function mass(x, y, z) {
  // Return the mass density at position (x, y, z)
  // This function depends on the distribution of matter and energy in the universe
  // and would need to be determined from observational data or theoretical models
  return 1;
}

export const G = 6.6743e-11;  // Gravitational constant
// Define the gravitational constant (in units of AU^3 / M_sun / year^2)
const G = 39.478;

// Define the masses of the Sun and Earth (in units of M_sun)
const M_sun = 1;
const M_earth = 3.003e-6;

// Define the initial positions and velocities of the Sun and Earth (in units of AU and AU/year)
let sun = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 };
let earth = { x: 1, y: 0, z: 0, vx: 0, vy: 2 * Math.PI, vz: 0 };

// Define the initial time and duration of the simulation (in units of years)
let t0 = 0;
let tf = 1;

// Run the simulation and print the final position of the Earth
let result = rungeKutta(sun, earth, M_sun, M_earth, G, t0, tf);

console.log(result.earth);

