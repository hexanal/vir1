import { Link } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import Project from "./Project";
import Circle from "../symbols/Circle";

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
    </div>

    {projects && projects.length ? (
      <div>
        {projects.map((p, i) => {
          const { id } = p || {};

          return (
            <div key={id}>
              <Link to={id}>
                {id}
              </Link>
            </div>
          );
        })}
      </div>
    ): null}

    {/*
    <Project
      theme={{
        color: 'lightgreen',
      }}
      title={`Alloprof`}
      year={2019}
      agency={`Cossette`}
      link={`https://alloprof.ca`}
      linkLabel={`alloprof.ca`}
      comments={[
        {
          id: 'role',
          content: 'My role on this project was to work on animations and motion design.'
        },
        {
          id: 'particulars',
          content: 'In particular: the homepage interactive “hero” banner, the transitions when navigating to a topic, and animating the little green mascot.'
        },
        {
          id: 'constraints',
          content: 'Due to time and budget constraints, the scope of the work was later revised, which explains some quirks.'
        },
        {
          id: 'updates',
          content: 'As of September 2023, some elements I implemented remain visible, however a lot of what I worked on has since been updated.'
        },
      ]}
    />

    <Project
      theme={{
        color: '#b5b5b5',
      }}
      title={`Co–Partnership`}
      year={2018}
      agency={`ED.`}
      link={`https://co-partnership.com`}
      linkLabel={`co-partnership.com`}
      comments={[
        {
          id: 'fun',
          content: 'I had fun implementing the designer’s ideas on this one!'
        },
        {
          id: 'first',
          content: 'Because it was my first project with this team, I was still adapting to the toolset, yet I managed to ship it in time and with minimal technical debt.'
        },
        {
          id: 'redesigned',
          content: 'This website was recently redesigned; the current one was not implemented by me.'
        },
      ]}
    />
    */}

  </div>
}

export default Work;

