import { useCallback, useState, useEffect, useMemo } from 'react';
import FaderControl from '../components/FaderControl';

export default function useFaderControl(props) {
  const {
    value: initial,
    label = '—',
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

  const control = useMemo( () => {
    return overrides => (
      <FaderControl
        label={label}
        min={min}
        max={max}
        step={step}
        current={value}
        onChange={onValueChange}
        {...overrides}
      />
    );
  }, [label, min, max, step, onValueChange]);

  return {
    value,
    control
  };
}

