# Jaw

**Production-grade cross-platform UI runtime.**

Build your UI once in TypeScript/JSX, then render on Web, Android, iOS, and Desktop -- without rewriting your interface.

## Beta 1

Beta 1 validates the core architecture:

| Module | Status |
|---|---|
| Core Types | Done |
| Compiler | Done |
| Runtime | Done |
| Components | Done |
| Styling Engine | Done |
| Layout Engine | Done |
| Web Renderer | Done |
| CLI | Done |
| Hot Reload | Done |

## Architecture

```
Developer (TS/JSX)
        |
        v
  Jaw Compiler
        |
        v
  Universal Component Tree
        |
        v
  Styling Engine  -->  Layout Engine
        |
        v
  Web Renderer  -->  DOM
```

## Quick Start

```bash
# Create a new Jaw project
npx jaw create my-app

# Start development server
cd my-app
jaw dev

# Production build
jaw build
```

## Components

All components are platform-agnostic:

- **Box** -- Generic flex container
- **Row** -- Horizontal layout
- **Column** -- Vertical layout
- **Text** -- Text display
- **Button** -- Interactive button
- **Image** -- Image display
- **Spacer** -- Flexible space
- **Scroll** -- Scrollable container

## Example

```tsx
import Jaw from '@jaw/runtime';
import { Box, Row, Text, Button } from '@jaw/components';
import { render } from '@jaw/renderer-web';

function Counter() {
  const [count, setCount] = Jaw.createState(0);

  return Jaw.createElement(Box, {
    style: { padding: 24, alignItems: 'center', gap: 16 }
  },
    Jaw.createElement(Text, {
      style: { fontSize: 32, fontWeight: 'bold' }
    }, `Count: ${count()}`),
    Jaw.createElement(Row, { style: { gap: 12 } },
      Jaw.createElement(Button, {
        onPress: () => setCount(c => c - 1),
        label: '-',
        style: { padding: 12, backgroundColor: '#e74c3c', borderRadius: 8 }
      }),
      Jaw.createElement(Button, {
        onPress: () => setCount(c => c + 1),
        label: '+',
        style: { padding: 12, backgroundColor: '#2ecc71', borderRadius: 8 }
      }),
    ),
  );
}

render(Counter(), document.getElementById('root')!);
```

## CLI Commands

| Command | Description |
|---|---|
| `jaw create <name>` | Scaffold a new Jaw project |
| `jaw dev` | Start dev server with hot reload |
| `jaw build` | Production build (minified) |
| `jaw doctor` | Check environment |
| `jaw lint` | Lint source files |

## Project Structure

```
packages/
  core/          Shared types (JawNode, JawStyle, LayoutBox)
  runtime/       createElement, state, lifecycle, events, scheduler
  components/    Box, Row, Column, Text, Button, Image, Spacer, Scroll
  styling/       Style normalization, merging, defaults, validation
  layout/        Flexbox-inspired layout engine
  renderer-web/  DOM renderer with diffing
  compiler/      JSX transform, bundling, validation
  cli/           Command-line interface
  hot-reload/    WebSocket-based HMR
```

## Testing

```bash
# Run all tests
npm test

# 84 tests across 5 test suites:
#   - Layout engine: 30 tests (flex, box model, alignment, gap, constraints, edge cases)
#   - Runtime: 14 tests (createElement, state management)
#   - Styling: 15 tests (normalization, merging, defaults, validation)
#   - Components: 14 tests (all 8 components)
#   - Compiler: 7 tests (validation, diagnostics)
```

## Roadmap

- **Beta 1** -- Core runtime, compiler, web renderer (current)
- **Beta 2** -- Android renderer
- **Beta 3** -- iOS renderer, migration preview
- **v1** -- Stable cross-platform release

## License

Proprietary
