# Billomat CLI 👾🧪 ( Pre-Alpha )

## Install

`$ npm install -g @billomat/cli`

### Usage ( Available commands )

#### Initialize CLI
`$ billcli init`

#### Activity Feed
`$ billcli activity` [ Latest entries ]

`$ billcli activity --watch` [ Last entry, default pollintervall: 15sec]

`$ billcli activity --watch 3000`


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
