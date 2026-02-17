# Writing

## write

```ts
import { write } from '@bit-cmdr/ez-cli-tools';

await write('Hello world');
/* Output:
$ Hello world
*/
```

## writeLine

```ts
import { writeLine } from '@bit-cmdr/ez-cli-tools';

writeLine('Hello world');
/* Output:
$ Hello world
$ 
*/
```

## writeLines

```ts
import { writeLines } from '@bit-cmdr/ez-cli-tools';

writeLines(['Hello', 'world']);
/* Output:
$ Hello
$ world
$ 
*/
```

## writeBlankLine

```ts
import { writeBlankLine } from '@bit-cmdr/ez-cli-tools';

writeBlankLine();
/* Output:
$ 
$
*/
```
