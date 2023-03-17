import { useCallback, useState, useEffect, useRef } from 'react';

export default function useSelection(props) {
  const {
    coords = null,
  } = props || {};

  const from = useRef(null);
  const to = useRef(null);
  const selected = useRef(null);
  const selection = useRef(null);
  const selectedPath = useRef(null);
  const selectionPath = useRef(null);

  const isSelected = useCallback( ([x,y]) => {
    const [sx1, sy1] = selected.current !== null ? selected.current[0] : [];
    const [sx2, sy2] = selected.current !== null ? selected.current[2] : [];
    const invX = sx2 - sx1 < 0;
    const invY = sy2 - sy1 < 0;
    const withinX = invX
      ? x > sx2 && x < sx1
      : x > sx1 && x < sx2
    const withinY = invY
      ? y > sy2 && y < sy1
      : y > sy1 && y < sy2;

    return withinX && withinY;
  }, []);

  useEffect(() => {
    if (coords === null) {
      from.current = null;
      to.current = null;
      selection.current = null;
      selectionPath.current = null;
      return;
    }

    const end = [coords[0], coords[1]];

    const start = from.current !== null
      ? from.current
      : end;

    const points = [
      [start[0], start[1]],
      [end[0], start[1]],
      [end[0], end[1]],
      [start[0], end[1]],
    ];
    const path = `
      M ${points[0].join(',')}
      L ${points[1].join(',')}
      L ${points[2].join(',')}
      L ${points[3].join(',')}
      z
    `;

    from.current = start;
    to.current = end;
    selection.current = points;
    selected.current = points;
    selectionPath.current = path;
    selectedPath.current = path;
  }, [coords]);

  return {
    selection: selection.current,
    selectionPath: selectionPath.current,
    selected: selected.current,
    selectedPath: selectedPath.current,
    from: from.current,
    to: to.current,
    isSelected,
  }
}

