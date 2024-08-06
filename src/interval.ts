import { setInterval, clearInterval } from 'node:timers';

const intervals: Set<NodeJS.Timeout> = new Set();

export function createInterval(callback: () => void, ms: number): NodeJS.Timeout {
  const interval = setInterval(callback, ms);
  intervals.add(interval);
  return interval;
}

export function endInterval(interval: NodeJS.Timeout): void {
  clearInterval(interval);
  intervals.delete(interval);
}

export function endAllIntervals(): void {
  for (const interval of intervals) {
    clearInterval(interval);
  }
  intervals.clear();
}
