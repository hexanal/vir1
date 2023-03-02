import Scanner from './Scanner';

export default function BiAxialScanner(props) {
  const {
    x = 0,
    y = 0,
    size = [3, 3],
    history = 8
  } = props || {};
  const s = size[0];

  return (
    <div style={{
      position: 'relative',
      width: `${s}rem`,
      height: `${s}rem`
    }}>
      <code style={{
        position: 'absolute',
        bottom: 0,
        left: `100%`,
        fontSize: '0.6rem',
        transform: `
          translateX(4px)
        `
      }}>x</code>
      <div style={{
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `
          rotate(-90deg)
          translateX(-1px)
        `,
        mixBlendMode: 'multiply'
      }}>
        <Scanner
          use={x}
          history={history}
          linecolor={`rgb(0 255 255 / 0.5)`}
          size={size}
          style={{
            borderBottom: 0
          }}
          {...props}
        />
      </div>

      <div
        style={{
          mixBlendMode: 'multiply'
          }}>
          <code
            style={{
              position: 'absolute',
              top: 0,
              right: `100%`,
              transform: `
                translate(-50%, -50%)
                `,
              fontSize: '0.6rem',
            }}
          >
            y
          </code>
        <Scanner
          use={y}
          history={history}
          size={size}
          {...props}
        />
      </div>
    </div>
  );
}

