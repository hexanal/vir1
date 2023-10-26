import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Star from "../symbols/Star";
import Diamond from "../Diamond";

import useRaf from "../../hooks/useRaf";

import LANDSCAPES from './LANDSCAPES.json';
import BENDS from './BENDS.json';

import "./Art.css";

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
        padding: '8rem 1rem 0',
      }}
    >
      <h1
        style={{
          fontSize: 0,
          height: 0,
          margin: 0,
        }}
      >
        art
      </h1>

      <div>
        <p><small>this page is under <em style={{
          display: 'inline-block',
          fontSize: '1.5rem',
          fontWeight: '900',
          transform: 'rotate(2deg) translateY(0.25rem)'
        }}>heavy</em> construction!</small></p>

        <Diamond />

        <h2>BENDS</h2>

        <div
          className="Art__image-grid"
        >
          {BENDS.map( (l, i) => {
            const {
              path,
              filename,
              file_size
            } = l || {};
            return (
              <img key={path} src={path} alt={`BENDS image series ${i}/${LANDSCAPES.length}`} />
            );
          })}
        </div>

        <Diamond />

        <h2>LANDSCAPES</h2>

        <div
          className="Art__image-grid"
        >
          {LANDSCAPES.map( (l, i) => {
            const {
              path,
              filename,
              file_size
            } = l || {};
            return (
              <img key={path} src={path} alt={`LANDSCAPES image series ${i}/${LANDSCAPES.length}`} />
            );
          })}
        </div>
      </div>
    </div>
  </div>
}

export default Art;

