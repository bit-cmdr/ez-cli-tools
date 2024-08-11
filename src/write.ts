import { output } from './interface.js';

export function write(line: string): void {
  output.write(line);
}

export function writeLine(line: string): void {
  write(`${line}\n`);
}

export function writeLines(lines: string[]): void {
  lines.forEach(writeLine);
}

export function writeBlankLine(): void {
  write('\n');
}
