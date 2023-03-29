import { ueCallback, useState, useEffect, useRef } from 'react';
import p5 from 'p5';

function sketch(p) {
  const cx = p.windowWidth * 0.5;
  const cy = p.windowHeight * 0.5;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
  }

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

    let mouseVector = p.createVector(0.5, 0.5);

    if ( p.mouseIsPressed ) {
      mouseVector.set(p.mouseX / p.width, p.mouseY / p.height);
    }

    const timefactor = p.frameCount * 0.007;

    p.noFill();
    p.stroke(0, 255, 0);
    p.strokeWeight(3);
    p.beginShape();
    p.translate(0, cy);
    for (let i = 0; i < p.width; i++) {
      const val = p.sin(i * 0.1 + timefactor * 1) * cy * 0.5 * mouseVector.x;
      const val2 = p.sin(i * 0.02 + timefactor * 20) * cy * 0.5 * mouseVector.y;
      p.vertex(i, val + val2);
    }
    p.endShape();

    p.translate(0, -cy);
    p.noStroke();
    p.fill(0, 255, 0);
    p.textSize(14);
    p.text(p.mouseX, 10, 20);
    p.text(p.mouseY, 10, 32);
    p.text(mouseVector.toString(), 10, 64);
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

