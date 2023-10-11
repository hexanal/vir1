import { useCallback, useState, useEffect, useRef } from 'react';
import { Leva, useControls } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import Logger from '../components/viz/Logger';

import MESSAGES from '../config';

const { OBS_MESSAGE } = MESSAGES;

function Boom(props) {
  const {
    children = null,
    fontSize = 1,
    fontColor = '#ffffff',
    bgColor = '#000000',
    style = {}
  } = props || {};

  return (
    <div style={{
      position: 'absolute',
      bottom: '0.5rem',
      right: '0.5rem',
      ...style
    }}>
      <div style={{
        position: 'relative',
        zIndex: 2,
        fontSize: `${fontSize}rem`,
        color: fontColor,
        transform: `translate(0.25rem, 0.25rem) rotate(-1deg)`,
      }}>
        {children}
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        padding: '0.1rem'
      }}>
      </div>
    </div>
  );
}

export default function DateTime(props) {
  const {
    COLOR_KEY,
    FONT_COLOR,
    FONT_SIZE,
    BG_COLOR,
    WEEKDAY_FORMAT,
    DAY_FORMAT,
    MONTH_FORMAT,
    YEAR_FORMAT,
    FONT_FAMILY,
    LOWERCASE,
    MESSAGE,
  } = useControls({
    LOWERCASE: true,
    FONT_FAMILY: {
      value: '"Fantasque Sans Mono", monospace',
      options: [
        'Courier, monospace',
        '"Times New Roman", serif',
        'Garamond, Georgia, serif',
        'Arial, sans-serif',
      ]
    },
    COLOR_KEY: {
      value: '#00ff00',
    },
    FONT_SIZE: {
      value: 2.5,
      min: 0.5,
      max: 3,
      step: 0.1,
    },
    FONT_COLOR: {
      value: '#ffffff',
    },
    BG_COLOR: {
      value: '#0000ff',
    },
    WEEKDAY_FORMAT: {
      value: 'short',
      options: [
        'short',
        'narrow',
        'long',
      ],
    },
    DAY_FORMAT: {
      value: 'numeric',
      options: [
        'numeric',
        '2-digit',
      ],
    },
    MONTH_FORMAT: {
      value: 'short',
      options: [
        'short',
        'long',
        'narrow',
        'numeric',
        '2-digit',
      ],
    },
    YEAR_FORMAT: {
      value: 'numeric',
      options: [
        'numeric',
        '2-digit',
      ],
    },
    MESSAGE: OBS_MESSAGE || '—',
  });

  const { t, t0, elapsed }  = useRaf();

  const date = new Date(t);
  const year = date.getYear();
  const month = date.getMonth();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const datestring = date.toLocaleDateString('en-US', {
    weekday: WEEKDAY_FORMAT,
    year: YEAR_FORMAT,
    month: MONTH_FORMAT,
    day: DAY_FORMAT,
  });
  const timestring = date.toLocaleTimeString('en-US');

  const [controlsHidden, setControlsHidden] = useState(true);
  const { keys } = useKeys();

  useEffect(() => {
    if( keys.includes('a') ) {
      setControlsHidden(true);
    }
    if( keys.includes('s') ) {
      setControlsHidden(false);
    }
  }, [keys, setControlsHidden]);

  return (
    <div
      className=""
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        //backgroundColor: COLOR_KEY,
        backgroundColor: 'transparent',
        fontFamily: FONT_FAMILY
      }}
    >
      <Leva
        // theme={myTheme} // you can pass a custom theme (see the styling section)
        hidden={controlsHidden} // default = false, when true the GUI is hidden
      />

      <Boom
        fontSize={FONT_SIZE * 0.8}
        fontColor={FONT_COLOR}
        bgColor={BG_COLOR}
        style={{
          bottom: '3.25rem',
          right: '1rem',
          transform: 'rotate(2deg)',
          textTransform: LOWERCASE ? 'lowercase' : 'none'
        }}
      >
        {timestring}
      </Boom>

      <Boom
        fontSize={FONT_SIZE}
        fontColor={FONT_COLOR}
        bgColor={BG_COLOR}
        style={{
          textTransform: LOWERCASE ? 'lowercase' : 'none'
        }}
      >
        {datestring}
      </Boom>

      <Boom
        fontSize={FONT_SIZE * 0.7}
        fontColor={FONT_COLOR}
        bgColor={BG_COLOR}
        style={{
          left: 0,
          right: 'auto',
          textTransform: LOWERCASE ? 'lowercase' : 'none'
        }}
      >
        {MESSAGE}
      </Boom>
    </div>
  );
};
