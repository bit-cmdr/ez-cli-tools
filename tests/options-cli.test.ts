import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventEmitter } from 'events';
import { select } from '../src/options-cli.js';
import type { ReadStream } from 'tty';

vi.mock('../src/interface', () => {
  const mockInput = new EventEmitter() as unknown as ReadStream;
  const mockOutput = { write: vi.fn() };
  const mockReadlineInterface = {
    write: vi.fn(),
    pause: vi.fn(),
    on: vi.fn(),
    close: vi.fn(),
    removeListener: vi.fn(),
  };

  return {
    input: mockInput,
    output: mockOutput,
    readlineInterface: mockReadlineInterface,
  };
});

import { readlineInterface, input } from '../src/interface.js';
import { colors } from '../src/colors.js';

describe('select', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the menu initially and resolve with selection when space and return is pressed', async () => {
    const question = 'Select an option:';
    const choices = ['Option 1', 'Option 2', 'Option 3'];

    const selectPromise = select(question, choices);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(1, question + '\n');
    expect(readlineInterface.write).toHaveBeenNthCalledWith(2, `     ${colors.blue('>')} [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(3, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(4, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'space' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(
      5,
      `     ${colors.blue('>')} ${colors.green('[*]')} ${choices[0]}\n`,
    );
    expect(readlineInterface.write).toHaveBeenNthCalledWith(6, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(7, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'return' });

    const result = await selectPromise;
    expect(result).toEqual(['Option 1']);
    expect(readlineInterface.pause).toHaveBeenCalled();
  });

  it('should render the menu initially and resolve with second selection when return is pressed', async () => {
    const question = 'Select an option:';
    const choices = ['Option 1', 'Option 2', 'Option 3'];

    const selectPromise = select(question, choices);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(1, question + '\n');
    expect(readlineInterface.write).toHaveBeenNthCalledWith(2, `     ${colors.blue('>')} [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(3, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(4, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(5, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(6, `     ${colors.blue('>')} [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(7, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(8, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(9, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(10, `     ${colors.blue('>')} [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(11, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(12, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(13, `     ${colors.blue('>')} [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'up' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(14, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(15, `     ${colors.blue('>')} [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(16, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'space' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(17, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(
      18,
      `     ${colors.blue('>')} ${colors.green('[*]')} ${choices[1]}\n`,
    );
    expect(readlineInterface.write).toHaveBeenNthCalledWith(19, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'return' });

    const result = await selectPromise;
    expect(result).toEqual(['Option 2']);
    expect(readlineInterface.pause).toHaveBeenCalled();
  });

  it('should render the menu initially and resolve with third selection when return is pressed', async () => {
    const question = 'Select an option:';
    const choices = ['Option 1', 'Option 2', 'Option 3'];

    const selectPromise = select(question, choices);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(1, question + '\n');
    expect(readlineInterface.write).toHaveBeenNthCalledWith(2, `     ${colors.blue('>')} [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(3, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(4, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(5, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(6, `     ${colors.blue('>')} [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(7, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(8, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(9, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(10, `     ${colors.blue('>')} [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'space' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(11, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(12, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(
      13,
      `     ${colors.blue('>')} ${colors.green('[*]')} ${choices[2]}`,
    );

    input.emit('keypress', '', { name: 'return' });

    const result = await selectPromise;
    expect(result).toEqual(['Option 3']);
    expect(readlineInterface.pause).toHaveBeenCalled();
  });

  it('should render the menu initially and resolve with three arrows down and selection when return is pressed', async () => {
    const question = 'Select an option:';
    const choices = ['Option 1', 'Option 2', 'Option 3'];

    const selectPromise = select(question, choices);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(1, question + '\n');
    expect(readlineInterface.write).toHaveBeenNthCalledWith(2, `     ${colors.blue('>')} [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(3, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(4, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(5, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(6, `     ${colors.blue('>')} [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(7, `       [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(8, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(9, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(10, `     ${colors.blue('>')} [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'down' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(11, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(12, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(13, `     ${colors.blue('>')} [ ] ${choices[2]}`);

    input.emit('keypress', '', { name: 'space' });
    expect(readlineInterface.write).toHaveBeenNthCalledWith(14, `       [ ] ${choices[0]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(15, `       [ ] ${choices[1]}\n`);
    expect(readlineInterface.write).toHaveBeenNthCalledWith(
      16,
      `     ${colors.blue('>')} ${colors.green('[*]')} ${choices[2]}`,
    );
    input.emit('keypress', '', { name: 'return' });

    const result = await selectPromise;
    expect(result).toEqual(['Option 3']);
    expect(readlineInterface.pause).toHaveBeenCalled();
  });
});
