// import Graph from './Graph';


export default function Tree(props) {
  const {
    node,
    config, // TODO
    onClickNode = null,
  } = props || {};
  const {
    id,
    label,
    depth = 0,
    subIndex = 0,
    siblings = 0,
    children = [],
  } = node || {};
  const {
    spacingX = 1, // n-dimensional TODO
    spacingY = 1,
    slice = 2,
    offset = 0.5,
    depthScaling = 0.9,
    depthXScaling = 0.9,
  } = config || {};

  const mid = siblings / slice;
  const sub = (subIndex + offset) - mid;
  const x = sub * 100 * spacingX;
  const y = depth > 0 ? -100 * spacingY : 0;

  const leafOrNodeColor = children.length > 0
    ? `rgb(0 0 255 / 1)`
    : `rgb(0 255 0 / 1)`;
  const backgroundColor = depth > 0
    ? leafOrNodeColor
    : `rgb(255 0 0 / 1)` // root color

  return (
    <div
      key={id}
      style={depth > 0
        ? {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `
            scale(${depthScaling})
            translate(-50%, 0)
            translate(${x}%, ${y}%)
          `,
        }
        : {
          position: 'relative',
        }
      }
    >
      <div
        style={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
          margin: `0 1rem`,
          padding: `0.5rem`,
          border: `1px solid rgb(0 0 0 / 0.25)`,
          width: '5rem',
          height: '1rem',
          // borderRadius: '50%',
          overflow: 'hidden',

          backgroundColor,
        }}
      >
        <div
          style={{
            fontSize: `1.25rem`,
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          {onClickNode !== null
            ? (
              <button
                type="button"
                onClick={() => onClickNode(node)}
              >
                {label}
              </button>
            )
            : label}
        </div>
      </div>

      <pre
        style={{
          position: 'absolute',
          fontSize: '0.5rem',
          top: 0,
          left: '100%',
          padding: '4px',
          backgroundColor: `rgb(0 0 0 / 0.1)`,
          border: `1px solid rgb(0 0 0 / 1)`,
          borderRadius: '2px',
        }}
      >{`x: ${x}
y: ${y} `}</pre>

      <div>
        {children.map((c,i) => {
          const { id } = c || {};
          const childNode = {
            ...c,
            subIndex: i,
            depth: depth + 1,
            siblings: children.length,
          };
          return (
            <Tree
              key={id}
              node={childNode}
              config={config}
              onClickNode={() => onClickNode(childNode)}
              // parent?!!?!?
            />
          );
        })}
      </div>
    </div>
  );
}

