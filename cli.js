#!/usr/bin/env node

import fs from 'fs';
import boxen from 'boxen';
import { colorize, version } from './util/index.js';
import routing from './routing/routing.js'

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
    state.id = settings.id;
    state.token = settings.token;
} else {
    console.log(boxen(colorize(`Billomat CLI v${version()}`, 'cyan'), {
        borderColor: 'cyan',
        borderStyle: 'round',
        margin: { top: 1, bottom: 1 },
        padding: 1,
        width: 52,
    }));

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
