# Multiple select options

```ts
import { select } from 'ez-cli-tools';

const selected: string[] = await select('Select options:', ['Option 1', 'Option 2', 'Option 3']);
/* Output:
Select an option:
       [*] Option 1
     > [*] Option 2
       [ ] Option 3
*/

console.log(`Selected: ${selected.join(',')}`); // Selected: Option 1,Option 2
```
