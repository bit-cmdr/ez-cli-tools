import assert from 'node:assert';
import { readlineInterface, input } from './interface.js';
import { colors } from './colors.js';
import { eraseLines } from './eraser.js';

const Keypress = 'keypress';

/**
 * Options for the `select` function.
 * @property {boolean} [multiple=false] Whether the user can select multiple choices.
 * @property {boolean} [required=true] Whether the user must select at least one choice.
 * @property {string} [cursor='>'] The string to use to indicate the cursor. Mutually exclusive with `hoverStyle`.
 * @property {string} [selectedStyle='[*]'] The string to use to indicate a selected choice.
 * @property {string} [unselectedStyle='[ ]'] The string to use to indicate an unselected choice.
 * @property {string} [hoverStyle=] The string to use to indicate the cursor when hovering over a choice. Mutually exclusive with `cursor`.
 */
export interface SelectOptions {
  multiple?: boolean;
  required?: boolean;
  cursor?: string;
  selectedStyle?: string;
  unselectedStyle?: string;
  hoverStyle?: string;
}

interface SelectOptionsInternal extends Required<Omit<SelectOptions, 'cursor' | 'hoverStyle'>> {
  cursor?: string;
  hoverStyle?: string;
  renderMenu: boolean;
}

type SelectChoice<T extends string> = {
  text: T;
  index: number;
  isSelected: boolean;
};

type SelectChoices<T extends string> = {
  choices: SelectChoice<T>[];
  cursorIndex: number;
};

/**
 * Asks the user to select one or more choices from a list. The user can use the arrow keys to navigate the list, the space key to select a choice, and the return key to submit their selection.
 * @param {string} question The question to ask the user.
 * @param {string[]} choices The choices to display to the user.
 * @param {SelectOptions} options SelectOptions The options for the select function.
 * @param {boolean} [options.multiple=false] Whether the user can select multiple choices.
 * @param {boolean} [options.required=true] Whether the user must select at least one choice.
 * @param {string} [options.cursor='>'] The string to use to indicate the cursor. Mutually exclusive with `hoverStyle`.
 * @param {string} [options.selectedStyle='[*]'] The string to use to indicate a selected choice.
 * @param {string} [options.unselectedStyle='[ ]'] The string to use to indicate an unselected choice.
 * @param {string} [options.hoverStyle=] The string to use to indicate the cursor when hovering over a choice. Mutually exclusive with `cursor`.
 * @returns
 */
export function select<T extends string>(
  question: string,
  choices: readonly T[],
  options?: SelectOptions,
): Promise<T[]> {
  const defaultSelectOptions: SelectOptionsInternal = {
    multiple: false,
    required: true,
    selectedStyle: '[*]',
    unselectedStyle: '[ ]',
    renderMenu: true,
  };
  const opts: SelectOptionsInternal = { ...defaultSelectOptions, ...(options ?? {}) };
  assert(opts.multiple === true || opts.multiple === false, 'multiple must be a boolean');
  const cursor =
    (opts.cursor === undefined || opts.cursor === null) && (opts.hoverStyle === undefined || opts.hoverStyle === null)
      ? '>'
      : opts.cursor;
  const hoverStyle = cursor !== null && cursor !== undefined ? undefined : opts.hoverStyle;
  assert(
    cursor !== undefined || cursor !== null || hoverStyle !== undefined || hoverStyle !== null,
    'cursor or hoverStyle must be defined',
  );
  assert(
    !(cursor !== undefined && cursor !== null && hoverStyle !== undefined && hoverStyle !== null),
    'cursor and hoverStyle are mutually exclusive',
  );
  opts.cursor = cursor;
  opts.hoverStyle = hoverStyle;

  return new Promise((resolve) => {
    const selectChoices: SelectChoices<(typeof choices)[number]> = {
      choices: choices.map((text, index) => ({ text, index, isSelected: false })),
      cursorIndex: 0,
    };

    const keypressListener = (_: string, key: { name: string }) => {
      const selectedChoices = selectChoices.choices.filter((choice) => choice.isSelected).map((choice) => choice.text);
      const selectedChoice = selectChoices.choices[selectChoices.cursorIndex];
      switch (key.name) {
        case 'down':
          selectChoices.cursorIndex = Math.min(selectChoices.choices.length - 1, selectChoices.cursorIndex + 1);
          drawSelectMenu(selectChoices, opts);
          break;
        case 'up':
          selectChoices.cursorIndex = Math.max(0, selectChoices.cursorIndex - 1);
          drawSelectMenu(selectChoices, opts);
          break;
        case 'return':
          if (opts.required && selectedChoices.length === 0) {
            break;
          }

          input.removeListener(Keypress, keypressListener);
          readlineInterface.pause();

          return resolve(selectedChoices);
        case 'space':
          assert(selectedChoice, 'selectedChoice must be defined');

          if (!opts.multiple) {
            selectChoices.choices.forEach((choice) => (choice.isSelected = false));
          }

          selectedChoice.isSelected = !selectedChoice.isSelected;
          drawSelectMenu(selectChoices, opts);
          break;
      }
    };

    readlineInterface.write(question + '\n');
    drawSelectMenu(selectChoices, opts);
    input.on(Keypress, keypressListener);
  });
}

function drawSelectMenu<T extends string>(selectChoices: SelectChoices<T>, opts: SelectOptionsInternal): void {
  if (opts.renderMenu) {
    opts.renderMenu = false;
  } else {
    eraseLines(selectChoices.choices.length);
  }

  const padding = padInput();
  const selectedIndicator = colors.green(opts.selectedStyle);
  const unselectedIndicator = opts.unselectedStyle;
  for (let i = 0; i < selectChoices.choices.length; i++) {
    const choice = selectChoices.choices[i];
    assert(choice, 'choice must be defined');

    const drawableChoice = choiceToDraw(
      selectedIndicator,
      unselectedIndicator,
      choice.isSelected,
      i === selectChoices.cursorIndex,
      choice.text,
      opts.cursor ? colors.blue(opts.cursor) : undefined,
      opts.hoverStyle ? colors.blue(opts.hoverStyle) : undefined,
    );

    const tail = i !== selectChoices.choices.length - 1 ? '\n' : '';
    readlineInterface.write(`${padding}${drawableChoice}${tail}`);
  }
}

function choiceToDraw(
  selectedIndicator: string,
  unselectedIndicator: string,
  isSelected: boolean,
  isHovered: boolean,
  text: string,
  cursor?: string,
  hoverStyle?: string,
): string {
  if (cursor) {
    const choice = isSelected ? `${selectedIndicator} ${text}` : `${unselectedIndicator} ${text}`;
    return isHovered ? `${cursor} ${choice}` : `${padInput(cursor.length - 9)} ${choice}`;
  }

  assert(hoverStyle, 'hoverStyle must be defined');
  if (isSelected) {
    return `${selectedIndicator} ${text}`;
  }

  return isHovered ? `${hoverStyle} ${text}` : `${unselectedIndicator} ${text}`;
}

function padInput(n: number = 5): string {
  return ' '.repeat(n);
}
