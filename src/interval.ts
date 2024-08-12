import { setInterval, clearInterval } from 'node:timers';

const intervals: Set<NodeJS.Timeout> = new Set();

/**
 * Creates an interval that calls the given callback every n milliseconds. The intervals are tracked internally as well.
 * @param {() => void} callback The code to execute every interval.
 * @param {number} ms The number of milliseconds to wait between each interval.
 * @returns {NodeJS.Timeout} object that can be used to clear the interval.
 */
export function createInterval(callback: () => void, ms: number): NodeJS.Timeout {
  const interval = setInterval(callback, ms);
  intervals.add(interval);
  return interval;
}

/**
 * Used to end a specified interval.
 * @param {NodeJS.Timeout} interval NodeJS.Timeout object that represents the interval to end.
 */
export function endInterval(interval: NodeJS.Timeout): void {
  clearInterval(interval);
  intervals.delete(interval);
}

/**
 * Ends all intervals that were created.
 */
export function endAllIntervals(): void {
  for (const interval of intervals) {
    clearInterval(interval);
  }
  intervals.clear();
}
