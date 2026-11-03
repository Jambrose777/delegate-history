#!/usr/bin/env node
// Marks a story complete without moving it from the flat docs/stories/ directory.
// The story file remains at a stable path so later stories can keep linking to it.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const storiesDir = path.join(repoRoot, 'docs', 'stories');
const readmePath = path.join(storiesDir, 'README.md');

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

// Prepares the matching index row while preserving its linked title.
function getUpdatedStoryIndex({ storyNumber, status, content }) {
  const lines = content.split('\n');
  const rowPattern = new RegExp(`^\\|\\s*${storyNumber}\\s*\\|`);
  const rowIndex = lines.findIndex((line) => rowPattern.test(line));
  if (rowIndex === -1) {
    fail(`Could not find a docs/stories/README.md row for story ${storyNumber}.`);
  }

  const cells = lines[rowIndex].split('|');
  if (cells.length < 5) {
    fail(`The index row for story ${storyNumber} has no status column.`);
  }
  cells[3] = ` ${status} `;
  lines[rowIndex] = cells.join('|');
  return lines.join('\n');
}

const storyNumberArg = process.argv[2];
if (!storyNumberArg) {
  fail('Usage: node scripts/mark-story-done.mjs <story-number>');
}

// Normalize values such as "032" to the unpadded number used in index rows.
const storyNumber = String(Number(storyNumberArg));
if (storyNumber === 'NaN') {
  fail(`"${storyNumberArg}" is not a valid story number.`);
}

// Story filenames use a zero-padded numeric prefix, so allow leading zeros in
// either the filename or the supplied story number.
const candidates = readdirSync(storiesDir).filter((name) =>
  new RegExp(`^0*${storyNumber}-.+\\.md$`).test(name),
);
if (candidates.length === 0) {
  fail(`No story numbered ${storyNumber} found in docs/stories/.`);
}
if (candidates.length > 1) {
  fail(`Multiple files in docs/stories/ matched story ${storyNumber}: ${candidates.join(', ')}`);
}

const fileName = candidates[0];
const storyPath = path.join(storiesDir, fileName);
const storyContent = readFileSync(storyPath, 'utf8');
const statusLinePattern = /^\*\*Status:\*\* .+$/m;
if (!statusLinePattern.test(storyContent)) {
  fail(`${fileName} has no "**Status:**" line to update.`);
}

const status = 'Completed';
const updatedStory = storyContent.replace(statusLinePattern, `**Status:** ${status}`);
const updatedIndex = getUpdatedStoryIndex({
  storyNumber,
  status,
  content: readFileSync(readmePath, 'utf8'),
});

writeFileSync(storyPath, updatedStory);
writeFileSync(readmePath, updatedIndex);

// Prettier realigns the index after the status update; the operation remains
// successful if formatting is unavailable, with the warning making that visible.
try {
  execFileSync('pnpm', ['exec', 'prettier', '--write', storyPath, readmePath], {
    cwd: repoRoot,
  });
} catch {
  console.warn('Warning: could not run prettier automatically - run `pnpm format` manually.');
}

console.log(`Marked story ${storyNumber} as ${status}`);
console.log('Story file path preserved; docs/stories/README.md updated.');
