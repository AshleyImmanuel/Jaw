#!/usr/bin/env node

/**
 * @jaw/cli
 *
 * The Jaw command-line interface.
 *
 * Commands:
 *   jaw create <name>  - Create a new Jaw project
 *   jaw dev             - Start development server
 *   jaw build           - Production build
 *   jaw doctor          - Check environment
 *   jaw lint            - Lint source files
 */

const args = process.argv.slice(2);
const command = args[0];

async function main(): Promise<void> {
  switch (command) {
    case 'create': {
      const projectName = args[1];
      if (!projectName) {
        console.error('Usage: jaw create <project-name>');
        process.exit(1);
      }
      const { createProject } = await import('./commands/create');
      await createProject(projectName);
      break;
    }

    case 'dev': {
      const { startDevServer } = await import('./commands/dev');
      const portArg = args.find(a => a.startsWith('--port='));
      const port = portArg ? parseInt(portArg.split('=')[1], 10) : undefined;
      await startDevServer({ port });
      break;
    }

    case 'build': {
      const { runBuild } = await import('./commands/build');
      await runBuild();
      break;
    }

    case 'doctor': {
      const { runDoctor } = await import('./commands/doctor');
      await runDoctor();
      break;
    }

    case 'lint': {
      const { runLint } = await import('./commands/lint');
      await runLint();
      break;
    }

    default: {
      console.log('Jaw CLI v0.1.0');
      console.log('');
      console.log('Commands:');
      console.log('  jaw create <name>   Create a new Jaw project');
      console.log('  jaw dev             Start development server');
      console.log('  jaw build           Production build');
      console.log('  jaw doctor          Check environment');
      console.log('  jaw lint            Lint source files');
      break;
    }
  }
}

main().catch((err) => {
  console.error('[Jaw] Error:', err.message);
  process.exit(1);
});
