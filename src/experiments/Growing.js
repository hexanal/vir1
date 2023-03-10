import { useCallback, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import useRaf from '../hooks/useRaf';
// import useKeys from '../hooks/useKeys';
// import useGamepads from '../hooks/useGamepads';
// import usePointer from '../hooks/usePointer';
// import useCollision from '../hooks/useCollision';

// import Scanner from '../components/viz/Scanner';

import useFaderControl from '../hooks/useFaderControl';
import Tree from '../components/viz/Tree';

/**
 * E X P E R I M E N T I N G
 *
 */
const DICT = [
  'hello', 'world', 'foo', 'bar', 'baz', 'lol',
  'dog', 'cat', 'weasel', 'donkey', 'horse', 'platypus',
  'giraffe', 'chimpanzee', 'gorilla', 'lion', 'jellyfish', 'octopus',
];

function randomInt(lowest, highest) {
  const min = Math.ceil(lowest);
  const max = Math.floor(highest);

  return Math.floor(Math.random() * (max - min) + min);
}

function randomPick(arr) {
  return arr[randomInt(0, arr.length)];
}

function randomWord() {
  return randomPick(DICT);
}

/**
 * < / E X P E R I M E N T I N G >
 */

function randomTree({
  nodes = 0,
  id = 'root',
  label = 'root',
  children = [],
}) {
  let tree = {
    id,
    label,
    children,
  };

  for (let i = 0; i <= nodes; i++) {
    const subId = uuidv4();
    const subLabel = `${randomWord()}_${randomWord()}`;
    const sub = randomTree({
      nodes: randomInt(0, nodes), // TODO
      id: subId,
      label: subLabel,
    });

    tree.children.push(sub);
  }

  return tree;
}

const initialTree = {
  id: 'root',
  label: '×',
  children: [
    {
      id: 'alpha',
      label: '𝛼',
    },
    {
      id: 'beta',
      label: '𝛽',
    },
    {
      id: 'gamma',
      label: '𝛾',
    },

    {
      id: 'delta',
      label: '𝛿',
      children: [
        {
          id: 'epsilon',
          label: '𝜀',
          children: [
            {
              id: 'zeta',
              label: '𝜁',
              children: [
                {
                  id: 'eta',
                  label: '𝜂',
                },
              ]
            },
          ]
        },
        {
          id: 'theta',
          label: '𝜃',
        },
        {
          id: 'iota',
          label: '𝜄',
        },
      ]
    },
  ]
};

export default function Growing(props) {
  const [tree, setTree] = useState(initialTree);
  // NOTE could be [offset2, Offset2Fader] = ...
  const [spacingX, SpacingXFader] = useFaderControl({
    label: 'Horizontal spacing',
    value: 1,
    min: 0.5,
    max: 2,
    step: 0.01,
  });
  const [spacingY, SpacingYFader] = useFaderControl({
    label: 'Vertical spacing',
    value: 2,
    min: -5,
    max: 5,
    step: 0.05,
  });
  const [depthScaling, DepthScalingFader] = useFaderControl({
    label: 'Scaling',
    value: 1,
    min: 0.5,
    max: 1.5,
    step: 0.01,
  });

  const onClickAddNode = useCallback(e => {
    setTree(prevTree => {
      const { children } = prevTree || {}

      return {
        ...prevTree,
        children: [
          ...children,
          {
            id: uuidv4(),
            label: '𝞳',
          }
        ]
      }
    });
  }, [setTree]);

  return (
    <div>
      <SpacingXFader />
      <SpacingYFader />
      <DepthScalingFader />

      <button
        type="button"
        onClick={onClickAddNode}
      >
        Add node
      </button>

<pre
  style={{
    fontSize: '0.75rem',
  }}
>{`
a tree structure
        vizualized as a tree
        configure the spacing x/y
        scaling of children (depth)
wishlist:
        orientation of tree
        better spacing (maybe with polar coords instead?)
          children all  "around" the node
        lines between nodes & children
        analysis... of tree
`}
</pre>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `
            translate(-50%, -50%)
          `,
        }}
      >
        <Tree
          node={tree}
          config={{
            spacingX,
            spacingY,
            slice: 2,
            offset: 0.5,
            depthScaling,
            depthXScaling: 0.75, // TODO
          }}
        />
      </div>
    </div>
  );
};

