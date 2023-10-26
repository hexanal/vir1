import { useParams } from "react-router-dom";

import Project from "./Project";

import projects from "./projects.json";

function Boxed(props) {
  const { style, children } = props || {};

  return (
    <div
      style={{
        display: `inline-block`,
        padding: `0.15rem 0.3rem`,
        color: `rgb(255 255 255 / 1)`,
        backgroundColor: `rgb(0 0 0 / 1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find(p => {
    const { id } = p || {};
    return id === projectId;
  });
 
  return (
    <div
      style={{
      }}
    >
      <Project {...project} />
    </div>
  );
}


