import { useState, useCallback, useEffect } from 'react';

export default function useMidi(settings) {
  const [midi, setMidi] = useState(null);  // global MIDIAccess object
  const [currentInput, setCurrentInput] = useState(null);  // global MIDIAccess object
  // const [inputs, setInputs] = useState(null);  // global MIDIAccess object

  // const listInputsAndOutputs = useCallback(() => {
  //   if (inputs === null) return;

  //   for (const entry of inputs) {
  //     const input = entry[1];
  //     console.log(`Input port [type:'${input.type}']` +
  //       ` id:'${input.id}'` +
  //       ` manufacturer:'${input.manufacturer}'` +
  //       ` name:'${input.name}'` +
  //       ` version:'${input.version}'`);
  //   }

  //   for (const entry of midi.outputs) {
  //     const output = entry[1];
  //     console.log(`Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`);
  //   }
  // }, [midi, inputs]);

  // const startLoggingMIDIInput = useCallback( () => {
  //   if (inputs === null) return;

  //   inputs.forEach((entry) => {entry.onmidimessage = onMIDIMessage;});
  // }, [inputs]);

  const onMIDIMessage = useCallback((event) => {
    let d = [];
    for (const character of event.data) {
      d.push(`0x${character.toString(16)}`);
    }
    setCurrentInput(d);
  }, [setCurrentInput]);

  const onSuccess = useCallback(access => {
    setMidi(access);

    if (access.inputs) {
      console.log('has inputs');
      access.inputs.forEach((entry) => {
        console.log(entry, 'entry');
        entry.onmidimessage = onMIDIMessage;
      });
    }

    // listInputsAndOutputs(access);
    // startLoggingMIDIInput(access);
  }, [setMidi]);

  const onError = useCallback(access => {
    console.error(`Failed to get MIDI access - ${msg}`);
    setMidi(null);
  }, [setMidi]);

  useEffect(() => {
    navigator.requestMIDIAccess().then(onSuccess, onError);
  }, [onSuccess, onError]);

  return {
    midi,
    currentInput,
  };
}

