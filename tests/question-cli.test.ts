import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ask } from '../src/question-cli.js';

vi.mock('../src/interface', () => ({
  readlineInterface: {
    question: vi.fn(),
    pause: vi.fn(),
  },
}));

import { readlineInterface } from '../src/interface.js';

describe('ask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should ask a question with a space appended and return the answer', async () => {
    const mockAnswer = 'Test Answer';
    const mockQuestion = 'What is your name?';

    vi.mocked(readlineInterface.question).mockResolvedValueOnce(mockAnswer);

    const result = await ask(mockQuestion);

    expect(readlineInterface.question).toHaveBeenCalledWith(`${mockQuestion} `);
    expect(result).toBe(mockAnswer);
    expect(readlineInterface.pause).toHaveBeenCalled();
  });
});
