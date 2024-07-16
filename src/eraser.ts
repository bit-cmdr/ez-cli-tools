import { output } from './interface.js';

export function eraseLines(n: number): void {
  let eraser = '';
  for (let i = 0; i < n; i++) {
    eraser += `\x1B[2K${i < n - 1 ? '\x1B[1A' : ''}`;
  }
  eraser += '\x1B[0G';
  output.write(eraser);
}
