import { useCallback, useState, useEffect, useRef } from 'react';
// import useRaf from '../hooks/useRaf';
// import useKeys from '../hooks/useKeys';
// import useGamepads from '../hooks/useGamepads';
// import usePointer from '../hooks/usePointer';
// import useCollision from '../hooks/useCollision';

// import Scanner from '../components/viz/Scanner';
// import FaderControl from '../components/FaderControl';
// import useFaderControl from '../hooks/useFaderControl';

const createNode = ({
  id = 0,
  label = '—',
  children = [],
}) => ({
  id,
  label,
  children,
});

const tree = createNode({
  id: 'root',
  label: 'root',
  children: [
    createNode({
      id: 'leaf1',
      label: 'a leaf',
    }),

    createNode({
      id: 'alpha',
      label: 'alpha',
    }),
    createNode({
      id: 'beta',
      label: 'beta',
    }),

    createNode({
      id: 'node1',
      label: 'node with two children?',
      children: [
        createNode({
          id: 'nodeee',
          label: 'nooo',
          children: [
            createNode({
              id: 'leaf3',
              label: 'y',
              children: [
                createNode({
                  id: 'fukk',
                  label: 'a leaf',
                }),
              ]
            }),
          ]
        }),
        createNode({
          id: 'leaf3',
          label: 'a leaf',
        }),
        createNode({
          id: 'leaf4',
          label: 'a leaf 4 ooo',
        }),
      ]
    }),
  ]
});

const renderNode = props => {
  const {
    id,
    label,
    depth = 0,
    subIndex = 0,
    siblings = 0,
    children,
  } = props || {};

  const mid = siblings / 2;
  const sub = (subIndex + 0.5) - mid;
  const distance = sub * 100;

  console.table({
    distance,
  });

  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: `
          translate(-50%, 0)
          translate(${distance}%, ${depth > 0 ? -200 : 0}%)
        `,
      }}
    >
      <div
        style={{
          display: `inline-block`,
          border: `1px solid rgb(0 0 0 / 0.25)`,
          textAlign: 'center',
          margin: `0 1rem`,
          padding: `0.25rem`,

          // width: '1rem',
          // height: '1rem',
          // borderRadius: '50%',
          overflow: 'hidden'

        }}
      >
        <div
          style={{
            fontSize: `0.75rem`,
            fontWeight: `700`,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: `0.5rem`,
            whiteSpace: 'nowrap',
            color: `rgb(160 160 32 / 1)`,
          }}
        >
          siblings: {siblings}
        </div>
        <div
          style={{
            fontSize: `0.5rem`,
            whiteSpace: 'nowrap',
          }}
        >
          d: {depth}
        </div>
        <div
          style={{
            fontSize: `0.5rem`,
            color: `rgb(32 160 64 / 1)`,
            whiteSpace: 'nowrap',
          }}
        >
          children: {children.length}
        </div>
        <div
          style={{
            fontSize: `0.5rem`,
            color: `rgb(255 0 0 / 1)`,
            whiteSpace: 'nowrap',
          }}
        >
          i: {subIndex}
        </div>
      </div>

      <div>
        {children.map((c,i) => {
          return renderNode({
            ...c,
            depth: depth + 1,
            siblings: children.length,
            subIndex: i
          });
        })}
      </div>
    </div>
  );
}

export default function Growing(props) {
  return (
    <div>
      {renderNode(tree)}
    </div>
  );
};

