#!/usr/bin/env node
import fs from 'fs';
import archiver from 'archiver';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;
const zipFileName = `chrome-url-tracker-${version}.zip`;

const output = fs.createWriteStream(zipFileName);
const archive = archiver('zip');

archive.directory('dist/', false);

archive.pipe(output);
archive.finalize();
