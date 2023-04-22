#!/usr/bin/env node

import fs from 'fs';
import boxen from 'boxen';
import { colorize } from './util/index.js';
import routing from './routing/routing.js'

const packageFile = new URL('package.json', import.meta.url).pathname;
const version = JSON.parse(fs.readFileSync(packageFile, 'utf-8')).version;

const settingsFile = new URL('settings.json', import.meta.url).pathname;

const state = {
    args: null,
    command: null,
    id: null,
    token: null,
    settings: settingsFile,
}

state.args = process.argv.slice(2);
state.command = process.argv.slice(2)[0];

// FIRST RUN
if (fs.existsSync(settingsFile) && fs.statSync(settingsFile).size > 0) {
    const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
    state.id = settings.id;s
    state.token = settings.token;
} else {
    console.log('');
    console.log(boxen(colorize(`Billomat CLI v${version}`, 'cyan'), {
        padding: 1, borderColor: 'cyan', borderStyle: 'round', width: 52,
    }));
    console.log('');

    if (state.command !== 'init') {
        console.log(colorize('⚠️  No configuration found! Run \'billcli init\' first. ', 'brightYellow'));
        console.log('');
        process.exit(1);
    }
}

const route = routing(state);

if (route) {
    route(state.args);
} else {
    process.exit(1);
}
