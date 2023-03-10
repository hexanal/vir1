import { copyFile } from '../files.js';

export default function copyFilesFromOptions(options) {
  const { src, dest, log = false } = options || {};

  if (log) {
    console.log(`
  copying from: ${src}
  copying to: ${dest}
    `);
  }

  return copyFile(src, dest);
}
