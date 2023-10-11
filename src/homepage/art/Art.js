import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Star from "../symbols/Star";

import useRaf from "../../hooks/useRaf";

function Art() {
  useEffect( () => {
    document.title = 'art';
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
      <Star
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
        }}
      >
        art
      </h1>
    </div>
  </div>
}

export default Art;

