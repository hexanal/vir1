import { useCallback, useState, useEffect, useRef } from 'react';
// import useRaf from '../hooks/useRaf';
// import useKeys from '../hooks/useKeys';
// import useGamepads from '../hooks/useGamepads';
// import usePointer from '../hooks/usePointer';
// import useCollision from '../hooks/useCollision';

// import Scanner from '../components/viz/Scanner';

import useFaderControl from '../hooks/useFaderControl';
import Tree from '../components/viz/Tree';

const tree = {
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
  // NOTE could be [offset2, Offset2Fader] = ...
  const {
    value: spacingX,
    control: SpacingXFader,
  } = useFaderControl({
    label: 'Horizontal spacing',
    value: 1,
    min: 0.5,
    max: 2,
    step: 0.01,
  });
  const {
    value: spacingY,
    control: SpacingYFader,
  } = useFaderControl({
    label: 'Vertical spacing',
    value: 2,
    min: -5,
    max: 5,
    step: 0.05,
  });
  const {
    value: depthScaling,
    control: DepthScalingFader,
  } = useFaderControl({
    label: 'Scaling',
    value: 1,
    min: 0.5,
    max: 1.5,
    step: 0.01,
  });

  return (
    <div>
      <SpacingXFader />
      <SpacingYFader />
      <DepthScalingFader />

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
          {...tree}
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

