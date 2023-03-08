export default function newComponent(flags) {
  const {
    name = 'X',
    callback = true,
    state = true,
    withStateVar = true,
  } = flags || {};

  return `
import {
  ${callback ? `useCallback,` : ``}
  ${state ? `useState,` : ``}
  useEffect,
  useRef
} from 'react';

export default function ${name}(props) {
  ${withStateVar ? `
  const [xxx, setXXX] = useState(null);` : ''}

  return (
    <div
      className="cool-beans"
      style={{}}
    >
      {xxx}
    </div>
  );
};
`;

}

