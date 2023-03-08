import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useMemo } from 'react';

import C001 from './C001';

export default function C002(props) {
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
        <C001
          color="rgb(255 0 0 / 1)"
          multiplier={0.1}
        />
      </div>
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
        <C001
          color="rgb(0 0 255 / 1)"
          multiplier={10}
        />
      </div>
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
        <C001
          color="rgb(0 255 255 / 1)"
          multiplier={15}
        />
      </div>
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
        <C001
          color="rgb(255 0 255 / 1)"
          multiplier={2}
        />
      </div>
    </>
  );
};
