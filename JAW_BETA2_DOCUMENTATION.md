# Jaw Framework — Beta 2 Documentation

> Jaw is a universal UI framework and rendering runtime for building interfaces and applications across Web, Android, iOS and Desktop from **one** Jaw application model.

---

## 🌟 The Vision

Jaw represents a paradigm shift in cross-platform development, taking inspiration from the architecture of modern titans like **React Native** and **Flutter**, while pushing the boundaries of what a Universal Component Tree (UCT) can do.

Jaw has two distinct but connected goals:
1. **Adaptive Cross-Platform Apps:** A Jaw application can adapt its UI to the conventions of Web, Android, and iOS, allowing for different compositions while sharing state and logic.
2. **Framework-Agnostic UI Replication:** You can migrate an existing UI (built in React, Vue, Flutter, etc.) into Jaw with pixel-level fidelity to its original target.

> [!NOTE]
> **Cross-platform does not mean identical layout.** Jaw allows your Web app to have a sidebar, while your Android app has a compact header. The Jaw UI Model owns the semantics; the target platform renderer owns the presentation constraints.

---

## 🏗️ Architecture Under the Hood

Jaw adopts a strict, decoupled pipeline similar to React's Fiber architecture and Flutter's widget/render-tree separation. 

```text
Jaw Source (TS/JSX)
        |
   Jaw Compiler
        |
Universal Component Tree (UCT)
        |
  Layout Engine
        |
   Render Plan
        |
  Target Renderer (Web/Android)
```

### 1. Universal Component Tree (UCT)
The UCT is Jaw's canonical representation of your UI. Like Vue's Virtual DOM or Flutter's Element tree, it is serializable, deterministic, and platform-independent. 

### 2. Layout Engine (The Math)
Jaw's Layout Engine (similar to React Native's **Yoga**) calculates absolute flexbox coordinates (`x`, `y`, `width`, `height`) for every node. It is entirely deterministic.

### 3. Target Renderers (The Paint)
Instead of forcing web technologies (WebView) onto mobile devices, Jaw translates its mathematical Render Plan directly to the platform's native primitives. 
- **Web Renderer:** Uses a blazing-fast Virtual DOM diffing algorithm to minimally patch HTML Elements, enabling smooth CSS `transition` animations.
- **Android Renderer:** Translates the Render Plan directly into native Android Views (bypassing the browser entirely).

---

## ⚛️ Fine-Grained Reactivity (State)

Jaw leverages fine-grained reactivity, similar to **SolidJS** and **Vue 3**.

When you create state using `Jaw.createState`, the runtime tracks exactly which components depend on that value. 

```tsx
import Jaw from '@jaw/runtime';
import { Box, Text, Button, Row } from '@jaw/components';

export function CounterCard() {
  // Fine-grained reactive state
  const [count, setCount] = Jaw.createState(0);

  return Jaw.createElement(Box, { style: { padding: 24, backgroundColor: '#1e293b', borderRadius: 12 } },
    Jaw.createElement(Text, { style: { fontSize: 24, color: 'white' } }, `Count: ${count()}`),
    Jaw.createElement(Row, { style: { gap: 12, marginTop: 16 } },
      Jaw.createElement(Button, {
        onPress: () => setCount(c => c - 1),
        label: 'Decrement',
      })
    )
  );
}
```

When `setCount` is called, the Virtual DOM reconciler kicks in. It diffs the old LayoutBox tree against the new one and generates a minimal set of patches (e.g., just updating the Text content) without destroying the surrounding DOM elements.

---

## 🛠️ The Jaw CLI & Live Reload

Taking cues from incredibly fast dev tooling like **Vite**, the Jaw CLI uses `esbuild` for lightning-fast compilation. 

### Commands
| Command | Description |
|---|---|
| `jaw create <name>` | Scaffold a new Jaw Beta 2 project |
| `jaw dev` | Start the development server with **Live Reload (SSE)** |
| `jaw build` | Create a minified production build |

When running `jaw dev`, the CLI injects a Server-Sent Events (SSE) listener into your Web Renderer. The moment you save a file, the compiler recompiles the TypeScript and instantly pings the browser to refresh, giving you a fluid developer experience.

---

## 📚 Core Components

Jaw ships with a strict, platform-agnostic set of layout primitives. You must not use HTML tags (`<div>`, `<span>`) or Android XML directly.

- **`Box`**: The universal flex container.
- **`Row`**: Horizontal layout (defaults to `flexDirection: row`).
- **`Column`**: Vertical layout (defaults to `flexDirection: column`).
- **`Text`**: For all typography. Supports font sizing, weights, and cross-platform text measurement.
- **`Button`**: An interactive element that normalizes mouse clicks on Web and Touch gestures on Android.
- **`Image`**: Loads local and remote assets.
- **`Scroll`**: A container that handles native scrolling physics on Android and `overflow: scroll` on Web.
- **`Spacer`**: A flex-grow primitive to easily push elements apart.

---

## 🚦 AI & Agent Execution Rules

Because Jaw is built to be maintained by Agentic IDEs, all contributions must follow the strict rules defined in `docs/16-AI_RULES.md`:
1. **Never invent public APIs** without architectural approval.
2. **Preserve Core Boundaries:** Never put DOM code in the Core runtime, and never put Android SDK code in the UCT.
3. **Tests are Mandatory:** Every implementation must pass unit, integration, and deterministic visual regression tests.
4. **Source of Truth:** If the Markdown specification and code conflict, the Markdown specification wins.

Welcome to Jaw Beta 2. Build once, render natively everywhere.
