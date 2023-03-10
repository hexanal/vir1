import {
  write,
} from 'zorg';

export default function newComponent(flags) {
  const {
    dir = '../components',
    filename = 'X.js',
    name = 'X',
    callback = true,
    state = true,
    withStateVar = true,
  } = flags || {};

  const contents =
`import {
  ${callback ? `useCallback,` : ``}
  ${state ? `useState,` : ``}
  useEffect,
  useRef
} from 'react';

export default function ${name}(props) {
  ${withStateVar ? `
  const [xx, setXx] = useState(null);` : ''}

  return (
    <div
      className="X"
      style={{}}
    >
      {xx}
    </div>
  );
};
  `;

  write(dir, filename, contents)
    .then(() => {
      console.log(`
      SUCCESSFULLY GENERATED
      –~~–~~–~~–~~–~~–~~—
      ${contents}
      –~~–~~–~~–~~–~~–~~—`);
    });
}

