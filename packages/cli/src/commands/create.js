/**
 * @jaw/cli - Create Command
 *
 * Scaffolds a new Jaw project with the default template.
 */
import fs from 'fs';
import path from 'path';
/**
 * Create a new Jaw project.
 *
 * @param projectName - Name of the project directory to create
 * @param targetDir - Parent directory to create the project in
 */
export async function createProject(projectName, targetDir = process.cwd()) {
    const projectDir = path.join(targetDir, projectName);
    if (fs.existsSync(projectDir)) {
        throw new Error(`Directory "${projectName}" already exists.`);
    }
    // Create project directory structure
    fs.mkdirSync(projectDir, { recursive: true });
    fs.mkdirSync(path.join(projectDir, 'src'), { recursive: true });
    // Write package.json
    const pkg = {
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts: {
            dev: 'jaw dev',
            build: 'jaw build',
            lint: 'jaw lint',
        },
        dependencies: {
            '@jaw/core': '^0.1.0',
            '@jaw/runtime': '^0.1.0',
            '@jaw/components': '^0.1.0',
            '@jaw/renderer-web': '^0.1.0',
        },
    };
    fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(pkg, null, 2));
    // Write tsconfig.json
    const tsconfig = {
        compilerOptions: {
            target: 'ES2022',
            module: 'ES2022',
            moduleResolution: 'bundler',
            jsx: 'react',
            jsxFactory: 'Jaw.createElement',
            jsxFragmentFactory: 'Jaw.Fragment',
            strict: true,
            esModuleInterop: true,
        },
        include: ['src'],
    };
    fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
    // Write index.html
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    #jaw-root { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="jaw-root"></div>
  <script type="module" src="./dist/app.js"></script>
</body>
</html>`;
    fs.writeFileSync(path.join(projectDir, 'index.html'), html);
    // Write main app file
    const appSource = `import Jaw from '@jaw/runtime';
import { Box, Text, Button } from '@jaw/components';
import { render } from '@jaw/renderer-web';

function App() {
  return Jaw.createElement(Box, {
    style: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a2e',
    }
  },
    Jaw.createElement(Text, {
      style: { fontSize: 32, color: '#ffffff', fontWeight: 'bold' }
    }, 'Welcome to ${projectName}'),
    Jaw.createElement(Text, {
      style: { fontSize: 16, color: '#a0a0b0', marginTop: 8 }
    }, 'Built with Jaw'),
  );
}

const container = document.getElementById('jaw-root')!;
render(App(), container);
`;
    fs.writeFileSync(path.join(projectDir, 'src', 'app.tsx'), appSource);
    console.log(`Created Jaw project: ${projectName}`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  jaw dev`);
}
//# sourceMappingURL=create.js.map