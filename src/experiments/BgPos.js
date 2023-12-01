import { useCallback, useState, useEffect, useMemo } from 'react';
import { useSpring, animated as a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export default function BgPos(props) {
  const [w, setW] = useState(320);
  const [h, setH] = useState(320);
  const [bgX, setBgX] = useState(0);
  const [bgY, setBgY] = useState(0);

  const onWidthChange = useCallback(e => {
    setW(e.target.value);
  }, [setW]);
  const onHeightChange = useCallback(e => {
    setH(e.target.value);
  }, [setH]);

  const bind = useDrag(e => {
    const {active, delta, movement, direction} = e || {};
    const [dx, dy] = delta || [];

    setBgX(bgX + dx);
    setBgY(bgY + dy);

  }, [bgX, bgY, setBgX, setBgY]);

  useEffect(() => {
    console.log([bgX, bgY]);
  }, [bgX, bgY]);

  return (
    <div>
      <pre>
        {bgX}px {bgY}px
      </pre>
      width
      <input type="number" onChange={onWidthChange} value={w} />
      height
      <input type="number" onChange={onHeightChange} value={h} />
      <a.div
        style={{
          width: `${w}px`,
          height: `${h}px`,
          backgroundImage: 'url(/SPACE/BENNU.jpg)',
          backgroundPosition: `${bgX}px ${bgY}px`,
          cursor: 'move',
        }}
        {...bind()}
      >
        whaddup
      </a.div>
    </div>
  );
}
