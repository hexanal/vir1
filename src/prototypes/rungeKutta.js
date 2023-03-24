export default function rungeKutta(position, velocity, acceleration, dt) {
    let x = position.x;
    let y = position.y;
    let z = position.z;
    let vx = velocity.x;
    let vy = velocity.y;
    let vz = velocity.z;

    let x1 = x;
    let y1 = y;
    let z1 = z;
    let vx1 = vx;
    let vy1 = vy;
    let vz1 = vz;

    let a1 = acceleration({ x, y, z });
    let { x: k1x, y: k1y, z: k1z } = { x: vx1, y: vy1, z: vz1 };
    let { x: k1vx, y: k1vy, z: k1vz } = a1;

    let x2 = x + k1x / 2;
    let y2 = y + k1y / 2;
    let z2 = z + k1z / 2;
    let vx2 = vx + k1vx / 2;
    let vy2 = vy + k1vy / 2;
    let vz2 = vz + k1vz / 2;

    let a2 = acceleration({ x: x2, y: y2, z: z2 });
    let { x: k2x, y: k2y, z: k2z } = { x: vx2, y: vy2, z: vz2 };
    let { x: k2vx, y: k2vy, z: k2vz } = a2;

    let x3 = x + k2x / 2;
    let y3 = y + k2y / 2;
    let z3 = z + k2z / 2;
    let vx3 = vx + k2vx / 2;
    let vy3 = vy + k2vy / 2;
    let vz3 = vz + k2vz / 2;

    let a3 = acceleration({ x: x3, y: y3, z: z3 });
    let { x: k3x, y: k3y, z: k3z } = { x: vx3, y: vy3, z: vz3 };
    let { x: k3vx, y: k3vy, z: k3vz } = a3;

    let x4 = x + k3x;
    let y4 = y + k3y;
    let z4 = z + k3z;
    let vx4 = vx + k3vx;
    let vy4 = vy + k3vy;
    let vz4 = vz + k3vz;

    let a4 = acceleration({ x: x4, y: y4, z: z4 });
    let { x: k4x, y: k4y, z: k4z } = { x: vx4, y: vy4, z: vz4 };
    let { x: k4vx, y: k4vy, z: k4vz } = a4;

    let dx = (k1x + 2 * k2x + 2 * k3x + k4x) / 6;
    let dy = (k1y + 2 * k2y + 2 * k3y + k4y) / 6;
    let dz = (k1z + 2 * k2z

      ....
