import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

/**
 * The standard input stream to use for reading user input.
 */
export const input = stdin;

/**
 * The standard output stream to use for writing output.
 */
export const output = stdout;

/**
 * The interface to use for reading user input and writing output.
 */
export const readlineInterface = createInterface({ input, output });
