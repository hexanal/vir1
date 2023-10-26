import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import resume from "./fred_resume.json";
import AsymSeparator from "./AsymSeparator";
import Wave from "./symbols/Wave";
import Diamond from "./Diamond";

function Experience(props) {
  const {
    id,
    title,
    company,
    location,
    url,
    description,
    mode, // null / "print"
  } = props;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '1rem auto',
        padding: '0.25rem 1rem',
      }}
    >
      <h3
        style={{
          marginBottom: 0,
        }}
      >
        {company}
      </h3>
      <h4
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        {title}
      </h4>

      <div
        style={{
          fontSize: `0.8rem`,
        }}
      >
        {location ? (
        <small>{location}</small>
        ): null}
        {location && url ? (
          <span>&nbsp;/&nbsp;</span>
        ): null}
        {url ? (
          <small>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {url}
            </a>
          </small>
        ): null}
      </div>

      {mode !== 'print' ? (
        <p>{description}</p>
      ): null}
    </div>
  );
}

function Skill(props) {
  const {
    id,
    title,
    lines,
  } = props;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '1rem auto',
        padding: '0.25rem 1rem',
      }}
    >
      <h3>{title}</h3>
      <ul>
        {lines.map( line => <li key={line}>{line}</li> )}
      </ul>
    </div>
  );
}

function Education(props) {
  const {
    id,
    title,
    lines,
  } = props;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '1rem auto',
        padding: '0.25rem 1rem',
      }}
    >
      <h3>{title}</h3>
      <ul>
        {lines.map( line => <li key={line}>{line}</li> )}
      </ul>
    </div>
  );
}

const types = {
  experience: Experience,
  skills: Skill,
  education: Education,
};

function Resume(props) {
  const { mode = null } = useParams();

  useEffect( () => {
    document.title = 'résumé';
  }, []);

  return <div
    style={{
      paddingBottom: '10rem',
      lineHeight: 1.6,
    }}
  >
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {mode !== 'print' ? (
        <>
          <p><small>Back to <Link to="/code">“code” page</Link> or <Link to="/">home page</Link>.</small></p>
          <p><small>Also available as <Link to="/resume/print">printable version</Link> or <a href="/DOCUMENTS/fredmercy.pdf">PDF file</a>.</small></p>
          <hr />
        </>
      ): null}
      <p><strong>Frederic Mercy</strong></p>
      <p><i>Frontend Web Developer / Other</i></p>
    </div>

    <h1
      style={{
        display: mode === 'print' ? 'none' : 'block',
        position: 'fixed',
        top: 0,
        zIndex: -1,
        fontSize: 0,
      }}
    >
      résumé
    </h1>

    {resume.map( section => {
      const { id, heading, items } = section;
      const SectionComponent = types[id];

      if (!SectionComponent) {
        return false;
      }

      return (
        <div
          key={id}
          style={{
            breakBefore: id !== 'experience' ? 'page' : 'auto',
          }}
        >
          <Wave
            style={{
              display: 'block',
              margin: `0 auto`,
              width: '4rem',
              height: '3rem',
            }}
          />

          <h2
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              margin: '1rem auto',
              textAlign: 'center',
            }}
          >
            {heading}
          </h2>

          {items.map( item => {
            const { id } = item;
            return (
              <div key={id}>
                <SectionComponent {...item} mode={mode} />
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
}

export default Resume;
