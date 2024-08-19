// tests/eraseLines.test.ts
import { describe, it, expect, vi, afterEach } from 'vitest';
import { eraseLines } from '../src/eraser.js';
import { output } from '../src/interface.js';

vi.mock('../src/interface', () => {
  return {
    output: {
      write: vi.fn(),
    },
  };
});

describe('eraseLines', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mock history after each test
  });

  it('should erase one line', () => {
    eraseLines(1);
    expect(output.write).toHaveBeenCalledWith('\x1B[2K\x1B[0G');
  });

  it('should erase two lines', () => {
    eraseLines(2);
    expect(output.write).toHaveBeenCalledWith('\x1B[2K\x1B[1A\x1B[2K\x1B[0G');
  });

  it('should erase three lines', () => {
    eraseLines(3);
    expect(output.write).toHaveBeenCalledWith('\x1B[2K\x1B[1A\x1B[2K\x1B[1A\x1B[2K\x1B[0G');
  });

  it('should not erase any lines if n is zero', () => {
    eraseLines(0);
    expect(output.write).not.toHaveBeenCalled();
  });
});
