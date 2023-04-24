# Billomat CLI 👾🧪 ( Pre-Alpha )

![node-current](https://img.shields.io/node/v/@billomat/cli)
![GitHub package.json version](https://img.shields.io/github/package-json/v/vlrmprjct/billomat.cli?color=%2353BE7E)
![GitHub](https://img.shields.io/github/license/vlrmprjct/billomat.cli)

## Install

`$ npm install -g @billomat/cli`

### Usage ( Available commands )


| Command      | Description              | Arguments                |
| ------------ | ------------------------ | ------------------------ |
| `init` | Initialize cli |  |
| `activity` | Show activity feed | `--watch` Polls the activity feed, default 15sec<br>`--watch <interval>` Set poll interval in milliseconds |
| `search` | Search across documents | `--term <term*>` Required*, provided search term<br>`--type <type>` Type of document |
| `help` | This command |  |

### CLI fun part 🦄

`$ billcli search --term something >> export.txt`

`$ billcli search --term something >> export-1.txt && billcli search --term otherthings >> export-2.txt`

---

## Requirements

* `node v18.15.0`

* `npm v9.5.0`

---
## Develop

`$ git clone git@github.com:vlrmprjct/billomat.cli.git`

`$ cd billomat.cli`

`$ npm ci`

### API Url

To use the dev-version of the API set the following:

`$ export NODE_ENV=development`

Remove environment variable to use prod-version:

`$ unset NODE_ENV`

### Make Executable

`$ chmod +x cli.js`

### Usage

`$ ./cli.js [command] [--args]`
