import { output } from './interface.js';
import { colors, Color } from './colors.js';
import { createInterval, endInterval } from './interval.js';
import assert from 'node:assert';

export type TemplateFunction = (frame: string) => string;

export type PrintSpinnerOptions = {
  intervalMs?: number;
  templateFn?: TemplateFunction;
};

export type PrintDotsOptions = {
  intervalMs?: number;
  templateFn?: TemplateFunction;
};

export type PrintProgressAtIntervalOptions = {
  intervalMs?: number;
  templateFn?: TemplateFunction;
};

export type PrintFramesAtIntervalOptions = {
  frameColor?: Color;
};

export function printSpinner({
  intervalMs = 100,
  templateFn = (frame: string) => `Running ${frame}`,
}: PrintSpinnerOptions = {}): NodeJS.Timeout {
  const spinnerAnimation = ['|', '/', '-', '\\'];
  return printFramesAtInterval(spinnerAnimation.map(templateFn), intervalMs);
}

export function printDots({
  intervalMs = 100,
  templateFn = (frame: string) => `Running ${frame}`,
}: PrintDotsOptions = {}): NodeJS.Timeout {
  const dotsAnimation = ['.', '..', '...', '....'];
  return printFramesAtInterval(dotsAnimation.map(templateFn), intervalMs);
}

export function printProgressAtInterval({
  intervalMs = 100,
  templateFn = (frame: string) => `Progress: ${frame}%`,
}: PrintProgressAtIntervalOptions = {}): NodeJS.Timeout {
  const progressAnimation = Array.from({ length: 101 }, (_, i) => i.toString());
  return printFramesAtInterval(progressAnimation.map(templateFn), intervalMs);
}

export function printFramesAtInterval(
  frames: string[],
  intervalMs: number,
  options?: PrintFramesAtIntervalOptions,
): NodeJS.Timeout {
  assert(frames.length > 0, 'frames must not be empty');

  let i = 0;
  return createInterval(() => {
    if (i < 0) {
      i = 0;
    }

    if (i >= frames.length) {
      i = frames.length - 1;
    }

    const frame = frames[i];
    assert(frame, 'frame must not be empty');
    printStatus(options?.frameColor ? colors[options.frameColor](frame) : frame);
    i = (i + 1) % frames.length;
  }, intervalMs);
}

export function printProgress(
  templateFn: TemplateFunction = (n: string) => `Progress: ${n}%`,
): (progress: number) => void {
  return (progress: number) => {
    const frame = templateFn(progress.toFixed(0));
    printStatus(frame);
  };
}

export function endIntervalAndClearStatus(interval: NodeJS.Timeout): void {
  endInterval(interval);
  clearStatus();
}

function clearStatus(): void {
  output.clearLine(0);
  output.cursorTo(0);
}

function printStatus(value: string): void {
  output.clearLine(0);
  output.cursorTo(0);
  output.write(value);
}
