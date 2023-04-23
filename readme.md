# Billomat CLI 👾🧪 ( Pre-Alpha )

## Install

`$ npm install -g @billomat/cli`

### Usage ( Available commands )


| Command      | Description              | Arguments                |
| ------------ | ------------------------ | ------------------------ |
| `init` | Initialize cli |  |
| `activity` | Show activity feed | `--watch` Polls the activity feed, default 15sec<br>`--watch <interval>` Set poll interval in milliseconds |
| `search` | Search across documents | `--term <term*>` Required*, provided search term<br>`--type <type>` Type of document |
| `help` | This command |  |


---

## Requirements

* `node v18.15.0`

* `npm v9.5.0`

---
## Develop

`$ git clone git@github.com:vlrmprjct/billomat.cli.git`

`$ cd billomat.cli`

`$ npm ci`

### Make Executable
`$ chmod +x cli.js`

### Usage

`$ ./cli.js [command] [--args]`
