
export default function grid({
  cols,
  rows,
  processor = n => n
}) {
  let items = [];

  for (let i = 0; i <= rows; i++) {
    for(let j = 0; j <= cols; j++) {
      const coords = [i, j];
      items.push({
        coords,
        value: processor(coords)
      });
    }
  }

  return items;
}

