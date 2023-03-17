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
import usePointer from '../hooks/usePointer';
import useCollision from '../hooks/useCollision';

import ControlPanel from '../components/controls/ControlPanel';
import Graph from '../components/viz/Graph';
import GraphAxes from '../components/viz/GraphAxes';

const ADDING_BINDINGS = [false, true];

function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}

function sherp(x, a, b) {
  return x * (b - a) + a;
}

function smoothstep(x, a, b) {
  x = x * x * (3.0 - 2.0 * x);
  return x * (b - a) + a;
}

const SYMBOL = {
  ALPHA: '𝜶',
  BETA: '𝜷',
  GAMMA: '𝜸',
  DELTA: '𝜹',
  EPSILON: '𝜺',
  ZETA: '𝜻',
};

export default function Womblous(props) {
  const {
    style = null,
    graphStyle = null,
  } = props || {};
  const { t, elapsed } = useRaf();
  const { pointers } = usePointer();
  const { position, buttons, displace, distance } = pointers[0] || {};
  const [x, y] = position || [];

  const [ZETA, ZetaFader] = useFaderControl({
    label: SYMBOL.ZETA,
    value: 0.5,
    min: 0.0,
    max: 5,
    step: 0.01,
  });
  const [LAMBDA, LambdaFader] = useFaderControl({
    label: SYMBOL.LAMBDA,
    value: 0.050,
    min: 0.000,
    max: 1,
    step: 0.001,
  });
  const [AMPLITUDE, AmplitudeFader] = useFaderControl({
    label: 'Amplitude',
    value: 1.5,
    min: 0,
    max: 10,
    step: 0.1,
  });
  const [TESSELS, TesselationFader] = useFaderControl({
    label: 'Tessalation',
    value: 16,
    min: 0,
    max: 64,
    step: 1,
  });
  const [X_ST, XSTFader] = useFaderControl({
    label: 'X Stagger',
    value: 0,
    min: 0,
    max: 128,
    step: 1,
  });

  const [Y_ST, YSTFader] = useFaderControl({
    label: 'Y Stagger',
    value: 0,
    min: 0,
    max: 128,
    step: 1,
  });

  const points = useRef([{
    id: 'origin',
    fuck: 'yeah',
    coords: [50, 50],
  }]);

  const ref = useRef(null);
  const { hit, isInside } = useCollision({
    ref,
    coords: [x, y]
  });
  const [hitX = 0 , hitY = 0] = hit || [];
  const pan = useRef([50, 50]);
  const [panX = 50, panY = 50] = pan.current || [];
  const adding = useRef(false);
  const moving = useRef(false);
  const selecting = useRef(false);
  const getTess = useCallback( ({
    A = [],
    B = [],
    FLAGS
  }) => {
    const [xA, yA] = A || [];
    const [xB, yB] = B || [];
    const { POINT_INDEX } = FLAGS || [];

    if (A === null || B === null) return false;

    let path = '';
    for (let i = 0; i <= TESSELS; i++) {
      const type = i > 0 ? 'L' : 'M';

      const noisex = Math.cos(t * 0.005 * ZETA + i) * AMPLITUDE;
      const noisey = Math.sin(t * 0.005 * ZETA + i) * AMPLITUDE;
      const wavex2 = Math.sin(t * 0.005 * LAMBDA * xA) * AMPLITUDE;
      const wavey2 = Math.cos(t * 0.005 * LAMBDA * yA) * AMPLITUDE;
      // const wavex2 = 1 // Math.sin(t * 0.005 * LAMBDA + X_ST) * AMPLITUDE;
      // const wavey2 = 1 // Math.cos(t * 0.005 * LAMBDA + Y_ST) * AMPLITUDE;

      const dx = sherp(i / TESSELS, xB, xA);
      const dy = sherp(i / TESSELS, yB, yA);

      const motionx = i > 0 ? dx + noisex + wavex2 : xB;
      const motiony = i > 0 ? dy + noisey + wavey2 : yB;
      const lx = i === TESSELS ? xA : motionx;
      const ly = i === TESSELS ? yA : motiony;

      path += `
        ${type} ${lx},${ly}
      `;
    }

    return path;
  }, [t, ZETA, TESSELS, AMPLITUDE, X_ST, Y_ST, LAMBDA]);

  useEffect( () => {
    // TODO experiment...
    if (buttons === 1 && isInside) {
      points.current.push({
        id: uuidv4(),
        fuck: 'maybe',
        coords: [hit[0], hit[1], 0, t]
      })
    }

    if (buttons === 2 && isInside) {
      pan.current = hit;
    }
  }, [displace, isInside, buttons]);

  return (
    <div
      style={{
        position: 'absolute',
        width: 'auto',
        height: '100%',
        top: 0,
        left: '50%',
        transform: `
          translateX(-50%)
        `,
        ...style,
      }}
    >
      <ControlPanel
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1rem',
          right: '1rem',
        }}
      >
        <ZetaFader />
        <LambdaFader />
        <TesselationFader />
        <AmplitudeFader />
        <XSTFader />
        <YSTFader />
      </ControlPanel>

      <Graph
        ref={ref}
        style={{
          width: 'auto',
          height: '100%',
          ...graphStyle,
        }}
        withoutLines
      >
        <GraphAxes
          subdivisions={4}
          dashes={4}
          xOffset={panY}
          yOffset={panX}
        />

        <text
          x={75}
          y={25}
          style={{
            fontSize: '2px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {adding.current ? 'adding' : 'not'}
        </text>

        <text
          x={51}
          y={48}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {ZETA}
        </text>

        <text
          x={4}
          y={4}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {x}
        </text>
        <text
          x={4}
          y={8}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {y}
        </text>

        <text
          x={51}
          y={8}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {ZETA}
        </text>

        <text
          x={4}
          y={80}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {hitX}
        </text>
        <text
          x={4}
          y={84}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {hitY}
        </text>

        {hit ? (
          <circle
            cx={hitX}
            cy={hitY}
            r={3}
            fill={'rgb(255 255 0 / 1)'}
            stroke={'none'}
          />
        ): null}


        {points.current.map((p,i) => {
          const { id, coords } = p || {};
          const [x, y, z, frame] = coords || [];

          // const { coords: previousCoords } = points.current[i - 1] || {};
          // const [previousX, previousY] = previousCoords || [];

          const tesselations = getTess({
            A: [x, y],
            B: [50, 50],
            FLAGS: {
              POINT_INDEX: i
            }
          });

          return (
            <Fragment key={id}>
              {tesselations ? (
                <path
                  d={tesselations}
                  stroke={`hsl(${i} 50% 50% / 1)`}
                  fill={`none`}
                  vectorEffect={`non-scaling-stroke`}
                />
              ): null}

              <circle
                cx={x}
                cy={y}
                r={1}
                fill={`hsl(${i} 50% 50% / 1)`}
                stroke={`none`}
              />
            </Fragment>
          );
        })}

      </Graph>
    </div>
  );
};

