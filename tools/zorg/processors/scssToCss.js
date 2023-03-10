import sass from 'sass';
import { write } from 'zorg/files.js';

export default function compileSass(options) {
  const { src = null, dest = null, filename = null, log = false, sourceMap = false } = options || {};
  const compiledCSS = sass.renderSync({
    file: src,
    outputStyle: 'compressed',
    outFile: dest,
    sourceMap
  });
  const time = compiledCSS.stats.duration;

  return write(dest, filename, compiledCSS.css)
    .then( () => log && console.log( `styles: bundled css (from sass) ~~ ${time}ms`));
}
