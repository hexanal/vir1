import toComponentCore from './toComponent.js';

let COMPONENTS = [];

export function useComponents(components) {
    COMPONENTS = components;
}

export function toComponent(chunkData, props) {
    return toComponentCore(chunkData, props, COMPONENTS);
}

export { ping, pong, unpong } from './pinger.js';
export { default as findById } from './findById.js';
export { default as processChunk } from './processChunk.js';
export { default as processor } from './processor.js';
export { default as toHtml } from './toHtml.js';
export { default as uuid } from './uuid.js';
