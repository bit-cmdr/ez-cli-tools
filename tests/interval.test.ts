import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('node:timers', () => ({
  setInterval: vi.fn(),
  clearInterval: vi.fn(),
}));

import { setInterval, clearInterval } from 'node:timers';
import { createInterval, endInterval, endAllIntervals } from '../src/interval.js';

describe('interval', () => {
  beforeEach(() => {
    endAllIntervals();
    vi.clearAllMocks();
  });

  it('createInterval calls setInterval with the callback and ms and returns the handle', () => {
    const callback = vi.fn();
    const handle = {} as NodeJS.Timeout;
    vi.mocked(setInterval).mockReturnValue(handle);

    const result = createInterval(callback, 100);

    expect(setInterval).toHaveBeenCalledWith(callback, 100);
    expect(result).toBe(handle);
  });

  it('endInterval calls clearInterval with the handle', () => {
    const handle = {} as NodeJS.Timeout;
    vi.mocked(setInterval).mockReturnValue(handle);
    createInterval(vi.fn(), 100);
    vi.clearAllMocks();

    endInterval(handle);

    expect(clearInterval).toHaveBeenCalledWith(handle);
  });

  it('endAllIntervals calls clearInterval for every tracked interval', () => {
    const handle1 = { id: 1 } as unknown as NodeJS.Timeout;
    const handle2 = { id: 2 } as unknown as NodeJS.Timeout;
    vi.mocked(setInterval).mockReturnValueOnce(handle1).mockReturnValueOnce(handle2);
    createInterval(vi.fn(), 100);
    createInterval(vi.fn(), 200);
    vi.clearAllMocks();

    endAllIntervals();

    expect(clearInterval).toHaveBeenCalledWith(handle1);
    expect(clearInterval).toHaveBeenCalledWith(handle2);
  });

  it('createInterval throws when ms is 0', () => {
    expect(() => createInterval(vi.fn(), 0)).toThrow('ms must be positive');
  });

  it('createInterval throws when ms is negative', () => {
    expect(() => createInterval(vi.fn(), -1)).toThrow('ms must be positive');
  });
});
