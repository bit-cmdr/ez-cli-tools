import { readlineInterface } from './interface.js';

/**
 * Asks a question and returns the user's input.
 * @param {string} question The question to ask the user. A space will be appended to the end of the question.
 * @returns The user's input.
 */
export async function ask(question: string): Promise<string> {
  return readlineInterface.question(question + ' ');
}
