import { v4 as uuidv4 } from 'uuid';
import  {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';

import useRaf from '../../hooks/useRaf';
import useFaderControl from '../../hooks/useFaderControl';
import useToggleControl from '../../hooks/useToggleControl';
import useGamepads from '../../hooks/useGamepads';
import ControlPanel from '../../components/controls/ControlPanel';

import Graph from '../../components/viz/Graph';
import GraphAxes from '../../components/viz/GraphAxes';

const SYMBOL = {
  ALPHA: '𝜶',
  BETA: '𝜷',
  GAMMA: '𝜸',
  DELTA: '𝜹',
  EPSILON: '𝜺',
  ZETA: '𝜻',
};

export default function GamepadViz(props) {
  const {
    style = null,
    graphStyle = null,
  } = props || {};
  const { t, elapsed } = useRaf();

  const [ALPHA, AlphaFader] = useFaderControl({
    label: SYMBOL.ALPHA,
    value: 0.5,
    min: 0.0,
    max: 5,
    step: 0.01,
  });
  const [BETA, BetaFader] = useFaderControl({
    label: SYMBOL.BETA,
    value: 0.050,
    min: 0.000,
    max: 1,
    step: 0.001,
  });
  const [GAMMA, GammaFader] = useFaderControl({
    label: SYMBOL.GAMMA,
    value: 0.5,
    min: 0.0,
    max: 5,
    step: 0.01,
  });

  const { gamepads, getGamepadInputs } = useGamepads();
  const {
    leftStick = [0, 0],
    rightStick = [0, 0],

    triggerL2 = 0,
    triggerR2 = 0,

    buttonL1 = false,
    buttonR1 = false,

    buttonA = false,
    buttonB = false,
    buttonX = false,
    buttonY = false,

    dpadUp = false,
    dpadDown = false,
    dpadLeft = false,
    dpadRight = false,

    select = false,
    start = false,
    pad = false,
    power = false,
  } = getGamepadInputs(0) || {};

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
        hidden={false}
      >
        <AlphaFader />
        <BetaFader />
        <GammaFader />
      </ControlPanel>

      {/* left axes */}
      <Graph
        style={{
          width: 'auto',
          height: '100%',
          ...graphStyle,
        }}
        withoutLines
      >
        <GraphAxes
          subdivisions={2}
          dashes={2}
          xOffset={50}
          yOffset={50}
        />

        {/* left stick */}
        <circle
          cx={50 + leftStick[0] * 50}
          cy={50 + leftStick[1] * 50}
          r={2}
          stroke={`none`}
          fill={`rgb(64 64 255 / 1)`}
        />

        {/* right stick */}
        <circle
          cx={50 + rightStick[0] * 50}
          cy={50 + rightStick[1] * 50}
          r={2}
          stroke={`none`}
          fill={`rgb(240 128 32 / 1)`}
        />

        {/* L1 */}
        <circle
          cx={12.5}
          cy={37.5}
          r={2}
          stroke={`none`}
          fill={`rgb(0 0 0 / ${buttonL1 ? 1 : 0.25})`}
        />
        {/* left trigger */}
        <line
          x1={25}
          x2={25}
          y1={50}
          y2={50 - triggerL2 * 50}
          fill={`none`}
          strokeWidth={3}
          stroke={`rgb(25 122 122 / 1)`}
        />

        {/* R1 */}
        <circle
          cx={87.5}
          cy={37.5}
          r={2}
          stroke={`none`}
          fill={`rgb(0 0 0 / ${buttonR1 ? 1 : 0.25})`}
        />
        {/* right trigger */}
        <line
          x1={75}
          x2={75}
          y1={50}
          y2={50 - triggerR2 * 50}
          fill={`none`}
          strokeWidth={3}
          stroke={`rgb(66 255 16 / 1)`}
        />

        {/* button A (PS4 “x”) */}
        <circle
          cx={75}
          cy={87.5}
          r={2}
          stroke={`none`}
          fill={`rgb(0 0 255 / ${buttonA ? 1 : 0.25})`}
        />
        {/* button B (PS4 “circle”) */}
        <circle
          cx={87.5}
          cy={75}
          r={2}
          stroke={`none`}
          fill={`rgb(255 0 0 / ${buttonB ? 1 : 0.25})`}
        />
        {/* button X (PS4 “square”) */}
        <circle
          cx={62.5}
          cy={75}
          r={2}
          stroke={`none`}
          fill={`rgb(64 255 100 / ${buttonX ? 1 : 0.25})`}
        />
        {/* button Y (PS4 “triangle”) */}
        <circle
          cx={75}
          cy={62.5}
          r={2}
          stroke={`none`}
          fill={`rgb(255 0 255 / ${buttonY ? 1 : 0.25})`}
        />

        <circle
          cx={25}
          cy={62.5}
          r={2}
          stroke={`none`}
          fill={`rgb(0 0 0 / ${dpadUp ? 1 : 0.25})`}
        />
        <circle
          cx={25}
          cy={87.5}
          r={2}
          stroke={`none`}
          fill={`rgb(0 0 0 / ${dpadDown ? 1 : 0.25})`}
        />
        <circle
          cx={12.5}
          cy={75}
          r={2}
          stroke={`none`}
          fill={`rgb(0 0 0 / ${dpadLeft ? 1 : 0.25})`}
        />
        <circle
          cx={37.5}
          cy={75}
          r={2}
          stroke={`none`}
          fill={`rgb(0 0 0 / ${dpadRight ? 1 : 0.25})`}
        />
      </Graph>
    </div>
  );
};

