import assert from 'node:assert';
import { readlineInterface, input } from './interface.js';
import { colors } from './colors.js';
import { eraseLines } from './eraser.js';

export interface SelectOptions {
  multiple?: boolean;
  required?: boolean;
  selectedIndicatorCharacter?: string;
  cursorCharacter?: string;
}

interface SelectOptionsInternal extends Required<SelectOptions> {
  renderMenu: boolean;
}

type SelectChoice = {
  text: string;
  index: number;
  isSelected: boolean;
};

type SelectChoices = {
  choices: SelectChoice[];
  cursorIndex: number;
};

const defaultSelectOptions: SelectOptionsInternal = {
  multiple: false,
  required: true,
  selectedIndicatorCharacter: '*',
  cursorCharacter: '>',
  renderMenu: true,
};

export function select(question: string, choices: string[], options?: SelectOptions): Promise<string[]> {
  const opts: SelectOptionsInternal = { ...defaultSelectOptions, ...(options ?? {}) };
  assert(opts.multiple === true || opts.multiple === false, 'multiple must be a boolean');
  assert(opts.selectedIndicatorCharacter.length === 1, 'selectedIndicatorCharacter must be a single character');
  assert(opts.cursorCharacter.length === 1, 'cursorCharacter must be a single character');

  return new Promise((resolve) => {
    const selectChoices: SelectChoices = {
      choices: choices.map((text, index) => ({ text, index, isSelected: false })),
      cursorIndex: 0,
    };

    const keypressListener = (_: string, key: { name: string }) => {
      switch (key.name) {
        case 'down':
          selectChoices.cursorIndex = Math.min(selectChoices.choices.length - 1, selectChoices.cursorIndex + 1);
          displaySelectMenu(selectChoices, opts);
          break;
        case 'up':
          selectChoices.cursorIndex = Math.max(0, selectChoices.cursorIndex - 1);
          displaySelectMenu(selectChoices, opts);
          break;
        case 'return':
          const selectedChoices = selectChoices.choices
            .filter((choice) => choice.isSelected)
            .map((choice) => choice.text);

          if (opts.required && selectedChoices.length === 0) {
            break;
          }

          readlineInterface.removeListener('keypress', keypressListener);
          readlineInterface.pause();

          return resolve(selectedChoices);
        case 'space':
          const selectedChoice = selectChoices.choices[selectChoices.cursorIndex];
          assert(selectedChoice, 'selectedChoice must be defined');

          if (!opts.multiple) {
            selectChoices.choices.forEach((choice) => (choice.isSelected = false));
          }

          selectedChoice.isSelected = !selectedChoice.isSelected;
          displaySelectMenu(selectChoices, opts);
          break;
      }
    };

    readlineInterface.write(question + '\n');
    displaySelectMenu(selectChoices, opts);
    input.on('keypress', keypressListener);
  });
}

function displaySelectMenu(selectChoices: SelectChoices, opts: SelectOptionsInternal): void {
  if (opts.renderMenu) {
    opts.renderMenu = false;
  } else {
    eraseLines(selectChoices.choices.length);
  }

  const padding = padInput();
  const cursor = colors.blue(opts.cursorCharacter);
  const selectedIndicator = colors.green(opts.selectedIndicatorCharacter);
  for (let i = 0; i < selectChoices.choices.length; i++) {
    const choice = selectChoices.choices[i];
    assert(choice, 'choice must be defined');

    const choiceText = choice?.isSelected ? `[${selectedIndicator}] ${choice.text}` : `[ ] ${choice.text}`;
    const displayChoice = i === selectChoices.cursorIndex ? `${cursor} ${choiceText}` : `  ${choiceText}`;
    const tail = i !== selectChoices.choices.length - 1 ? '\n' : '';
    readlineInterface.write(`${padding}${displayChoice}${tail}`);
  }
}

function padInput(n: number = 5): string {
  return ' '.repeat(n);
}
