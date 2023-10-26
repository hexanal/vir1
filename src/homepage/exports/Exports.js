import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Star from "../symbols/Star";
import Diamond from "../Diamond";

import "./Exports.css";

function Exports() {
  useEffect( () => {
    document.title = 'exports';
  }, []);

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          transformStyle: 'preserve-3d',
          perspective: '1000',
          padding: '1rem 1rem 0',
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          exports
        </h1>

        <div>
          <p>publically available exports</p>

          <Diamond />

          <h2>early draft — current project</h2>
          <p><a href="/EXPORTS/THE_ASYM_20231019.zip">THE_ASYM_20231019.zip</a></p>

          <Diamond />

          <h2>old songs</h2>
          <h3>as <em>hexanal</em></h3>
          <p><a href="/EXPORTS/OLDIES/2027.mp3">2027</a></p>
          <h3>as <em>pigfreezer</em></h3>
          <p><a href="/EXPORTS/OLDIES/HCG 87 Cluster.mp3">HCG 87 Cluster</a></p>
          <p><a href="/EXPORTS/OLDIES/Early Earth.mp3">Early Earth</a></p>
          <p><a href="/EXPORTS/OLDIES/The Pigdom, Final.mp3">The Pigdom, Final</a></p>
          <p><a href="/EXPORTS/OLDIES/Seek, Kill.mp3">Seek, Kill</a></p>

          <Diamond />
        </div>
      </div>
    </div>
  );
}

export default Exports;

