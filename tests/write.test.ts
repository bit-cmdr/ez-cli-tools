import { describe, it, expect, vi, beforeEach } from 'vitest';
import { write, writeLine, writeLines, writeBlankLine } from '../src/write.js';

vi.mock('../src/interface', () => ({
  output: {
    write: vi.fn(),
  },
}));

import { output } from '../src/interface.js';

describe('output writer functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should write a line without a newline character using write()', () => {
    const line = 'Hello, World!';
    write(line);
    expect(output.write).toHaveBeenCalledWith(line);
  });

  it('should write a line with a newline character using writeLine()', () => {
    const line = 'Hello, World!';
    writeLine(line);
    expect(output.write).toHaveBeenCalledWith(`${line}\n`);
  });

  it('should write an empty line with a newline character using writeLine()', () => {
    const line = '';
    writeLine(line);
    expect(output.write).toHaveBeenCalledWith('\n');
  });

  it('should write a line with special characters using writeLine()', () => {
    const line = 'Hello, \tWorld!\n';
    writeLine(line);
    expect(output.write).toHaveBeenCalledWith(`${line}\n`);
  });

  it('should write multiple lines with newline characters using writeLines()', () => {
    const lines = ['First line', 'Second line', 'Third line'];
    writeLines(lines);
    lines.forEach((line) => {
      expect(output.write).toHaveBeenCalledWith(`${line}\n`);
    });
  });

  it('should handle an empty array using writeLines()', () => {
    const lines: string[] = [];
    writeLines(lines);
    expect(output.write).not.toHaveBeenCalled();
  });

  it('should handle an array with one line using writeLines()', () => {
    const lines = ['Only one line'];
    writeLines(lines);
    expect(output.write).toHaveBeenCalledWith('Only one line\n');
  });

  it('should write multiple lines with special characters using writeLines()', () => {
    const lines = ['First line', 'Second line\twith tab', 'Third line\nwith newline'];
    writeLines(lines);
    lines.forEach((line) => {
      expect(output.write).toHaveBeenCalledWith(`${line}\n`);
    });
  });

  it('should write a blank line using writeBlankLine()', () => {
    writeBlankLine();
    expect(output.write).toHaveBeenCalledWith('\n');
  });
});
