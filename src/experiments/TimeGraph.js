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

import ControlPanel from '../components/controls/ControlPanel';
import Graph from '../components/viz/Graph';
import GraphAxes from '../components/viz/GraphAxes';

function fn({
  x,
  y,
  fx = n => n,
  fy = n => n,
}) {
  return [fx(x), fy(y)];
}

export default function TimeGraph(props) {
  const { t, elapsed } = useRaf();

  const typeOptions = [
    'dots',
    'dots-fade',
    'line',
    'value',
    'bars',
];
  const [type, setType] = useState(typeOptions[0]);
  const onChangeType = useCallback( e => {
    const { target } = e;
    const { value = null } = target || {};
    setType(value);
  }, [setType]);

  const [sampleRate, SampleRateFader] = useFaderControl({
    label: 'sampleRate',
    unit: 'meh',
    value: 256,
    min: 4,
    max: 1024,
    step: 1,
  });
  const [zoom, ZoomFader] = useFaderControl({
    label: 'zoom',
    description: 'the “recording” window?',
    unit: '×',
    value: 1000,
    min: 1,
    max: 3000,
    step: 100,
  });
  const [LAMBDA, LambdaFader] = useFaderControl({
    label: '𝜆',
    unit: 'Hz',
    value: 42,
    min: 0.1,
    max: 120,
    step: 0.1,
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

  const points = useRef(Array(sampleRate));
  const latest = useRef(null);
  const latestTime = useRef(null);
  const latestPoint = useRef(null);
  const latestIndex = useRef(0);
  const [sample, setSample] = useState(null);

  // TODO not sure the way I've done it here is... the right way

  // hookify to create dots through time
  // viz
  useEffect( () => {
    const timescaleDelta = zoom / sampleRate;
    const delta = elapsed - latest.current;
    const shouldSample =
      (latest.current === null
      || delta >= timescaleDelta)
      && latestTime.current !== t;

    if (!shouldSample) return;

    latestTime.current = t;
    latest.current = elapsed;
    latestIndex.current = latestIndex.current < sampleRate
      ? latestIndex.current + 1
      : 0;

    const [lx, ly] = fn({
      x: latestIndex.current / sampleRate * 100,
      y: ZETA,
    });

    points.current[latestIndex.current] = [lx, ly, 0, elapsed];
  }, [LAMBDA, ZETA, t, elapsed]);

  useEffect(() => {
    points.current = points.current.slice(0, sampleRate);
  }, [sampleRate]);

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
      <ControlPanel
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1rem',
          left: '1rem',
        }}
      >
        <ZetaFader />
        <LambdaFader />
        <SampleRateFader />
        <ZoomFader />
        <select
          onChange={onChangeType}
        >
          {typeOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </ControlPanel>

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
          xOffset={50}
          yOffset={50}
          subdivisions={2}
          dashes={8}
        />

        {type === 'bars'
          ? points.current.map((p,i,arr) => {
            const [pointX, pointY, _, frame] = p || [];
            return (
              <line
                key={frame}
                x1={pointX}
                x2={pointX}
                y1={100}
                y2={pointY * 100}
                stroke={`rgb(0 0 0 / 1)`}
                strokeWidth={100 / sampleRate}
              />
            );
          })
          : null}

        {type === 'value'
          ? points.current.map((p,i,arr) => {
            const [pointX, pointY, _, frame] = p || [];
            return (
              <text
                key={frame}
                x={pointX}
                y={pointY * 100}
                style={{
                  fontSize: '2px'
                }}
                fill={`rgb(0 0 0 / 1)`}
                stroke={`none`}
              >
                {pointY.toFixed(2)}
              </text>
            );
          })
          : null}

        {type === 'line' ? (
          <path
            d={points.current.reduce((acc,p,arr) => {
              const type = acc === '' ? 'M' : 'L';
              const [pointX, pointY, _, frame] = p || [];

              return acc + `
                ${type} ${pointX},${pointY * 100}
              `;
            }, '')}
            vectorEffect={`non-scaling-stroke`}
            stroke={`rgb(255 0 0 / 1)`}
            fill={`none`}
          />
        ):null}

        {type === 'dots' || type === 'dots-fade'
          ? points.current.map((p,i,arr) => {
          const [prevX = 0, prevY = 0] = points.current[i-1] || [];
          const [pointX, pointY, _, frame] = p || [];
          const cx = pointX;
          const cy = pointY * 100;
          const transparency = pointX / sampleRate;
          const fill = type === 'dots-fade'
            ? `rgb(0 0 0 / ${transparency})`
            : `rgb(0 0 0 / 1)`;

          return (
            <Fragment key={frame}>
              <text
                x={51}
                y={53}
                style={{
                  fontSize: '3px'
                }}
                fill={`rgb(0 0 0 / 1)`}
                stroke={`none`}
              >
                {transparency}
              </text>

              <circle
                cx={cx}
                cy={cy}
                r={0.25}
                fill={fill}
                stroke={`none`}
              />
            </Fragment>
          );
        }): null}

      </Graph>
    </div>
  );
};

