# Single select option

```ts
import { select } from '@bit-cmdr/ez-cli-tools';

const selected: string[] = await select('Select an option:', ['Option 1', 'Option 2', 'Option 3']);
/* Output:
Select an option:
       [ ] Option 1
     > [*] Option 2
       [ ] Option 3
*/

console.log(`Selected: ${selected.join(',')}`); // Selected: Option 2
```

## Advanced Cursor Style

```ts
import { select } from '@bit-cmdr/ez-cli-tools';

const selected: string[] = await select('Select an option:', ['Option 1', 'Option 2', 'Option 3'], {
  cursor: '->',
  selectedStyle: '<•>',
  unselectedStyle: '< >',
});
/* Output:
Select an option:
        < > Option 1
     -> <•> Option 2
        < > Option 3
*/

console.log(`Selected: ${selected.join(',')}`); // Selected: Option 2
```

## Advanced Hover Style

```ts
import { select } from '@bit-cmdr/ez-cli-tools';

const selected: string[] = await select('Select an option:', ['Option 1', 'Option 2', 'Option 3'], {
  hoverStyle: 'o',
  selectedStyle: '•',
  unselectedStyle: 'o',
});
/* Output:
Select an option:
      o Option 1
      • Option 2
      o Option 3
*/

console.log(`Selected: ${selected.join(',')}`); // Selected: Option 2
```
