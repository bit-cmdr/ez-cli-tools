import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export const input = stdin;
export const output = stdout;
export const readlineInterface = createInterface({ input, output });
