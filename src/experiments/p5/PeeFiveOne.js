import { useCallback, useState, useEffect, useRef } from 'react';
import p5 from 'p5';

// import useRaf from '../hooks/useRaf';
// import useKeys from '../hooks/useKeys';
// import useGamepads from '../hooks/useGamepads';
// import useFart from '../hooks/useFart';
// import usePointer from '../hooks/usePointer';
//

function sketch(p) {
  p.setup = function() {
      p.createCanvas(window.innerWidth, window.innerHeight);
  }

  p.draw = function() {
    p.background(0);
    p.fill(255, 255, 255);
    p.stroke(255, 255, 255, 128);
    p.strokeWeight(1);
    p.line(0, p.height * 0.5, p.width, p.height * 0.5);
    p.line(
      p.width * 0.5,
      0,
      p.width * 0.5,
      p.height,
    );

    const cx = p.windowWidth * 0.5;
    const cy = p.windowHeight * 0.5;

    const fromCenterX = (p.mouseX - cx);
    const fromCenterY = (p.mouseY - cy);

    p.translate(cx, cy);

    const startX = cx * 0.5;
    const startY = cy * 0.5;
    const endX = fromCenterX;
    const endY = fromCenterY;

    const tesselations = 8;
    const rate = 0.01;

    const sineMag = 0;

    for (let i = 1; i <= tesselations; i++) {

      const segmentStartX = p.lerp(startX, endX, i / tesselations);
      const segmentStartY = p.lerp(startY, endY, i / tesselations);
      const segmentEndX = p.lerp(startX, endX, (i - 1) / tesselations);
      const segmentEndY = p.lerp(startY, endY, (i - 1) / tesselations) ;

      const sineX = Math.sin(p.frameCount * 0.1 + i * 0.20) * sineMag;
      const sineY = Math.cos(p.frameCount * 0.1 + i * 0.20) * sineMag;
      const sineX1 = Math.sin(p.frameCount * 0.1 + (i - 1) * 0.20) * sineMag;
      const sineY1 = Math.cos(p.frameCount * 0.1 + (i - 1) * 0.20) * sineMag;

      const nx = p.noise(p.frameCount * rate + i) * 80;
      const ny = p.noise(p.frameCount * rate + i) * 120;
      const nx2 = p.noise(p.frameCount * rate + i-1) * 80;
      const ny2 = p.noise(p.frameCount * rate + i-1) * 120;

      p.strokeWeight(4);
      p.stroke(100, 255 * i / tesselations, 255);
      p.line(
        segmentStartX + sineX + nx,
        segmentStartY + sineY + ny,
        segmentEndX + sineX1 + nx2,
        segmentEndY + sineY1 + ny2,
      );
    }

    // p.text(p.width, p.width * 0.25, p.height * 0.5 - 50);
    // p.noStroke();
    // p.fill(0, 255, 255);
    // const nx = p.noise(p.frameCount * 0.05) * 100;
    // const ny = p.noise(p.frameCount * 0.01) * 100;
    // const x = (p.mouseX - cx) + nx;
    // const y = (p.mouseY - cy) + ny;
    // p.circle(x, y, 50);
  }
}

export default function PeeFiveOne(props) {
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

