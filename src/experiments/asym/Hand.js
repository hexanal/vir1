import { useState, useEffect } from 'react';
// import useHook from '../hooks/useHook.js';

import rightHandSprite from '../../assets/RIGHT_001.png';

export default function Hand(props) {
  // const { hook } = useHook(null);
  // const [x, setX] = useState(null);

  // useEffect( () => {
  // }, []);

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '75%',
          left: '75%',
          width: '200px',
          height: '200px',
          backgroundImage: `url(${rightHandSprite})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      ></div>
    </div>
  );
};
