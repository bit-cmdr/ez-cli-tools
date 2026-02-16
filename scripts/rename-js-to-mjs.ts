import { readdir, rename, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

async function renameJsToMjs(directory: string): Promise<void> {
  const files = await readdir(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = join(directory, file.name);
    if (file.isDirectory()) {
      await renameJsToMjs(fullPath);
    } else if (file.isFile() && extname(file.name) === '.js') {
      const newFullPath = fullPath.replace(/\.js$/, '.mjs');
      await rename(fullPath, newFullPath);
      const contents = await readFile(newFullPath, 'utf-8');
      const updatedContents = contents.replace(/\.js\'/g, ".mjs'").replace(/\.js\"/g, '.mjs\"');
      await writeFile(newFullPath, updatedContents, 'utf-8');
    }
  }
}

renameJsToMjs('./dist/esm')
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
