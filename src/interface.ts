import { createInterface } from 'node:readline/promises';

export const input = process.stdin;
export const output = process.stdout;
export const readlineInterface = createInterface({ input, output });
