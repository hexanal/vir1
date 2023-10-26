import { Link } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import Project from "./Project";
import Circle from "../symbols/Circle";
import Diamond from "../Diamond";

import useFaderControl from "../../hooks/useFaderControl";
import useRaf from "../../hooks/useRaf";

import projects from "./projects.json";

function Work() {
  const [x1, X1Control] = useFaderControl({
    value: 75,
    label: 'x1',
    min: 0,
    max: 100,
  });
  const [y1, Y1Control] = useFaderControl({
    value: 100,
    label: 'y1',
    min: 0,
    max: 100,
  });
  const [x2, X2Control] = useFaderControl({
    value: 100,
    label: 'x2',
    min: 0,
    max: 100,
  });
  const [y2, Y2Control] = useFaderControl({
    value: 100,
    label: 'y2',
    min: 0,
    max: 100,
  });


  useEffect( () => {
    document.title = 'work';
  }, []);

  return <div
      style={{
        padding: '8rem 0',
      }}
  >
    <div
      style={{
        textAlign: 'center',
        transformStyle: 'preserve-3d',
        perspective: '1000',
        padding: '1rem 0.5rem',
      }}
    >
      {/*
      <X1Control />
      <Y1Control />
      <X2Control />
      <Y2Control />
      */}

      {/*
      <Circle
        style={{
          marginTop: '1rem',
          width: '5rem',
          height: '5rem',
        }}
        stroke={`rgb(255 0 255 / 1)`}
      />
      */}

      <h1
        style={{
          fontSize: 0,
          height: 0,
          margin: 0,
        }}
      >
        work
      </h1>

      <p>Here's a selection of projects on which I helped.</p>
      <p>Or you may prefer to <Link to="/resume">read my résumé</Link>.</p>

      <Diamond />
    </div>

    {projects && projects.length ? (
      <div>
        {projects.map((p, i) => {
          const { id } = p || {};

          return (
            <Project
              key={id}
              {...p}
            />
          );
        })}
      </div>
    ): null}

    <div
      style={{
        textAlign: 'center',
        transformStyle: 'preserve-3d',
        perspective: '1000',
        padding: '1rem 0.5rem',
      }}
    >
      <Diamond />

      <p>
        Thank you so much for taking the time to browse my portfolio!
      </p>
      <p>
        I'm currently available for work.
      </p>
      <p>If you are interested in hiring me, you may want to <Link to="/resume">read my résumé</Link>.</p>
    </div>

  </div>
}

export default Work;

