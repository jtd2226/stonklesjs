#!/usr/bin/env node
const { spawn } = require('child_process');

function exec(string, options) {
  return new Promise(resolve => {
    const [command, ...args] = string.trim().split(' ');
    const child = spawn(command, args, options);
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', console.log);
    child.stderr.on('data', console.log);
    child.on('close', resolve);
  });
}

async function shell(string) {
  const options = { cwd: './' };
  for (let line of string.trim().split('\n')) {
    line = line.trim();
    if (line.startsWith('cd')) {
      options.cwd = line.slice(3);
    } else {
      await exec(line, options);
    }
  }
}

async function main(args) {
  await shell(`
  yarn create next-app --ts ${args}
  cd ${args}
  git clone https://github.com/jtd2226/template.git template
  rm -rf pages public styles .eslintrc.json
  cp -rf template/lib/. .
  rm -rf template
  code -n .
  `);
  process.exit(0);
}

main(process.argv.slice(2).join(' '));
