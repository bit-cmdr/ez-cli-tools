/**
 * The standard input stream to use for reading user input.
 */
export declare const input: NodeJS.ReadStream & {
    fd: 0;
};
/**
 * The standard output stream to use for writing output.
 */
export declare const output: NodeJS.WriteStream & {
    fd: 1;
};
/**
 * The interface to use for reading user input and writing output.
 */
export declare const readlineInterface: import("node:readline/promises").Interface;
