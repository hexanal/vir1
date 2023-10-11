import { useCallback, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useFaderControl from '../hooks/useFaderControl';
import BasicTree from '../components/viz/BasicTree';

function parseText(text) {
  const lines = text.split('\n');
  const root = { contents: 'root', id: uuidv4(), depth: 0 };
  let currentNode = root;
  let previousNode = root;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const indentation = line.search(/\S/);
    const contents = line.trim();
    const depth = indentation / 2;
    const node = { contents, id: uuidv4(), depth };

    if (depth === 0) {
      // This is a new node from the root of the tree
      currentNode = root;
    } else if (depth > previousNode.depth) {
      // This is a child node of the previous node
      currentNode = previousNode;
    } else if (depth === previousNode.depth) {
      // This is a sibling node of the previous node
      currentNode = previousNode.parent;
    } else if (depth > 0 && depth < previousNode.depth) {
      currentNode = currentNode.parent;
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

export default function InteractTree(props) {
  const [tree, setTree] = useState({});
  const [text, setText] = useState(``);

  const onClickButton = useCallback(e => {
    const newText = `
0
  1
  2
  3
    5
    6
    7
  4
    8
      9
      10
    11
  12
    `;
    const newTree = parseText(newText);

    setText(newText);
    setTree(newTree);
  }, [setText, setTree]);

  // const onClickNode = useCallback(node => {
  //   setTree(node);
  // }, [tree, setTree]);

  return (
    <div>
      <button
        type="button"
        onClick={onClickButton}
      >
        Parse!
      </button>

      <BasicTree
        node={tree}
      />

<pre
  style={{
    fontSize: '0.75rem',
  }}
>{text}</pre>

    </div>
  );
};

