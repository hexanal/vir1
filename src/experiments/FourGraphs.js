import { v4 as uuidv4 } from 'uuid';
import  {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';

import useRaf from '../hooks/useRaf';
import useFaderControl from '../hooks/useFaderControl';
import useToggleControl from '../hooks/useToggleControl';

import Graph from '../components/viz/Graph';
import GraphAxes from '../components/viz/GraphAxes';

import TimeGraph from './TimeGraph';
import DessinGraph from './DessinGraph';
import MoveGraph from './MoveGraph';

export default function FourGraphs(props) {
  const { t, elapsed } = useRaf();

  const [xOffset, XOffsetFader] = useFaderControl({
    label: 'X Axis Offset',
    value: 50,
    min: 0,
    max: 100,
  });
  const [yOffset, YOffsetFader] = useFaderControl({
    label: 'Y Axis Offset',
    value: 50,
    min: 0,
    max: 100,
  });

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {/* <TimeGraph /> */}
      <DessinGraph
         graphStyle={{
           position: 'absolute',
           top: 0,
           right: 0,
           width: 'auto',
           height: '50%',
           backgroundColor: 'rgb(0 255 255 / 0.25)',
        }}
      />

      <DessinGraph
         graphStyle={{
           position: 'absolute',
           top: 0,
           left: 0,
           width: 'auto',
           height: '50%',
           backgroundColor: 'rgb(255 0 255 / 0.25)',
        }}
      />

      <MoveGraph
         graphStyle={{
           position: 'absolute',
           bottom: 0,
           left: 0,
           width: 'auto',
           height: '50%',
           backgroundColor: 'rgb(0 255 0 / 0.25)',
        }}
      />

      <MoveGraph
         graphStyle={{
           position: 'absolute',
           bottom: 0,
           right: 0,
           width: 'auto',
           height: '50%',
           backgroundColor: 'rgb(0 0 255 / 0.25)',
        }}
      />
    </div>
  );
};

/*
 graphStyle={{
   position: 'absolute',
   top: 0,
   right: 0,
   width: 'auto',
   height: '50%',
   backgroundColor: 'rgb(0 255 255 / 0.25)',
}
*/

