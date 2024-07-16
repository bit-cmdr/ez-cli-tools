import { readlineInterface } from './interface.js';

export async function ask(question: string): Promise<string> {
  return readlineInterface.question(question + ' ');
}
