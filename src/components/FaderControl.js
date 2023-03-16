import { useCallback, useState } from 'react';

export default function FaderControl(props) {
  const {
    label = '—', // NOTE deprecated
    unit = null,
    min = 0,
    max = 100,
    step = 1,
    current: initialCurrent = null,
    onChange = null
  } = props || {};
  const [current, setCurrent] = useState(initialCurrent);

  const onValueChange = useCallback(e => {
    const { target } = e;
    const { value } = target || {};
    const newCurrent = parseFloat(value);

    setCurrent(newCurrent);

    if (typeof onChange === 'function') {
      onChange(newCurrent);
    }
  }, [setCurrent, onChange]);

  return (
    <div
      style={{
        fontSize: '0.8rem',
        display: 'inline-block',
      }}
    >

      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '5rem',
            color: 'rgb(255 255 255 / 1)',
            backgroundColor: 'rgb(0 0 0 / 1)',
          }}
        >
          {current}
        </div>

        {unit !== null ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 0.5rem',
              backgroundColor: 'rgb(0 0 0 / 0.05)',
              borderTop: `1px solid rgb(0 0 0 / 0.5)`,
              borderBottom: `1px solid rgb(0 0 0 / 0.5)`,
            }}
          >
            {unit}
          </div>
        ): null}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '5rem',
            color: 'rgb(255 255 255 / 1)',
            backgroundColor: 'rgb(255 64 0 / 1)',
          }}
        >
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={current}
            onInput={onValueChange}
            style={{
              width: '5rem',
              height: '1.5rem',
              // appearance: 'none',
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            // preserveAspectRatio="none"
            style={{
              display: 'none', // TODO
              width: '5rem',
              height: '1.5rem',
              // stroke: 'rgb(0 0 0 / 1)',
              // strokeWidth: '1px',
            }}
          >
          </svg>
        </div>
      </div>
    </div>
  );
}

