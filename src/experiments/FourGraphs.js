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

import Graph from '../components/viz/Graph';
import GraphAxes from '../components/viz/GraphAxes';

// import useCollision from '../hooks/useCollision';
// import usePointer from '../hooks/usePointer';

// import useToggleControl from '../hooks/useToggleControl';
// import useSelection from '../hooks/useSelection';

function fn({
  x,
  y,
  fx = n => n,
  fy = n => n,
}) {
  return [fx(x), fy(y)];
}

export default function FourGraphs(props) {
  // const [withCoords, WithCoordsToggle] = useToggleControl({
  //   label: 'With coordinates',
  //   value: false,
  // });
  //
  const { t, elapsed } = useRaf();

  const [snapshots, SnapshotsFader] = useFaderControl({
    label: 'Snapshots',
    value: 32,
    min: 4,
    max: 128,
    step: 1,
  });
  const [timescale, TimescaleFader] = useFaderControl({
    label: 'Timescale',
    value: 500,
    min: 50,
    max: 10000,
    step: 50,
  });
  const [ALPHA, AlphaFader] = useFaderControl({
    label: '𝛼',
    value: 0.5,
    min: 0.001,
    max: 2,
    step: 0.001,
  });
  const [THETA, ThetaFader] = useFaderControl({
    label: '𝜃',
    value: 0.1,
    min: 0.001,
    max: 2,
    step: 0.001,
  });
  const [ZETA, ZetaFader] = useFaderControl({
    label: '𝜁',
    value: 0.5,
    min: 0.0,
    max: 1,
    step: 0.01,
  });
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

  const points = useRef(Array(snapshots));
  const latest = useRef(null);
  const latestTime = useRef(null);
  const latestPoint = useRef(null);
  const latestIndex = useRef(0);
  const [sample, setSample] = useState(null);

  useEffect( () => {
    const timescaleDelta = timescale / snapshots;
    const delta = elapsed - latest.current;
    const shouldSample =
      (latest.current === null
      || delta >= timescaleDelta)
      && latestTime.current !== t;

    if (!shouldSample) return;

    latestTime.current = t;
    latest.current = elapsed;
    latestIndex.current = latestIndex.current < snapshots
      ? latestIndex.current + 1
      : 0;

    const [lx, ly] = fn({
      // uhhhh
      // TODO!
      // x: (latest.current * snapshots / timescale) % 100,
      // x: (latest.current * snapshots / timescale) % 100,
      // x: Math.round(snapshots * (latest.current / timescale),
      //
      // x: latestIndex.current / snapshots * 100,
      x: latestIndex.current / snapshots * 100,
      y: ZETA + Math.sin(t * 0.001) * 0.5,
    });

    points.current[latestIndex.current] = [lx, ly, 0, elapsed];
  }, [ZETA, t, elapsed]);

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
      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1rem',
          left: '1rem',
        }}
      >
        <AlphaFader />
        <ZetaFader />
        <SnapshotsFader />
        <TimescaleFader />

        {/* <ThetaFader /> */}
        {/* <XOffsetFader /> */}
        {/* <YOffsetFader /> */}
      </div>

      <Graph
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '50%',
        }}
        withoutLines
      >
        <GraphAxes
          xOffset={xOffset}
          yOffset={yOffset}
          subdivisions={2}
          dashes={8}
        />

        {points.current.map((p,i,arr) => {
          const [pointX, pointY, _, frame] = p || [];
          const cx = pointX;
          const cy = pointY * 100;

          return (
            <Fragment key={frame}>
              {/*
              <text
                x={cx + 1.5}
                y={cy}
                style={{
                  fontSize: '2px'
                }}
                fill={`rgb(0 0 0 / 1)`}
                stroke={`none`}
              >
                {cx}——{cy}
              </text>
              */}
              <circle
                cx={cx}
                cy={cy}
                r={0.5}
              />
            </Fragment>
          );
        })}

      </Graph>
      <Graph
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '50%',
          height: '50%',
        }}
        withoutLines
      >
        <GraphAxes
          xOffset={xOffset}
          yOffset={yOffset}
          subdivisions={4}
          dashes={6}
        />
      </Graph>
      <Graph
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '50%',
          height: '50%',
        }}
        withoutLines
      >
        <GraphAxes
          xOffset={xOffset}
          yOffset={yOffset}
          subdivisions={6}
          dashes={4}
        />
      </Graph>
      <Graph
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50%',
          height: '50%',
        }}
        withoutLines
      >
        <GraphAxes
          xOffset={xOffset}
          yOffset={yOffset}
          subdivisions={8}
          dashes={2}
        />

      </Graph>
    </div>
  );
};

