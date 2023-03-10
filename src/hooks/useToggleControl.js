import { useCallback, useState, useEffect, useMemo } from 'react';

export default function useToggleControl(props) {
  const {
    value: initial,
    label = '—',
    onChange = null
  } = props || {};
  const [value, setValue] = useState(initial);

  const onValueChange = useCallback(() => {
    setValue(val => !val);
  }, [setValue]);

  const control = useMemo(() => {
    return p => (
      <button
        type="button"
        onClick={onValueChange}
        {...p}
      >
        {label}
        {value ? 'on' : 'off'}
      </button>
    );
  }, [value, label, onChange]);

  return [value, control];
}

