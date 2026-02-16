/**
 * Writes a line to the output stream without a newline character unless specified.
 * @param {string} line The line to write.
 */
export declare function write(line: string): void;
/**
 * Writes a line to the output stream with a newline character automatically appended to the end.
 * @param {string} line The line to write.
 */
export declare function writeLine(line: string): void;
/**
 * Writes multiple lines to the output stream with a newline character automatically appended to the end of each line.
 * @param {string[]} lines The lines to write.
 */
export declare function writeLines(lines: string[]): void;
/**
 * Writes a blank line to the output stream.
 */
export declare function writeBlankLine(): void;
