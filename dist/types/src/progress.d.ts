import type { Color } from './colors.js';
/**
 * String template function that takes a frame and returns a string. ex. (frame: string) => `Running ${frame}`
 */
export type TemplateFunction = (frame: string) => string;
/**
 * Options for printing a spinner.
 * @property {number} [intervalMs=100] The interval in milliseconds to print each frame.
 * @property {TemplateFunction} [templateFn=(frame: string) => `Running ${frame}`] The template function to use for each frame.
 */
export type PrintSpinnerOptions = {
    intervalMs?: number;
    templateFn?: TemplateFunction;
};
/**
 * Options for printing dots.
 * @property {number} [intervalMs=100] The interval in milliseconds to print each frame.
 * @property {TemplateFunction} [templateFn=(frame: string) => `Running ${frame}`] The template function to use for each frame.
 */
export type PrintDotsOptions = {
    intervalMs?: number;
    templateFn?: TemplateFunction;
};
/**
 * Options for printing progress.
 * @property {number} [intervalMs=100] The interval in milliseconds to print each frame.
 * @property {TemplateFunction} [templateFn=(frame: string) => `Progress: ${frame}%`] The template function to use for each frame.
 */
export type PrintProgressAtIntervalOptions = {
    intervalMs?: number;
    templateFn?: TemplateFunction;
};
/**
 * Options for printing frames at an interval.
 * @property {Color} [frameColor] The Color to use for the frame.
 */
export type PrintFramesAtIntervalOptions = {
    frameColor?: Color;
};
/**
 * Prints a spinner to the output stream and returns a NodeJS.Timeout object that can be used to end the spinner.
 * Note: Printing anything to the output stream will have unexpected results.
 * @param {PrintSpinnerOptions} [param0={ intervalMs: 100, templateFn: (frame: string) => `Running ${frame}`}] The options for printing the spinner.
 * @returns {NodeJS.Timeout} object that can be used to end the spinner.
 */
export declare function printSpinner({ intervalMs, templateFn, }?: PrintSpinnerOptions): NodeJS.Timeout;
/**
 * Prints dots to the output stream and returns a NodeJS.Timeout object that can be used to end the dots.
 * Note: Printing anything to the output stream will have unexpected results.
 * @param {PrintDotsOptions} [param0={ intervalMs: 100, templateFn: (frame: string) => `Running ${frame}`}] The options for printing the dots.
 * @returns {NodeJS.Timeout} object that can be used to end the dots.
 */
export declare function printDots({ intervalMs, templateFn, }?: PrintDotsOptions): NodeJS.Timeout;
/**
 * Prints progress to the output stream and returns a function that can be used to update the progress.
 * Note: Printing anything to the output stream will have unexpected results.
 * @param {PrintProgressAtIntervalOptions} [param0={ intervalMs: 100, templateFn: (frame: string) => `Running ${frame}`}] The options for printing the progress.
 * @returns {NodeJS.Timeout} object that can be used to end the progress.
 */
export declare function printProgressAtInterval({ intervalMs, templateFn, }?: PrintProgressAtIntervalOptions): NodeJS.Timeout;
/**
 * Prints frames to the output stream at an interval and returns a NodeJS.Timeout object that can be used to end the frames.
 * Note: Printing anything to the output stream will have unexpected results.
 * @param {string[]} frames The frames to print, this is an array of strings like `['.', '..', '...']`.
 * @param {number} intervalMs The interval in milliseconds to print each frame.
 * @param {PrintFramesAtIntervalOptions} [options] The options for printing the frames.
 * @returns {NodeJS.Timeout} object that can be used to end the frames.
 */
export declare function printFramesAtInterval(frames: string[], intervalMs: number, options?: PrintFramesAtIntervalOptions): NodeJS.Timeout;
/**
 * Create a function that prints the progress to the output stream. Expects to be called with a new number between 0 and 100 each time you want the progress to be updated.
 * @param {TemplateFunction} [templateFn=(n: string) => `Progress: ${n}%`] Template function that takes a number and returns a string. Defaults to (n: number) => `Progress: ${n}%`
 * @returns {(progress: number) => void} A function that accepts the progress as a number between 0 and 100 to be printed to the output stream.
 */
export declare function printProgress(templateFn?: TemplateFunction): (progress: number) => void;
/**
 * Ends the specified interval and clears the progress from the output stream.
 * @param {NodeJS.Timeout} interval object that represents the interval to end.
 */
export declare function endIntervalAndClearStatus(interval: NodeJS.Timeout): void;
