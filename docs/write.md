# Writing

## write

```ts
import { write } from 'ez-cli-tools';

await write('Hello world');
/* Output:
$ Hello world
*/
```

## writeLine

```ts
import { writeLine } from 'ez-cli-tools';

await writeLine('Hello world');
/* Output:
$ Hello world
$ 
*/
```

## writeLines

```ts
import { writeLines } from 'ez-cli-tools';

await writeLines(['Hello', 'world']);
/* Output:
$ Hello
$ world
$ 
*/
```

## writeBlankLine

```ts
import { writeBlankLine } from 'ez-cli-tools';

await writeBlankLine();
/* Output:
$ 
$
*/
```
