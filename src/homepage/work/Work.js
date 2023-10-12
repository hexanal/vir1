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

  return <div>
    <div
      style={{
        textAlign: 'center',
        transformStyle: 'preserve-3d',
        perspective: '1000',
        padding: '0 1rem',
      }}
    >
      {/*
      <X1Control />
      <Y1Control />
      <X2Control />
      <Y2Control />
      */}

      <Circle
        style={{
          opacity: 0,
          marginTop: '1rem',
          width: '4rem',
          height: '4rem',
        }}
      />

      <h1
        style={{
          fontSize: 0,
          height: 0,
          fontWeight: '100',
          margin: 0,
          // textAlign: 'center',
        }}
      >
        work
      </h1>

      <p>Here's a selection of projects on which I helped.</p>
      <p>Or you may prefer to <Link to="/resume">read my résumé</Link>.</p>
    </div>

    <Project
      theme={{
        color: '#ffe189',
      }}
      title={`Festival du Nouveau Cinema`}
      year={2021}
      agency={`Folklore`}
      link={`https://nouveaucinema.ca`}
      linkLabel={`nouveaucinema.ca`}
      comments={[
        {
          id: 'ouch',
          content: 'Perhaps the most challenging project I have worked on, the new Festival du Nouveau Cinéma website had me juggling many considerations:',
        },
        {
          id: 'consid',
          content: 'Making the micro-interactions as lively as possible while implementing an easily themeable design system.'
        },
        {
          id: 'edition',
          content: 'This design system would allow for customization the “edition” of the festival being browsed.',
        },
        {
          id: 'integrations',
          content: 'The interface connects to multiple APIs and other integrations.',
        },
        {
          id: 'respons',
          content: 'It is also 100% responsive and as legible as possible on most form factrors.',
        },
      ]}
      video="/WORK/nouveau_cinema.mp4"
    />

    <Project
      theme={{
        color: `#8b8bff`,
      }}
      title={`Micromag`}
      year={2022}
      agency={`Folklore`}
      link={`https://micromag.urbania.ca`}
      linkLabel={`micromag.urbania.ca`}
      comments={[
        {
          id: 'dramatic',
          content: 'A very dynamic page which showcases URBANIA’s mobile-first magazine: “Micromag”',
        },
        {
          id: 'inside',
          content: 'What is inside the floating cellphone is the actual website: clicking the phone expands to a full-screen interactive experience.',
        },
        {
          id: 'motion',
          content: 'Motions are triggered via scrolling position, and I tried to make transitions as smooth as possible to avoid jarring effects.',
        },
        {
          id: 'challenge',
          content: 'It was quite the challenge!',
        },
      ]}
      video={`/WORK/micromag.mp4`}
    />

    <Project
      theme={{
        color: 'yellow',
      }}
      title={`Amnistie Internationale (Canada Francophone)`}
      year={2020}
      agency={`Cossette`}
      link={`https://amnistie.ca`}
      linkLabel={`amnistie.ca`}
      comments={[
        {
          id: 'pride',
          content: 'This one I am very proud of! It’s a very straightforward website, and very heavy on content, but I strove to make the designer’s vision come true.'
        },
        {
          id: 'legibility',
          content: 'As legible as possible, with some attention given to animations, especially to provide visual feedback.',
        },
        {
          id: 'documentation',
          content: 'Much care was given to providing documentation and a sane codebase, so that the hand-off to the company that handles further development and maintenance went very smoothly.',
        },
      ]}
      video={`/WORK/amnistie.mp4`}
    />

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

