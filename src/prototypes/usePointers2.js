import { useState, useEffect } from 'react';

const usePointers = () => {
  const [pointers, setPointers] = useState({});
  const [primaryPointer, setPrimaryPointer] = useState(null);
  const [mouseButtons, setMouseButtons] = useState(null);

  const handlePointerDown = (e) => {
    e.preventDefault();
    const { pointerId, clientX, clientY, pointerType } = e;
    const newPointers = {
      ...pointers,
      [pointerId]: { x: clientX, y: clientY },
    };
    setPointers(newPointers);
    setPrimaryPointer({ id: pointerId, type: pointerType, x: clientX, y: clientY });
    if (pointerType === 'mouse') {
      setMouseButtons((buttons) => new Set([...buttons, e.button === 0 ? 'left' : 'right']));
    }
  };

  const handlePointerMove = (e) => {
    const { pointerId, clientX, clientY } = e;
    const newPointers = {
      ...pointers,
      [pointerId]: { x: clientX, y: clientY },
    };
    setPointers(newPointers);
    if (primaryPointer && primaryPointer.id === pointerId) {
      setPrimaryPointer((prev) => ({ ...prev, x: clientX, y: clientY }));
    }
  };

  const handlePointerUp = (e) => {
    const { pointerId, pointerType } = e;
    const { [pointerId]: removed, ...rest } = pointers;
    setPointers(rest);
    if (primaryPointer && primaryPointer.id === pointerId) {
      const newPrimary = Object.values(rest).find((pointer) => pointer.type === primaryPointer.type);
      setPrimaryPointer(newPrimary || null);
    }
    if (pointerType === 'mouse') {
      setMouseButtons((buttons) => buttons.filter((button) => (e.button === 0 ? button !== 'left' : button !== 'right')));
    }
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [pointers, primaryPointer, mouseButtons]);

  return { pointers, primaryPointer, mouseButtons };
};

export default usePointers;

