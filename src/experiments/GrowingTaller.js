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
  id = 'root',
  contents = 'root',
  maxDepth = 2,
  maxNodes = 2,
  depth = 0,
}) {
  let children = [];
  const subNodes = randomInt(0, maxNodes);

  depth = subNodes > 0
    ? depth + 1
    : depth;

  console.log({id, depth, maxNodes, subNodes});

  for (let i = 0; i < subNodes; i++) {
    const subId = uuidv4();
    const subcontents = `${randomWord()}_${randomWord()}`;

    if (depth > maxDepth) break;

    const sub = randomTree({
      id: subId,
      contents: subcontents,
      depth,
      maxDepth,
      maxNodes,
    });

    children.push(sub);
  }

  return {
   id,
   contents,
   children
  };
}

export default function GrowingTaller(props) {
  const [maxNodes, MaxNodesControl] = useFaderControl({
    label: 'Max nodes',
    value: 2, min: 0, max: 16, step: 1,
  });
  const [maxDepth, MaxDepthControl] = useFaderControl({
    label: 'Max depth',
    value: 2, min: 0, max: 16, step: 1,
  });

  const [tree, setTree] = useState({});
  const [prev, setPrev] = useState({});

  const onClickButton = useCallback(e => {
    const newTree = randomTree({
      maxNodes,
      maxDepth,
    });

    setTree(newTree);
  }, [setTree, maxNodes, maxDepth]);

  const onClickNode = useCallback(node => {
    setPrev(tree);
    // console.log(node)
    setTree(node);
  }, [tree, setTree, setPrev]);

  return (
    <div>
      <button
        type="button"
        onClick={onClickButton}
      >
        Gen tree
      </button>
      <MaxNodesControl />
      <MaxDepthControl />

      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: `
            translate(-50%, -50%)
          `,
        }}
      >
        <Tree
          node={tree}
          config={{
            spacingX: 2,
            spacingY: -2.5,
            slice: 2,
            offset: 0.5,
            depthScaling: 0.9,
          }}
          onClickNode={onClickNode}
        />
      </div>

<pre
  style={{
    fontSize: '0.75rem',
  }}
>{`
attempting a generated tree structure, to... ahem
   i don't know why i do it...
`}
</pre>

    </div>
  );
};

