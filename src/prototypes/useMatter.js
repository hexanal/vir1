import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const useMatter = ({ ref, t }) => {
  const engineRef = useRef(null);
  const rendererRef = useRef(null);
  const bodiesRef = useRef([]);

  useEffect(() => {
    const newEngine = Matter.Engine.create();
    engineRef.current = newEngine;

    const newRenderer = Matter.Render.create({
      element: ref.current,
      engine: newEngine,
      options: {
        width: 800,
        height: 600,
      },
    });
    rendererRef.current = newRenderer;

    Matter.Events.on(newEngine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        console.log('collision detected:', pair);
      });
    });

    return () => {
      Matter.Render.stop(rendererRef.current);
      Matter.Engine.clear(engineRef.current);
      Matter.Render.stop(rendererRef.current);
      engineRef.current = null;
      rendererRef.current = null;
      bodiesRef.current = [];
    };
  }, [ref]);

  useEffect(() => {
    if (engineRef.current && rendererRef.current) {
      Matter.World.add(engineRef.current.world, bodiesRef.current);
      Matter.Render.run(rendererRef.current);
      Matter.Runner.run(Matter.Runner.create(), engineRef.current);
    }
  }, [t]);

  const addPlanet = ({ x, y, radius, options = {} }) => {
    const planet = Matter.Bodies.polygon(x, y, 32, radius);
    Matter.Composite.add(engineRef.current.world, [planet]);
    // bodiesRef.current = [...bodiesRef.current, planet];
  };

  return { addPlanet, Matter };
};

export default useMatter;

