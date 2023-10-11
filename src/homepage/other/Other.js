import { Link } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import Wave from "../symbols/Wave";

import useFaderControl from "../../hooks/useFaderControl";
import useRaf from "../../hooks/useRaf";

function Other() {
  useEffect( () => {
    document.title = 'other';
  }, []);

  return <div>
    <div
      style={{
        textAlign: 'center',
        transformStyle: 'preserve-3d',
        perspective: '1000',
        padding: '0 1rem',
      }}
    >
      <Wave
        style={{
          marginTop: '1rem',
          width: '15rem',
          height: '6rem',
        }}
      />

      <h1
        style={{
          fontSize: '5rem',
          fontWeight: '100',
          margin: 0,
          // textAlign: 'center',
        }}
      >
        other
      </h1>
    </div>

  </div>
}

export default Other;

