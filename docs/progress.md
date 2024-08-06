# Show Progress Example

## Spinner

```ts
import { printSpinner, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printSpinner();
await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```

```ts
import { printSpinner, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printSpinner({ intervalMs: 250 });
await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```

```ts
import { printSpinner, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printSpinner({ intervalMs: 500, templateFn: (frame: string) => `Testing ${frame}` });
await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```

## Dots

```ts
import { printDots, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId1 = printDots();
await setTimeout(30000);
endIntervalAndClearStatus(intervalId1);
```

```ts
import { printDots, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printDots({ intervalMs: 250 });
await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```

```ts
import { printDots, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printDots({ intervalMs: 500, templateFn: (frame: string) => `Testing ${frame}` });
await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```

## Progress at an interval

```ts
import { printProgressAtInterval, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printProgressAtInterval();
await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```

```ts
import { printProgressAtInterval, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printProgressAtInterval({ intervalMs: 250 });
await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```

```ts
import { printProgressAtInterval, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printProgressAtInterval({ intervalMs: 500, templateFn: (progress: number) => `Testing ${progress}%` });
await setTimeout(30000);
  endIntervalAndClearStatus(intervalId);
```

## Progress

```ts
import { printProgress, endIntervalAndClearStatus } from 'ez-cli-tools';

const progress = printProgress();

for (let i = 0; i <= 1000; i++) {
  progress(((i + 1) / 1000) * 100);
}
```

```ts
import { printProgress, endIntervalAndClearStatus } from 'ez-cli-tools';

const progress = printProgress((n: string) => `Testing at: ${n}%`);

for (let i = 0; i <= 1000; i++) {
  progress(((i + 1) / 1000) * 100);
}
```

## Make your own animation
  
```ts
import { printFramesAtInterval, endIntervalAndClearStatus } from 'ez-cli-tools';
import { setTimeout } from 'timers/promises';

const intervalId = printFramesAtInterval(
  ['<    >', '<-   >', '< -  >', '<  - >', '<   ->', '<    >', '<  - >', '< -  >', '<-   >'],
  250,
  { frameColor: 'red' },
);

await setTimeout(30000);
endIntervalAndClearStatus(intervalId);
```
