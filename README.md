# Rarible Moralis dApp

### Table of Contents
- Prerequisites
- Quickstart
- Build
- License

### Prerequisites

1. Node
2. NPM or Yarn

Check whether either of the package manage exists.

```bash
## Checking NPM
npm --version

## Checking Yarn
yarn version
```

If the output of the commands are error, that implies that they do not exists in your system and you should download them before running the dApp.

3. Moralis Server
- Go to Moralis and sign up for a free account
- Create a new server

### Quickstart

1. Clone the project

```bash
## Using Git
git clone https://github.com/gawainb/rarible-moralis.git

## Using GitHub CLI
gh repo clone gawainb/rarible-moralis
```

2. Install Dependencies

```bash
## Using NPM
npm i

## Using Yarn
yarn
```


### Build

1. Build the project

```bash
## Using NPM
npm run build

## Using Yarn
yarn build
```

2. Run the build

Add `serve` CLI package to your global environment.

```bash
## Using NPM
npm i -g serve

## Using Yarn
yarn global add serve
```

Then, use the CLI to run the dApp.

```bash
serve -s build
```

### License
[MIT](https://github.com/gawainb/rarible-moralis/blob/main/LICENSE)