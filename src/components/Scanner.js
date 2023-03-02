import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf from '../hooks/useRaf';

export default function Scanner(props) {
  const {
    size = [10,2],
    use = null,
    // TODO useHistory / use...Values
    // TODO scaler
    // TODO color utils
    timeframe = 1000, // TODO
    history = 256,
    fade = true, // TODO
    scale = 'linear', // TODO
    scaleFactor = 1,
    linecolor = 'rgb(255 0 255 / 1)',
    origin = 0,// TODO
    offset = 0, // TODO
    indicator = 'bar', // TODO bar, point, cross, ...?
    withValue = false, // TODO
    style = null,
  } = props;
  const start = useRef(Date.now());
  const v = useRef([]);
  const { t, dt, elapsed } = useRaf();
  const [width, height] = size;
  // const ValueIndicator = 

  useEffect(() => {
    const newV = {
      frame: t,
      value: use
    };
    const { frame: lastFrame } = v.current[0] || {};

    if (t !== lastFrame) {
      v.current.unshift(newV);
      v.current = v.current.slice(0, history);
    }
  }, [t, dt, elapsed, use, history]);

  return (
    <div
      className="scanner"
      style={{
        position: 'relative',
        width: `${width}rem`,
        height: `${height}rem`,
        backgroundColor: `rgb(0 0 0 / 0.075)`,
        borderLeft: `1px solid rgb(0 0 0 / 1)`,
        borderBottom: `1px solid rgb(0 0 0 / 1)`,
        ...style
      }}
    >
      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`,
        }}
      >
        <div style={{
          position: 'absolute',
          top: `50%`,
          width: `100%`,
          height: `0`,
          borderTop: `1px dotted rgb(0 0 0 / 0.5)`
        }}></div>
        {v.current.map(({frame, value}, i, arr) => (
          // TODO use the Graph SVG graphing componenet... nah? you dumb fuck
            <div key={frame}>
              {indicator === 'dot'
                ? (
                  <div
                    key={frame}
                    style={{
                      position: 'absolute',
                      top: `50%`,
                      left: `${i/arr.length * width}rem`,
                      width: `4px`,
                      height: `4px`,
                      backgroundColor: linecolor,
                      transform: `
                        translate(-50%, -50%)
                        translateY(${height/2 * value * scaleFactor}rem)
                      `,
                      ...style
                    }}
                  >
                  </div>
                )
                : null}

              {indicator === 'wire'
                ? (
                  <div
                    key={frame}
                    style={{
                      position: 'absolute',
                      top: `50%`,
                      left: `${i/arr.length * width}rem`,
                      width: `${width / arr.length}rem`,
                      height: `1px`,
                      backgroundColor: linecolor,
                      transform: `
                        translateY(${height/2 * value * scaleFactor}rem)
                      `,
                      ...style
                    }}
                  >
                  </div>
                )
                : null}

              {indicator === 'bar'
                ? (
                  <div
                    {...props}
                    style={{
                      position: 'absolute',
                      top: `0`,
                      left: `${i/arr.length * width}rem`,
                      width: `${width / arr.length}rem`,
                      height: `100%`,
                      backgroundColor: linecolor,
                      transformOrigin: '50% 0',
                      transform: `
                        translateY(50%)
                        scaleY(${1 * value/2 * scaleFactor})
                      `,
                      ...style
                    }}
                  >
                  </div>
                )
                : null}
            </div>
        ))}
      </div>

      <code
        style={{
          position: 'absolute',
          bottom: 0,
          left: `100%`,
          backgroundColor: `rgb(0 0 0 / 0.05)`,
          padding: `0.2rem`,
          fontSize: `0.5rem`,
          transform: `
            translateX(0.25rem)
          `,
        }}
      >
        {withValue ? use : ''}
      </code>
    </div>
  );
};
