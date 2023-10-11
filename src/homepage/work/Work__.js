import projects from "./projects.json";

function Work() {

  return <div>
    <h1>work</h1>

    {projects.map( project => {
      const {
        id,
        title,
        description,
        link,
        client,
        video,
      } = section;
      return (
        <div key={id}>
          <p>title: {title}</p>
          <p>description: {description}</p>
          <p>link: {link}</p>
          <p>client: {client}</p>
          <p>video: {video}</p>
        </div>
      );
    })}
  </div>
}

export default Work;

