#!/usr/bin/env node

import fs from 'fs';
import fetch from 'node-fetch';
import { config, colorize, polling } from './util/index.js';

const settingsFile = new URL('settings.json', import.meta.url).pathname;

let id, token;
let prevId = '';

// FIRST RUN
if (fs.existsSync(settingsFile) && fs.statSync(settingsFile).size > 0) {
    const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
    token = settings.token;
    id = settings.id;
} else {
    console.log('');
    console.log(colorize('┌──────────────────────────────┐', 'brightGreen'));
    console.log(colorize('│                              │', 'brightGreen'));
    console.log(colorize('│     Billomat CLI v0.0.1      │', 'brightGreen'));
    console.log(colorize('│                              │', 'brightGreen'));
    console.log(colorize('└──────────────────────────────┘', 'brightGreen'));
    console.log('');
    console.log('Looks like it\'s the first run!');
    console.log('Run "$ cli init" first.');
}

const args = process.argv.slice(2);
const command = args[0];

// TODO: Move it to a subdir
const feed = () => {
    fetch(`https://${id}.billodev.net/api/v2/activity-feed`, {
        headers: {
            'X-BillomatApiKey': token,
        }
    })
        .then(response => response.json())
        .then(data => {
            const { id, date, resource, title, text, user_id } = data[0];
            if (prevId !== id) {
                console.table({
                    ID: id,
                    Date: new Date(date).toLocaleString(),
                    Type: resource,
                    Title: title,
                    Message: text,
                    User: parseInt(user_id, 10),
                });
                prevId = id;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

const outputTest = () => {
    console.log(new Date().toLocaleString())
}

// TODO: Simplify routing
switch (command) {
    case 'init':
        config(settingsFile);
        break;

    case 'feed':
        args.forEach((arg, index) => {
            switch (arg) {
                case '--watch':
                    polling(feed, args[index + 1]);
                default:
                    break;
            }
        });
        break;

    case 'test':
        console.log(command);
        console.log(args);
        args.forEach((arg, index) => {
            switch (arg) {
                case '--watch':
                    polling(outputTest);
                case '--foo':
                    console.log(args[index + 1]);
                    break;
                case '--bar':
                    console.log(args[index + 1]);
                    break;
                case '--foobar':
                    console.log(args[index + 1]);
                    break;
                default:
                    console.error('No params given');
                    break;
            }
        });
        break;
    default:
        process.exit(1);
        break;
}
