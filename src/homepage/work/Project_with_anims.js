import { useCallback, useRef, useState } from "react";
import useRaf from "../../hooks/useRaf";
import usePointer from "../../hooks/usePointer";
import useReefer from "../../hooks/useReefer";
import { useSpring, animated as a } from "@react-spring/web";

import FieldLabel from "./FieldLabel";
import Graph from "../../components/viz/Graph";
// import Scanner from "../../components/viz/Scanner";
import HeightToggle from "../HeightToggle";

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

export default function Project(props) {
  const {
    theme,
    title,
    year,
    agency,
    link,
    linkLabel,
    comments,
    video = null
  } = props || {};
  const {
    color,
  } = theme || {};

  const ran = useRef(Math.random() * 15);
  const x = useRef(-10 + ran.current);
  const y = useRef(5 + ran.current);

  const videoRef = useRef(null);
  const commentsRef = useRef(null);

  const { pointers } = usePointer();
  const { buttons = 0 } = pointers[0] || {};

  const titleParts = title.split(' ');

  const [projectVisible, setProjectVisible] = useState(false);
  const [{ showProgress, videoHeight, commentsHeight }, springApi] = useSpring(
    () => ({
      showProgress: 0,
      videoHeight: 0,
      commentsHeight: 0,
      config: { tension: 250, friction: 15 },
    }),
    []
  );

  const onShowProject = useCallback(() => {
    setProjectVisible(true);
    springApi.start({
      showProgress: 1,
      videoHeight: videoRef.current.offsetHeight,
      commentsHeight: commentsRef.current.offsetHeight + 30,
    });
  }, [setProjectVisible, springApi]);

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: '700px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '512px',
          margin: '1rem auto',
          padding: '0.25rem 1rem',
        }}
      >


        <a.div
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: '50%',
            borderRadius: '50%',
            width: '150%',
            backgroundColor: `${color}`,
            transformOrigin: 'center 0',
            transform: showProgress.to(p => `
              translate(-50%, 5%)
              scale(${(p * 0.7) + 0.2})
            `),
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 2 2`}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </a.div>


        {title ? <h2
          style={{
            position: 'relative',
            zIndex: 4,
            textTransform: `uppercase`,
            transform: `rotate(-7deg)`,
            fontSize: '2rem',
            lineHeight: 1,
          }}
        >
          {titleParts.map( (tp, i) => {
            return (
              <div
                key={tp}
                style={{
                  marginLeft: `${i * 2}rem`,
                }}
              >
                <Boxed>
                  {tp}
                </Boxed>
              </div>
            );
          })}
        </h2> : null}

        <div
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'right',
            transform: `rotate(4deg)`,
            transformOrigin: `100% 100%`,
          }}
        >
          {year ? <h3
            style={{
              marginBottom: 0
            }}
          >
            <small
              style={{
                fontStyle: `italic`,
              }}
            >
              in&nbsp;
            </small>
            <Boxed>
              {year}
            </Boxed>
          </h3> : null}

          {agency ? (
            <h3
              style={{
                marginTop: `0.1rem`,
                marginRight: `1rem`,
              }}
            >
              <small
                style={{
                  fontStyle: `italic`,
                }}
              >
                for&nbsp;
              </small>
              <Boxed>
                {agency}
              </Boxed>
            </h3>
          ): null}
        </div>

        {link ? (
          <div
            style={{
              // TODO
              display: 'none',
            }}
          >
            <FieldLabel>Link</FieldLabel>
            <a
              style={{
              }}
              href={link}
              rel="noreferrer noopener"
              target="_blank"
            >
              {linkLabel ? linkLabel : link}
            </a>
          </div>
        ): null}

        {!projectVisible ? (
          <button
            style={{
              position: 'absolute',
              zIndex: 5,
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: `rgb(255 255 255 / 0)`,
              border: 0,
              cursor: 'pointer',
              color: 'transparent',
              fontSize: 0,
            }}
            type="button"
            onClick={onShowProject}
          >
            show
          </button>
        ): null}

        {video !== null ? (
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              maxWidth: '512px',
              transform: `translate(-1rem, 0)`,
            }}
          >

            <a.div
              style={{
                position: 'relative',
                overflow: 'hidden',
                height: videoHeight.to(v => `${v}px`),
              }}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 16 9`}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              <a.div
                style={{
                  position: 'absolute',
                  zIndex: 3,
                  top: 0,
                  left: 0,
                  overflow: 'hidden',
                }}
              >
                <video
                  ref={videoRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                  }}
                  muted
                  autoPlay
                  loop
                  playsInline
                >
                  <source
                    src={video}
                    type="video/mp4"
                  />
                </video>
              </a.div>
            </a.div>
          </div>
        ): null}
      </div>

      <a.div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: '512px',
          margin: '0 auto 2rem',
          padding: '0.25rem 0',
          lineHeight: 1.5,
          height: commentsHeight.to(c => `${c}px`),
          overflow: 'hidden',
        }}
      >
        {comments
          ? (
            <div
              style={{
                position: 'relative',
                zIndex: 1,
              }}
              ref={commentsRef}
            >
              {comments.map((c, i) => {
                const { id, content } = c || {};

                // componentize further!
                return (
                  <div
                    key={id}
                    style={{
                      marginTop: '1rem',
                    }}
                  >
                    <Boxed
                      style={{
                        position: 'relative',
                        marginLeft: i % 2 === 0 ? '10%' : 0,
                        marginRight: i % 2 === 0 ? 0 : '10%',
                        padding: '1rem',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={`0 0 100 100`}
                        style={{
                          overflow: 'visible',
                          width: '2rem',
                          height: '0.9rem',
                          position: 'absolute',
                          left: '50%',
                          top: 0,
                          transform: `
                            translate(-50%, -100%)
                          `,
                        }}
                        preserveAspectRatio="none"
                      >
                        <path
                          d={`
                            M 0,100
                            C 50,100, 50,0, 50,0
                            C 50,0, 50,100, 100,100
                          `}
                        />
                      </svg>

                      <p style={{ margin: 0 }}>
                        {content}
                      </p>
                    </Boxed>
                  </div>
                );
              })}
            </div>
          ): null
        }
      </a.div>
    </div>
  );
}


