import { v4 as uuidv4 } from 'uuid';
import  {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';

import useToggleControl from '../../hooks/useToggleControl';

export default function ControlPanel(props) {
  const {
    style = null,
    children = null,
    hidden = true,
  } = props || {};

  const [debug, DebugToggle] = useToggleControl({
    label: "DEBUG",
    value: !hidden,
  });

  return (
    <div
      style={{
        ...style,
      }}
    >
      <DebugToggle />
      {debug ? (
        children
      ):null}
    </div>
  );
}

