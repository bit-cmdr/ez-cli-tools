/**
 * A collection of color functions that can be used to colorize text for the output stream.
 * This assumes that the output stream supports ANSI color codes.
 */
export declare const colors: {
    red: (text: string) => string;
    green: (text: string) => string;
    blue: (text: string) => string;
    yellow: (text: string) => string;
    magenta: (text: string) => string;
    cyan: (text: string) => string;
    white: (text: string) => string;
    black: (text: string) => string;
    gray: (text: string) => string;
    grey: (text: string) => string;
};
/**
 * The available colors to use for text.
 */
export type Color = keyof typeof colors;
