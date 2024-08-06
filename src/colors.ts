export const colors = {
  red: colorize(31),
  green: colorize(32),
  blue: colorize(34),
  yellow: colorize(33),
  magenta: colorize(35),
  cyan: colorize(36),
  white: colorize(37),
  black: colorize(30),
  gray: colorize(90),
  grey: colorize(90),
};

export type Color = keyof typeof colors;

function colorize(color: number): (text: string) => string {
  return (text: string) => {
    return `\x1b[${color}m${text}\x1b[0m`;
  };
}
