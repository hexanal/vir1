
function AsymSeparator(props) {
  const { style = {} } = props || {};

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '50%',
          maxWidth: `420px`,
          margin: '0 auto',
          height: `5rem`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 100 100`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translateX(-100%)`,
            overflow: 'visible',
            width: '16rem',
            height: `50%`,
          }}
          preserveAspectRatio="none"
        >
          <path
            d={`
              M 0,100
              C 80,100 100,100 100,0
            `}
            stroke={`rgb(0 0 0 / 1)`}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 100 100`}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            transform: `translateX(100%)`,
            overflow: 'visible',
            width: '16rem',
            height: '50%',
          }}
          preserveAspectRatio="none"
        >
          <path
            d={`
              M 0,100
              C 0,20 0,0 100,0
            `}
            stroke={`rgb(0 0 0 / 1)`}
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

export default AsymSeparator;

