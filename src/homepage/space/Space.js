import { useRef } from "react";
import useRaf  from "../../hooks/useRaf";

import BENNU from "../../assets/SPACE/BENNU.jpg";
import CERES from "../../assets/SPACE/CERES.jpg";
import APOLLO11 from "../../assets/SPACE/APOLLO_11.jpg";
import JUPITER_VOYAGER from "../../assets/SPACE/JUPITER_VOYAGER.gif";

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

function Space() {
  const rotation = useRef(0);

  // useRaf(({t}) => {
  //   rotation.current = (rotation.current + 0.03) % 360;
  // });

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
          top: '60%',
          left: '20%',
          transform: `translate(-50%, -50%) rotate(90deg)`,
          width: '40%',
        }}
      />
      <Fuck
        src={CERES}
        alt="Ceres"
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(-90deg)`,
          width: '40%',
          mixBlendMode: 'screen',
          filter: 'grayscale(1)',
        }}
      />
      <Fuck
        src={APOLLO11}
        alt="Apollo 11"
        style={{
          position: 'absolute',
          top: '60%',
          left: '80%',
          transform: `translate(-50%, -50%)`,
          width: '30%',
          mixBlendMode: 'screen',
        }}
      />
      <Fuck
        src={JUPITER_VOYAGER}
        alt="Jupiter"
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          width: '40%',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}

export default Space;

