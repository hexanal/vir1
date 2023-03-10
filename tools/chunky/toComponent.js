import React from 'react';

/**
 * takes a `components` object, and returns a React component that represents it
 * @todo document
 * 
 * @param {chunkData} object the chunk data as `chunkData`, to match React's nomenclature
 * @returns a react element representing the chunk
 */
// @critical
// @todo otherProps is there to be able to propagate events and stuff, but
// I need to eventually just stick everything in the props/chunk data
export default function toComponent(chunk, props = {}, components = []) {
    return Array.isArray(chunk)
        ? chunk.map(c => output(c, props, components))
        : output(chunk, props, components);
}

function output(chunk, props = {}, components) {
    if (!chunk) return false;

    const {
        type = null,
        context: propsContext = null
     } = chunk || {};
    const { 
        context: contextOverride = null
    } = props || {};

    if (!type) {
        // @todo maybe prune all the non-chunks higher-up in the chain
        console.error(`not a chunk! it has no 'type'!`);
        return false;
    }

    const found = Object.values(components).find(c => {
        return c.type === type;
    });

    if (!found) {
        console.error(`no chunk found of type: '${chunk.type}'`); // couldn't find an associated components
        return false;
    }

    const context = propsContext || contextOverride || 'view'; // @todo configurable "default" context
    const Component = found[context];

    if (!Component) {
        console.error(`no context '${context}' found for chunk type '${type}.`);
        return false;
    }

    if (typeof Component !== 'function') {
        console.error(`chunk component for context '${context}' is not a function`);
        return false;
    }

    return React.createElement(
        Component,
        { 
            key: chunk.id || '~~',
            ...chunk,
            ...props
        },
        null
    );
}