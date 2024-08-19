import { describe, it, expect } from 'vitest';
import { colors } from '../src/colors.js';

describe('colors', () => {
  it('should colorize text red', () => {
    const result = colors.red('test');
    expect(result).toBe('\x1b[31mtest\x1b[0m');
  });

  it('should colorize text green', () => {
    const result = colors.green('test');
    expect(result).toBe('\x1b[32mtest\x1b[0m');
  });

  it('should colorize text blue', () => {
    const result = colors.blue('test');
    expect(result).toBe('\x1b[34mtest\x1b[0m');
  });

  it('should colorize text yellow', () => {
    const result = colors.yellow('test');
    expect(result).toBe('\x1b[33mtest\x1b[0m');
  });

  it('should colorize text magenta', () => {
    const result = colors.magenta('test');
    expect(result).toBe('\x1b[35mtest\x1b[0m');
  });

  it('should colorize text cyan', () => {
    const result = colors.cyan('test');
    expect(result).toBe('\x1b[36mtest\x1b[0m');
  });

  it('should colorize text white', () => {
    const result = colors.white('test');
    expect(result).toBe('\x1b[37mtest\x1b[0m');
  });

  it('should colorize text black', () => {
    const result = colors.black('test');
    expect(result).toBe('\x1b[30mtest\x1b[0m');
  });

  it('should colorize text gray', () => {
    const result = colors.gray('test');
    expect(result).toBe('\x1b[90mtest\x1b[0m');
  });

  it('should colorize text grey', () => {
    const result = colors.grey('test');
    expect(result).toBe('\x1b[90mtest\x1b[0m');
  });
});
