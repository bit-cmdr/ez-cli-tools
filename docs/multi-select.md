# Multiple select options

```ts
import { select } from 'ez-cli-tools';

const selected: string[] = await select('Select options:', ['Option 1', 'Option 2', 'Option 3'], { multiple: true });
/* Output:
Select an option:
       [*] Option 1
     > [*] Option 2
       [ ] Option 3
*/

console.log(`Selected: ${selected.join(',')}`); // Selected: Option 1,Option 2
```

## Advanced Cursor Style

```ts
import { select } from 'ez-cli-tools';

const selected: string[] = await select('Select options:', ['Option 1', 'Option 2', 'Option 3'], { multiple: true, cursor: '->', selectedStyle: '<•>', unselectedStyle: '< >' });
/* Output:
Select an option:
       <•> Option 1
     > <•> Option 2
       < > Option 3
*/

console.log(`Selected: ${selected.join(',')}`); // Selected: Option 1,Option 2
```

## Advanced Hover Style

```ts
import { select } from 'ez-cli-tools';

const selected: string[] = await select('Select options:', ['Option 1', 'Option 2', 'Option 3'], { multiple: true, hoverStyle: 'o', selectedStyle: '•', unselectedStyle: 'o' });
/* Output:
Select an option:
     • Option 1
     • Option 2
     o Option 3
*/

console.log(`Selected: ${selected.join(',')}`); // Selected: Option 1,Option 2
```
