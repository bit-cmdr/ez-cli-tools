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
export declare function select<T extends string>(question: string, choices: readonly T[], options?: SelectOptions): Promise<T[]>;
