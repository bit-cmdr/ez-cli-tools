import { output } from './interface.js';

/**
 * Writes a line to the output stream without a newline character unless specified.
 * @param line The line to write.
 */
export function write(line: string): void {
  output.write(line);
}

/**
 * Writes a line to the output stream with a newline character automatically appended to the end.
 * @param line The line to write.
 */
export function writeLine(line: string): void {
  write(`${line}\n`);
}

/**
 * Writes multiple lines to the output stream with a newline character automatically appended to the end of each line.
 * @param lines The lines to write.
 */
export function writeLines(lines: string[]): void {
  lines.forEach(writeLine);
}

/**
 * Writes a blank line to the output stream.
 */
export function writeBlankLine(): void {
  write('\n');
}