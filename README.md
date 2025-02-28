# Climate Wallet

This repository holds the source code for the Climate Wallet in the Climate Tokenization Suite. Related programs are:
* [Climate Tokenization Engine](https://github.com/Chia-Network/Climate-Tokenization-Engine) and [UI](https://github.com/Chia-Network/Climate-Tokenization-Engine-UI)
* [Climate Token Driver](https://github.com/Chia-Network/climate-token-driver)
* [CADT](https://github.com/Chia-Network/cadt) and [UI](https://github.com/Chia-Network/cadt-ui)
* [Chia Blockchain](https://github.com/Chia-Network/chia-blockchain)

Note this wallet is an independent plugin to the latest official [Chia Wallet](https://www.chia.net/downloads/).

*Note: Version 1.1.0 contains breaking changes. Configuration variables are renamed in the config.yaml file and are best handled by taking a backup of the Climate Wallet config.yaml file, unistalling the Climate Wallet and deleting the climate-wallet config.yaml file, then reinstalling and reconfiguring.*

# Usage

The Climate Wallet connects with the official [Chia Wallet](https://www.chia.net/downloads/) running on localhost.  The Climate Wallet also needs to connect to a [CADT](https://github.com/Chia-Network/cadt) node, which could be a publicly available observer node.  

## Installation

Precompiled binaries and installers are available for MacOS, Windows, and Debian-based Linux distros (Ubuntu, Mint, PopOS, etc) on the [releases](https://github.com/Chia-Network/Climate-Wallet/releases) page.

## Configuration

A config.yaml file located at `./chia/mainnet/climate-wallet`. This config file is created when the application is first run.  When configuration changes are made, the application must be restarted before they take effect.  The default values in this file: 

  - `cadtApiServerHosts`: List of CADT API servers
  - `apiTimeout`: API request timeout
  - `cadtUiHost`:  CADT UI host
  - `version`: Climate Wallet version

# Developer Guide

## Hierarchy

- `src`:
  - `assets`: fonts and images
  - `components`: react components
  - `config`: this project configs (env locales)
  - `constants`: this project constants
  - `electron`: electron start code
  - `hooks`: react custom hooks
  - `pages`: react page
  - `services`: rtk query service for api
  - `store`: redux store
  - `theme`: material-ui theme setting
  - `types`: typescript types
  - `util`: this project utilities


## Prerequisite

You will need a running instance of [Chia Wallet](https://www.chia.net/downloads/) before the next steps.

### Developer Installation and Configuration

- Setup submodule and follow submodule readme to stepup env

  ```sh
  git submodule update --init --recursive
  ```

- copy `.env` for submodule
  ```sh
  cp .env.submodule climate-token-driver/.env
  ```
- package submodule for dev and production

  ```sh
  npm run package-submodule
  ```

  submodule used `Climate Token Driver Suite` client service port `31314`


### Run from source for development

- [Install nodejs](https://nodejs.org/en/) or [NVM](https://github.com/nvm-sh/nvm)

- Make a `.env` file for your enviroment variables

  ```sh
  cp .env.example .env
  # change variables in .env
  ```

- Run main script

  ```sh
  npm i
  npm run dev
  ```

### Package app

- Windows

  ```sh
  #Build react and electron
  npm run build
  #Build submodule
  npm run package-submodule
  #Package the app
  npm run package-windows

  ```

- Mac

  ```sh
  #Build react and electron
  npm run build
  #Build submodule
  npm run package-submodule
  #Package the app
  npm run package-mac
  ```

## Contributing

[Signed commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) are required.

This repo uses a commit convention. A typical commit message might read:

```
    fix: correct home screen layout
```

The first part of this is the commit "type". The most common types are "feat" for new features, and "fix" for bugfixes. Using these commit types helps us correctly manage our version numbers and changelogs. Since our release process calculates new version numbers from our commits it is very important to get this right.

- `feat` is for introducing a new feature
- `fix` is for bug fixes
- `docs` for documentation only changes
- `style` is for code formatting only
- `refactor` is for changes to code which should not be detectable by users or testers
- `perf` is for a code change that improves performance
- `test` is for changes which only touch test files or related tooling
- `build` is for changes which only touch our develop/release tools
- `ci` is for changes to the continuous integration files and scripts
- `chore` is for changes that don't modify code, like a version bump
- `revert` is for reverting a previous commit

After the type and scope there should be a colon.  The "subject" of the commit follows. It should be a short indication of the change. The commit convention prefers that this is written in the present-imperative tense.

### Branch Layout

All pull requests should be made against the `develop` branch.  Commits to the `main` branch will trigger a release, so the `main` branch is always the code in the latest release.
