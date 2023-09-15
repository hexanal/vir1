// import Graph from './Graph';
import { useCallback, useState, useEffect, useRef } from 'react';


export default function BasicTree(props) {
  const {
    node,
    config, // TODO
    onClickNode = null,
  } = props || {};
  const {
    id,
    contents,
    depth = 0,
    subIndex = 0,
    siblings = 0,
    children = [],
  } = node || {};
  const {
    coolBeans = false,
  } = config || {};

  const leafOrNodeColor = children.length > 0
    ? `rgb(0 0 255 / 1)`
    : `rgb(0 255 0 / 1)`;
  const backgroundColor = depth > 0
    ? leafOrNodeColor
    : `rgb(255 0 0 / 1)` // root color


  const [expanded, setExpanded] = useState(true);

  const onClick = useCallback(() => {
    setExpanded(e => !e);

    if (typeof onClickNode === 'function') {
      onClickNode(node);
    }
  }, [setExpanded, onClickNode]);

  return (
    <div
      key={id}
    >
      <div
        style={{
          // display: `flex`,
          // justifyContent: `center`,
          // alignItems: `center`,
          // margin: `0 1rem`,
          // padding: `0.5rem`,
          // border: `1px solid rgb(0 0 0 / 0.25)`,
          // width: '5rem',
          // height: '1rem',
          // overflow: 'hidden',
          backgroundColor,
        }}
      >
        <button
          type="button"
          onClick={onClick}
        >
          {contents}
        </button>
      </div>

      <div
        style={{
          display: expanded ? 'block' : 'none',
          marginLeft: `1rem`,
        }}
      >
        {children.map((c,i) => {
          const { id } = c || {};
          const childNode = {
            ...c,
            subIndex: i,
            depth: depth + 1,
            siblings: children.length,
          };
          return (
            <BasicTree
              key={id}
              node={childNode}
              config={config}
              // onClickNode={() => onClickNode(childNode)}
            />
          );
        })}
      </div>
    </div>
  );
}

