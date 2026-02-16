/**
 * Creates an interval that calls the given callback every n milliseconds. The intervals are tracked internally as well.
 * @param {() => void} callback The code to execute every interval.
 * @param {number} ms The number of milliseconds to wait between each interval.
 * @returns {NodeJS.Timeout} object that can be used to clear the interval.
 */
export declare function createInterval(callback: () => void, ms: number): NodeJS.Timeout;
/**
 * Used to end a specified interval.
 * @param {NodeJS.Timeout} interval NodeJS.Timeout object that represents the interval to end.
 */
export declare function endInterval(interval: NodeJS.Timeout): void;
/**
 * Ends all intervals that were created.
 */
export declare function endAllIntervals(): void;
