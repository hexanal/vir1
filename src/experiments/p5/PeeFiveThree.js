import { useCallback, useState, useEffect, useRef } from 'react';
import p5 from 'p5';

function sketch(p) {
  const cx = p.windowWidth * 0.5;
  const cy = p.windowHeight * 0.5;

  function Ball(m, x, y, r = 42) {
    this.trail = [];
    this.mass = m;
    this.r = r;
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
  }

  // Newton's 2nd law: F = M * A
  // or A = F / M
  Ball.prototype.applyForce = function(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };

  Ball.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(20);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  Ball.prototype.display = function() {
    if ( ball.position.x < -cx ) ball.position.x = cx;
    if ( ball.position.x > cx ) ball.position.x = -cx;
    if ( ball.position.y < -cy ) ball.position.y = cy;
    if ( ball.position.y > cy ) ball.position.y = -cy;

    this.trail.unshift(this.position.copy());
    if (this.trail.length >= 100) {
      this.trail.pop();
    }
    for (let t of this.trail) {
      p.noStroke();
      p.fill(255, 255, 0);
      p.circle(t.x, t.y, 5);
    }

    p.noStroke();
    p.fill(255, 255, 255);
    p.circle(this.position.x, this.position.y, this.r);
  };

  Ball.prototype.checkCollision = function(other) {
    // Get distances between the balls components
    let distanceVect = p5.Vector.sub(other.position, this.position);

    // Calculate magnitude of the vector separating the balls
    let distanceVectMag = distanceVect.mag();

    // Minimum distance before they are touching
    let minDistance = this.r + other.r;

    if (distanceVectMag < minDistance) {
      let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
      let d = distanceVect.copy();
      let correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      this.position.sub(correctionVector);

      // get angle of distanceVect
      let theta = distanceVect.heading();
      // precalculate trig values
      let sine = p.sin(theta);
      let cosine = p.cos(theta);

      /* bTemp will hold rotated ball this.positions. You
       just need to worry about bTemp[1] this.position*/
      let bTemp = [new p5.Vector(), new p5.Vector()];

      /* this ball's this.position is relative to the other
       so you can use the vector between them (bVect) as the
       reference point in the rotation expressions.
       bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
       automatically to 0.0, which is what you want
       since b[1] will rotate around b[0] */
      bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

      // rotate Temporary velocities
      let vTemp = [new p5.Vector(), new p5.Vector()];

      vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
      vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
      vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;

      /* Now that velocities are rotated, you can use 1D
       conservation of momentum equations to calculate
       the final this.velocity along the x-axis. */
      let vFinal = [new p5.Vector(), new p5.Vector()];

      // final rotated this.velocity for b[0]
      vFinal[0].x =
        ((this.mass - other.mass) * vTemp[0].x + 2 * other.m * vTemp[1].x) /
        (this.mass + other.mass);
      vFinal[0].y = vTemp[0].y;

      // final rotated this.velocity for b[0]
      vFinal[1].x =
        ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) /
        (this.mass + other.mass);
      vFinal[1].y = vTemp[1].y;

      // hack to avoid clumping
      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      /* Rotate ball this.positions and velocities back
       Reverse signs in trig expressions to rotate
       in the opposite direction */
      // rotate balls
      let bFinal = [new p5.Vector(), new p5.Vector()];

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

      // update balls to screen this.position
      other.position.x = this.position.x + bFinal[1].x;
      other.position.y = this.position.y + bFinal[1].y;

      this.position.add(bFinal[0]);

      // update velocities
      this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
  }

  let ball = new Ball(100, 0, cy * 0.5, 64);
  let cursor = new Ball(100, 10, 0, 32);

  p.draw = function() {
    // setup axes
    p.background(0);
    p.fill(255, 255, 255);
    p.stroke(255, 255, 255, 128);
    p.strokeWeight(1);
    p.line(0, p.height * 0.5, p.width, p.height * 0.5);
    p.line( p.width * 0.5, 0, p.width * 0.5, p.height);

    const fromCenterX = (p.mouseX - cx);
    const fromCenterY = (p.mouseY - cy);

    p.translate(cx, cy);

    if ( p.mouseIsPressed ) {
      const vec = p.createVector(fromCenterX, fromCenterY);
      cursor.applyForce(vec);
    }

    p.text(`vel: ${cursor.velocity.toString()}`, cx * -0.5, cy * 0.75 );

    ball.update();
    ball.display();

    const gforce = p.createVector(0, 5);
    cursor.applyForce(gforce);

    cursor.update();
    cursor.display();

    cursor.checkCollision(ball);
  }
}

export default function PeeFiveThree(props) {
  const p5ContainerRef = useRef();

  useEffect(() => {
      const p5Instance = new p5(sketch, p5ContainerRef.current);

      return () => {
          p5Instance.remove();
      };
  }, []);

  return (
    <div ref={p5ContainerRef}></div>
  );
}

