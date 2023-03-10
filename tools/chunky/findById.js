import glob from 'glob';
import { parseJsonAtPath } from 'zorg/files.js';

export default function findChunkById(id, options) {
    const { src = '' } = options || {};
    const all = glob.sync(src); // @todo?
    const allChunks = all.map(parseJsonAtPath);
    const found = allChunks
      .find(chunkData => {
        const { id: chunkId = null } = chunkData || {};
        if (!chunkId) return false;
  
        return chunkId === id;
      });
  
    return found;
}