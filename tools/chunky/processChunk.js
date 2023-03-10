import findById from './findById.js';
import toHtml from './toHtml.js';

export default function processChunk(chunk, options) {
    const { type = '', url = null, chunks = null } = chunk || {};

    let processed = {...chunk};

    if (type === 'ref') {
        const { id = '' } = chunk || {};
        const reference = findById(id, options);

        processed = reference;
    }

    if (chunks) {
        processed = {
            ...processed,
            chunks: chunks.map(c => processChunk(c, options))
        };
    }

    if (url) {
        return toHtml(processed, options);
    }

    return processed;
}
