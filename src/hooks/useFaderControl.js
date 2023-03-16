import { useCallback, useState, useEffect, useMemo } from 'react';
import FaderControl from '../components/FaderControl';

export default function useFaderControl(props) {
  const {
    value: initial,
    label = '—',
    unit = null,
    min = 0,
    max = 100,
    step = 1,
    onChange = null
  } = props || {};
  const [value, setValue] = useState(initial);

  const onValueChange = useCallback(val => {
    setValue(val);
  }, [setValue]);

  // TODO?
  // useEffect(() => {
  //   onValueChange(initial);
  // }, [initial]);

  // useStyles?!
  const control = useMemo( () => {
    return overrides => (
      <div
        style={{
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {label !== null ? (
            <div
              style={{
                padding: '0 0.5rem',
                backgroundColor: 'rgb(0 0 0 / 0.05)',
                borderTop: `1px solid rgb(0 0 0 / 0.5)`,
                borderBottom: `1px solid rgb(0 0 0 / 0.5)`,
              }}
            >
              {label}
            </div>
          ):null}
        </div>

        <FaderControl
          unit={unit}
          min={min}
          max={max}
          step={step}
          current={value}
          onChange={onValueChange}
          {...overrides}
        />
      </div>
    );
  }, [label, min, max, step, onValueChange]);

  return [value, control];
}

