# Better Changesets

A forked and improved version of the [Changesets](https://github.com/changesets/changesets) library, featuring a consolidated architecture and a built-in GitHub Action.

## Features

-   **Simplified Core**: Logic from `apply`, `assemble`, and `get` release plans is consolidated into `@changesets/release-core`.
-   **Unified Action**: The GitHub Action is included in the monorepo at `packages/action` and versioned alongside the CLI.
-   **Better CLI**: Improved CLI tools with fewer internal dependencies.

## Installation

```bash
yarn add @changesets/cli
```

## Usage

### CLI

Initialize changesets in your project:

```bash
yarn changeset init
```

Add a changeset:

```bash
yarn changeset
```

### GitHub Action

To use the built-in GitHub Action in your workflow, reference `ehudt/better-changesets/packages/action@main`.

#### Example Workflow

Create a file `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${ { github.workflow } }-${ { github.ref } }

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'yarn'

      - name: Install Dependencies
        run: yarn install

      - name: Create Release Pull Request or Publish
        uses: ehudt/better-changesets/packages/action@main
        with:
          # Command to update versions (creates PR)
          version: yarn changeset version
          # Command to publish packages (runs on merge)
          publish: yarn changeset publish
        env:
          GITHUB_TOKEN: ${ { secrets.GITHUB_TOKEN } }
          NPM_TOKEN: ${ { secrets.NPM_TOKEN } }
```
