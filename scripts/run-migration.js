#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const MIGRATIONS_DIR = 'migrations';

const { _ } = require('yargs')
  .usage('Usage: yarn migration:run <migration-name>')
  .demandCommand(1).argv;

const migration = _[0];
const filename = path.resolve(__dirname, MIGRATIONS_DIR, `${migration}.js`);

if (!fs.existsSync(filename)) {
  console.log();
  console.warn(
    '\x1b[33m%s\x1b[0m',
    'Not found: ',
    `${filename} does not exist`
  );
  process.exit(0);
}

function execute(migrationScript) {
  return new Promise(resolve => {
    const migrate = exec(
      `node -r esm ${migrationScript}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(error.stack);
        }
        console.log(`${migration}: ${stdout}`);
        console.log(`${migration} | Error: ${stderr}`);
      }
    );
    migrate.on('exit', code => resolve(code));
  });
}

execute(filename);
