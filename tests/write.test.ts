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

  it('should write multiple lines with newline characters using writeLines()', () => {
    const lines = ['First line', 'Second line', 'Third line'];
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
