import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  printSpinner,
  printDots,
  printProgressAtInterval,
  printFramesAtInterval,
  printProgress,
  endIntervalAndClearStatus,
} from '../src/progress.js';

vi.mock('../src/interface', () => ({
  output: {
    write: vi.fn(),
    clearLine: vi.fn(),
    cursorTo: vi.fn(),
  },
}));

vi.mock('../src/interval', () => ({
  createInterval: vi.fn(),
  endInterval: vi.fn(),
}));

import { output } from '../src/interface.js';
import { createInterval, endInterval } from '../src/interval.js';

describe('output printing functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should print spinner frames at the correct interval', () => {
    const intervalMock = { ref: vi.fn(), unref: vi.fn() };
    vi.mocked(createInterval).mockReturnValue(intervalMock as unknown as NodeJS.Timeout);

    const timeout = printSpinner({ intervalMs: 100 });
    const spinnerFrames = ['|', '/', '-', '\\'];

    expect(createInterval).toHaveBeenCalledWith(expect.any(Function), 100);

    const intervalFn = vi.mocked(createInterval).mock.calls[0]![0];
    spinnerFrames.forEach((frame) => {
      intervalFn();
      expect(output.clearLine).toHaveBeenCalled();
      expect(output.cursorTo).toHaveBeenCalledWith(0);
      expect(output.write).toHaveBeenCalledWith(`Running ${frame}`);
    });

    expect(timeout).toBe(intervalMock);
  });

  it('should print dots frames at the correct interval', () => {
    const intervalMock = { ref: vi.fn(), unref: vi.fn() };
    vi.mocked(createInterval).mockReturnValue(intervalMock as unknown as NodeJS.Timeout);

    const timeout = printDots({ intervalMs: 100 });
    const dotsFrames = ['.', '..', '...', '....'];

    expect(createInterval).toHaveBeenCalledWith(expect.any(Function), 100);

    const intervalFn = vi.mocked(createInterval).mock.calls[0]![0];
    dotsFrames.forEach((frame) => {
      intervalFn();
      expect(output.clearLine).toHaveBeenCalled();
      expect(output.cursorTo).toHaveBeenCalledWith(0);
      expect(output.write).toHaveBeenCalledWith(`Running ${frame}`);
    });

    expect(timeout).toBe(intervalMock);
  });

  it('should print progress at the correct interval', () => {
    const intervalMock = { ref: vi.fn(), unref: vi.fn() };
    vi.mocked(createInterval).mockReturnValue(intervalMock as unknown as NodeJS.Timeout);

    const timeout = printProgressAtInterval({ intervalMs: 100 });

    expect(createInterval).toHaveBeenCalledWith(expect.any(Function), 100);

    const intervalFn = vi.mocked(createInterval).mock.calls[0]![0];
    for (let i = 0; i <= 100; i++) {
      intervalFn();
      expect(output.clearLine).toHaveBeenCalled();
      expect(output.cursorTo).toHaveBeenCalledWith(0);
      expect(output.write).toHaveBeenCalledWith(`Progress: ${i}%`);
    }

    expect(timeout).toBe(intervalMock);
  });

  it('should print frames at a specified interval', () => {
    const intervalMock = { ref: vi.fn(), unref: vi.fn() };
    vi.mocked(createInterval).mockReturnValue(intervalMock as unknown as NodeJS.Timeout);

    const frames = ['frame1', 'frame2', 'frame3'];
    const timeout = printFramesAtInterval(frames, 100);

    expect(createInterval).toHaveBeenCalledWith(expect.any(Function), 100);

    const intervalFn = vi.mocked(createInterval).mock.calls[0]![0];
    frames.forEach((frame) => {
      intervalFn();
      expect(output.clearLine).toHaveBeenCalled();
      expect(output.cursorTo).toHaveBeenCalledWith(0);
      expect(output.write).toHaveBeenCalledWith(frame);
    });

    expect(timeout).toBe(intervalMock);
  });

  it('should print progress correctly when calling printProgress', () => {
    const printFn = printProgress((n) => `Progress: ${n}%`);

    printFn(50);
    expect(output.clearLine).toHaveBeenCalled();
    expect(output.cursorTo).toHaveBeenCalledWith(0);
    expect(output.write).toHaveBeenCalledWith('Progress: 50%');
  });

  it('should clear status and end the interval when calling endIntervalAndClearStatus', () => {
    const interval = { ref: vi.fn(), unref: vi.fn() } as unknown as NodeJS.Timeout;

    endIntervalAndClearStatus(interval);

    expect(endInterval).toHaveBeenCalledWith(interval);
    expect(output.clearLine).toHaveBeenCalledWith(0);
    expect(output.cursorTo).toHaveBeenCalledWith(0);
  });
});
