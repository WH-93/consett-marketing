#!/usr/bin/env node
const { execFileSync } = require('node:child_process');
const { rmSync } = require('node:fs');
const { resolve } = require('node:path');

const root = resolve(__dirname, '..');
const port = '3000';
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

function run(command, args) {
  try {
    return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function isAlive(pid) {
  try {
    process.kill(Number(pid), 0);
    return true;
  } catch {
    return false;
  }
}

function stopPid(pid, label) {
  process.stdout.write(`${label}: stopping stale localhost:${port} process ${pid}\n`);
  try { process.kill(Number(pid), 'SIGTERM'); } catch {}
  for (let i = 0; i < 20; i += 1) {
    if (!isAlive(pid)) return;
    sleep(100);
  }
  try { process.kill(Number(pid), 'SIGKILL'); } catch {}
  for (let i = 0; i < 20; i += 1) {
    if (!isAlive(pid)) return;
    sleep(100);
  }
}

const pids = run('lsof', ['-tiTCP:' + port, '-sTCP:LISTEN'])
  .split('\n')
  .map((pid) => pid.trim())
  .filter(Boolean);

for (const pid of pids) {
  const cwd = run('sh', ['-c', `lsof -a -p ${pid} -d cwd -Fn | sed -n 's/^n//p'`]);

  if (cwd === root) {
    stopPid(pid, 'dev-preflight');
    continue;
  }

  process.stderr.write(
    `dev-preflight: localhost:${port} is already in use by PID ${pid}${cwd ? ` (${cwd})` : ''}.\n` +
    `Stop that process or run this project on another port.\n`,
  );
  process.exit(1);
}

try {
  rmSync(resolve(root, '.next'), { recursive: true, force: true });
  process.stdout.write('dev-preflight: cleared .next so CSS cannot be served from a stale build\n');
} catch (error) {
  process.stderr.write(`dev-preflight: failed to clear .next: ${error.message}\n`);
  process.exit(1);
}
