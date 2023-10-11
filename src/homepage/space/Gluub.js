import { useRef } from "react";
import usePointer  from "../../hooks/usePointer";
import useRaf  from "../../hooks/useRaf";

import BENNU from "../../assets/SPACE/BENNU.jpg";

function Fuck(props) {
  const { src = null, alt = '', style = {} } = props || {};

  if (src === null) {
    return null;
  }

  return (
    <div
      style={{
        ...style,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 1 1`}
        preserveAspectRatio={'xMidYMid meet'}
        style={{width: '100%'}}
      />
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}

function Gluub() {
  const top = useRef(0);
  const left = useRef(0);
  const { pointers } = usePointer();
  const { ratio = [0.5, 0.5] } = pointers[0] || {};
  const increment = useRef(0);

  return (
    <div
      className="full"
      style={{
        backgroundColor: 'black',
      }}
    >
      <h1>in space</h1>

      <Fuck
        src={BENNU}
        alt="Bennu"
        style={{
          position: 'absolute',
          top: `${top.current}%`,
          left: `${left.current}%`,
          transform: `translate(-50%, -50%) rotate(90deg)`,
          width: '40%',
        }}
      />
    </div>
  );
}

export default Gluub;

