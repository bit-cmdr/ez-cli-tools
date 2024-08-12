import { output } from './interface.js';

const ESC = '\x1B'; // escape character
const CSI = `${ESC}[`; // control sequence introducer

/**
 * Erases the specified number of lines from the output stream.
 * @param {number} n The number of lines to erase.
 */
export function eraseLines(n: number): void {
  let eraser = '';
  for (let i = 0; i < n; i++) {
    eraser += `${CSI}2K${i < n - 1 ? `${CSI}1A` : ''}`;
  }
  eraser += `${CSI}0G`;
  output.write(eraser);
}
