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

function parseText(text) {
  const lines = text.split('\n');
  const root = { contents: 'root', id: uuidv4(), depth: 0 };
  let currentNode = root;
  let previousNode = root;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const indentation = line.search(/\S/);
    const contents = line.trim();
    const node = { contents, id: uuidv4(), depth: indentation / 2 };

    if (indentation === 0) {
      // This is a new node from the root of the tree
      currentNode = root;
    } else if (indentation > previousNode.depth * 2) {
      // This is a child node of the previous node
      currentNode = previousNode;
    } else if (indentation === previousNode.depth * 2) {
      // This is a sibling node of the previous node
      currentNode = previousNode.parent;
    } else {
      // This is an invalid indentation
      // throw new Error(`Invalid indentation at line ${i}: ${line}`);
      continue;
    }

    node.parent = currentNode;
    currentNode.children = currentNode.children || [];
    currentNode.children.push(node);
    previousNode = node;
  }

  return root;
}

export default function TextTree(props) {
  const [tree, setTree] = useState({});
  const [text, setText] = useState(``);

  const onClickButton = useCallback(e => {
    const newText = `

remote control server via
  vim
  with plugins and shit
  on good host
    local?
    self?
  live-edit something that's online

    `;
    const newTree = parseText(newText);

    setText(newText);
    setTree(newTree);
  }, [setText, setTree]);

  const onClickNode = useCallback(node => {
    setTree(node);
  }, [tree, setTree]);

  return (
    <div>
      <button
        type="button"
        onClick={onClickButton}
      >
        Parse!
      </button>

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
>{text}</pre>

    </div>
  );
};

