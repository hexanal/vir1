import glob from 'glob';
import processChunk from './processChunk.js';
import { parseJsonAtPath } from 'zorg/files.js';

export default function processor(options) {
    const { src = null, log = false } = options || {};
    if (!src) return log && console.log(`missing chunky src path`);
    const paths = glob.sync(src, {}) || [];
    const rawChunks = paths.map(parseJsonAtPath);
    log && console.log({src, paths, rawChunks, options});
    return rawChunks.map(chunk => processChunk(chunk, options));
}
