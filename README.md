# EZ CLI Tools

A Typescript first CLI tools for Node.js with zero dependencies. Easy to use to get command line input from questions and generating lists of options that the user can select from.

[![npm](https://img.shields.io/npm/v/ez-cli-tools)](https://www.npmjs.com/package/ez-cli-tools)
[![npm](https://img.shields.io/npm/dt/ez-cli-tools)](https://www.npmjs.com/package/ez-cli-tools)
[![GitHub](https://img.shields.io/github/license/bit-cmdr/ez-cli-tools)](https://github.com/bit-cmdr/ez-cli-tools/blob/main/LICENSE)

## Installation

### NPM

```sh
npm install ez-cli-tools
```

### Yarn

```sh
yarn add ez-cli-tools
```

### PNPM

```sh
pnpm add ez-cli-tools
```

## Usage

- [Writing](docs/write.md)
- [Questions](docs/question.md)
- [Single Select](docs/single-select.md)
- [Multi Select](docs/multi-select.md)
- [Progress](docs/progress.md)

### Brief Example

```ts
import { writeLine, ask, select, printSpinner, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

(async () => {
  const name = await ask('What is your name?');
  writeLine(`Hello ${name}`);
  const game = await select('Shall we play a game?', ['Checkers', 'Chess', 'Tic-Tac-Toe', 'Global Thermonuclear War']);
  writeLine(`Great! Let's play ${game}`);
  const intervalId = printSpinner();
  await setTimeout(10000); // Normally you would be doing a long running operation here, which is why you would show a spinner
  endIntervalAndClearStatus(intervalId);
  writeLine('An interesting game. The only winning move is not to play.');
})();

```
