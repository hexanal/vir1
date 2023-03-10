import fs from 'fs';
import fse from 'fs-extra';

/**
 * @todo a lot of error management here!
 * tests? maybe...
 */
export function read(path) {
  const file = fs.readFileSync(path, 'utf8');
  const contents = file.toString();

  return contents;
}

export function parseJsonAtPath(path) {
  let json = {}

  try {
    json = JSON.parse(read(path));
  } catch(err) {
    console.error(`error parsing json`);
    console.error(err);
    console.error(`the thing i was trying to parse:`);
    console.error(json);
    console.trace();
    throw err;
  }

  return json;
}

export function copyFile(src, dest) {
  return fse.copy(src, dest)
    .catch(err => {
      console.error(err);
    });

}

export const write = function(destination, fileName, contents) {
  return fse.outputFile(`${destination}/${fileName}`, contents)
    .catch(err => console.log({destination, fileName, err}));
}
