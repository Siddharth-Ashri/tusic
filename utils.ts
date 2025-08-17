export function loadConfiguration() {
  return {defaultDir: null};
}

export function center(term, message) {
  const columns = term.width;
  const startpt =  Math.floor((columns / 2) - (message.length / 2));
  const topPadding = 10
  term.moveTo(startpt, topPadding, message);
}

export function centerAscii(term, art) {
// Split ASCII art into lines
const lines: string[] = art.trim().split('\n');
  // determine the length of the longest line
  const {width, height} = term;
  const startY = Math.floor((height - lines.length) / 2);
  
  lines.forEach((line, index) => {
    const x = Math.floor((width - line.length) / 2)
    // without the Y co-ordinate we would overwrite the ASCII drawing eachtime on the same y position
    const y = startY + index
    term.moveTo(x, y, line)
  });
}

