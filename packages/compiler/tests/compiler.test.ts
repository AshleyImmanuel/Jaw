/**
 * Compiler Tests
 *
 * Tests for source validation and diagnostics.
 */

import { describe, it, expect } from 'vitest';
import { validateSource, formatIssue, formatReport } from '@jaw/compiler';

describe('validateSource', () => {
  it('valid Jaw source produces no errors', () => {
    const source = `
      import Jaw from '@jaw/runtime';
      import { Box, Text } from '@jaw/components';

      function App() {
        return Jaw.createElement(Box, null,
          Jaw.createElement(Text, { content: 'Hello' })
        );
      }
    `;
    const issues = validateSource(source, 'app.tsx');
    const errors = issues.filter(i => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('flags React import', () => {
    const source = `import React from 'react';`;
    const issues = validateSource(source, 'app.tsx');
    expect(issues.some(i => i.severity === 'error')).toBe(true);
  });

  it('flags React.useState', () => {
    const source = `const [x, setX] = React.useState(0);`;
    const issues = validateSource(source, 'app.tsx');
    expect(issues.some(i => i.severity === 'error')).toBe(true);
  });

  it('warns about direct DOM access in components', () => {
    const source = `document.getElementById('root');`;
    const issues = validateSource(source, 'src/MyComponent.tsx');
    expect(issues.some(i => i.severity === 'warning')).toBe(true);
  });

  it('allows DOM access in renderer-web', () => {
    const source = `document.createElement('div');`;
    const issues = validateSource(source, 'packages/renderer-web/src/dom.ts');
    const warnings = issues.filter(i => i.severity === 'warning');
    expect(warnings).toHaveLength(0);
  });
});

describe('formatReport', () => {
  it('reports no issues', () => {
    const report = formatReport([]);
    expect(report).toContain('No issues');
  });

  it('counts errors and warnings', () => {
    const issues = [
      { severity: 'error' as const, message: 'test error', file: 'a.ts', line: 1 },
      { severity: 'warning' as const, message: 'test warn', file: 'b.ts', line: 2 },
    ];
    const report = formatReport(issues);
    expect(report).toContain('1 error');
    expect(report).toContain('1 warning');
  });
});
