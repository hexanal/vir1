import { useCallback, useState, useEffect, useRef } from 'react';
// import useAudioContext from './useAudioContext';

let audioCtx;
let oscillator;
let gainEnvelope;

let attackTime = 0.25;
let decayTime = 0;
let sustainLevel = 1;
let releaseTime = 0.85;

// Define a function to trigger the envelope
function triggerEnvelope(env) {
  const now = audioCtx.currentTime;
  env.gain.cancelScheduledValues(now);
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(1, now + attackTime);
  env.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
}

// Define a function to release the envelope
function releaseEnvelope(env) {
  const now = audioCtx.currentTime;
  env.gain.cancelScheduledValues(now);
  env.gain.setValueAtTime(gainEnvelope.gain.value, now);
  env.gain.linearRampToValueAtTime(0, now + releaseTime);
}

function createAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // Create an oscillator
  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);

  // Create an envelope for the gain
  gainEnvelope = audioCtx.createGain();
  gainEnvelope.gain.setValueAtTime(0, audioCtx.currentTime);

  // Connect the oscillator to the gain envelope
  oscillator.connect(gainEnvelope);

  // Connect the gain envelope to the AudioContext destination
  gainEnvelope.connect(audioCtx.destination);

  // Start the oscillator
  oscillator.start();
}

export default function useSynth(props) {
  const {
    volume = 0.5,
    cutoff = 0.5,
    envelope = null,
    notes = [],
  } = props || {};
  const { currentTime = null } = audioCtx || {};

  useEffect(() => {
    if (currentTime !== null) {
      oscillator.frequency.setValueAtTime(440 + Math.sin(audioCtx.currentTime * 100) * 10, audioCtx.currentTime);
    }
  }, [currentTime]);

  useEffect(() => {
    if (!oscillator || !audioCtx) {
      return;
    }

    if (notes.length > 0) {
      triggerEnvelope(gainEnvelope);
    } else {
      releaseEnvelope(gainEnvelope);
    }
  }, [notes, volume]);

  useEffect(() => {
    function create() {
      if (!audioCtx) {
        createAudio();
      }
    }
    document.addEventListener('pointerdown', create);

    return () => {
      document.removeEventListener('pointerdown', create);
    }
  }, []);

  // const playNote = useCallback( (note) => {
  //   FX_GAIN.gain.setValueAtTime(0.25, CTX.currentTime);
  //   OSC1.start();
  // }, []);

  // const stopNote = useCallback( () => {
  //   FX_GAIN.gain.setValueAtTime(0.25, CTX.currentTime);
  //   OSC1.start();
  // }, []);

  return {
    synth: 'yo'
  };
}

