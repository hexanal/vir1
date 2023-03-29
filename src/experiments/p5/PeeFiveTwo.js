import { useCallback, useState, useEffect, useRef } from 'react';
import p5 from 'p5';

function sketch(p) {
  function Ball(m, x, y) {
    this.trail = [];
    this.mass = m;
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
    this.trail.unshift(this.position.copy());
    if (this.trail.length >= 100) {
      this.trail.pop();
    }
    for (let t of this.trail) {
      p.noStroke();
      p.fill(255, 255, 0);
      p.circle(t.x, t.y, 5);
    }

    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255, 255, 255);
    p.circle(this.position.x, this.position.y, 42);
  };

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
  }

  // let ball = new Ball(256, 0, 0);
  let ball = new Ball(200, 0, 0);

  p.draw = function() {
    // setup axes
    p.background(0);
    p.fill(255, 255, 255);
    p.stroke(255, 255, 255, 128);
    p.strokeWeight(1);
    p.line(0, p.height * 0.5, p.width, p.height * 0.5);
    p.line( p.width * 0.5, 0, p.width * 0.5, p.height);

    const cx = p.windowWidth * 0.5;
    const cy = p.windowHeight * 0.5;
    const fromCenterX = (p.mouseX - cx);
    const fromCenterY = (p.mouseY - cy);

    p.translate(cx, cy);

    p.text( fromCenterX, cx * 0.8, cy * 0.8 );

    if ( p.mouseIsPressed ) {
      const f = p.createVector(p.mouseX - cx - ball.position.x, p.mouseY - cy - ball.position.y);

      f.mult(0.75);

      p.text( f.toString(), cx * -0.5, cy * 0.75 );
      p.strokeWeight(2);
      p.stroke(255, 0, 255);
      p.line(ball.position.x, ball.position.y, p.mouseX - cx, p.mouseY - cy);

      ball.applyForce(f);
    }


    const gforce = p.createVector(0, 50);

    ball.applyForce(gforce);

    if ( ball.position.x < -cx ) ball.position.x = cx;
    if ( ball.position.x > cx ) ball.position.x = -cx;
    if ( ball.position.y < -cy ) ball.position.y = cy;
    if ( ball.position.y > cy ) ball.position.y = -cy;

    ball.update();
    ball.display();
  }
}

export default function PeeFiveTwo(props) {
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

