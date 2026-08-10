/**
 * @jaw/cli - Lint Command
 *
 * Lints Jaw source files for best practices.
 */

import fs from 'fs';
import path from 'path';
import { validateSource, formatReport } from '@jaw/compiler';

/**
 * Lint all source files in the project.
 */
export async function runLint(targetDir?: string): Promise<void> {
  const srcDir = path.resolve(targetDir ?? process.cwd(), 'src');

  if (!fs.existsSync(srcDir)) {
    console.log('[Jaw Lint] No src/ directory found.');
    return;
  }

  console.log('[Jaw Lint] Checking source files...\n');

  const files = collectFiles(srcDir, ['.ts', '.tsx', '.jsx']);
  const allIssues = [];

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(process.cwd(), file);
    const issues = validateSource(source, relativePath);
    allIssues.push(...issues);
  }

  console.log(formatReport(allIssues));

  if (allIssues.some(i => i.severity === 'error')) {
    process.exit(1);
  }
}

/**
 * Recursively collect files with given extensions.
 */
function collectFiles(dir: string, extensions: string[]): string[] {
  const results: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        results.push(...collectFiles(fullPath, extensions));
      }
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }

  return results;
}
