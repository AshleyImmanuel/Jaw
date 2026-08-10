/**
 * @jaw/cli - Doctor Command
 *
 * Validates the development environment.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
/**
 * Run environment health checks.
 */
export async function runDoctor() {
    console.log('[Jaw Doctor] Checking your environment...\n');
    const checks = [];
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1), 10);
    checks.push({
        name: 'Node.js version',
        status: majorVersion >= 18 ? 'pass' : 'fail',
        detail: `${nodeVersion} (requires >= 18)`,
    });
    // Check npm
    try {
        const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();
        checks.push({
            name: 'npm',
            status: 'pass',
            detail: `v${npmVersion}`,
        });
    }
    catch {
        checks.push({
            name: 'npm',
            status: 'fail',
            detail: 'Not found',
        });
    }
    // Check TypeScript
    try {
        const tsVersion = execSync('npx tsc --version', { encoding: 'utf-8' }).trim();
        checks.push({
            name: 'TypeScript',
            status: 'pass',
            detail: tsVersion,
        });
    }
    catch {
        checks.push({
            name: 'TypeScript',
            status: 'warn',
            detail: 'Not found (install as devDependency)',
        });
    }
    // Check package.json exists
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    checks.push({
        name: 'package.json',
        status: fs.existsSync(pkgPath) ? 'pass' : 'fail',
        detail: fs.existsSync(pkgPath) ? 'Found' : 'Not found',
    });
    // Check tsconfig.json
    const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
    checks.push({
        name: 'tsconfig.json',
        status: fs.existsSync(tsconfigPath) ? 'pass' : 'warn',
        detail: fs.existsSync(tsconfigPath) ? 'Found' : 'Not found (recommended)',
    });
    // Print results
    for (const check of checks) {
        const icon = check.status === 'pass' ? '[OK]'
            : check.status === 'fail' ? '[FAIL]'
                : '[WARN]';
        console.log(`  ${icon} ${check.name}: ${check.detail}`);
    }
    const failures = checks.filter(c => c.status === 'fail');
    console.log('');
    if (failures.length > 0) {
        console.log(`${failures.length} check(s) failed. Please fix the issues above.`);
    }
    else {
        console.log('All checks passed. Your environment is ready for Jaw development.');
    }
}
//# sourceMappingURL=doctor.js.map