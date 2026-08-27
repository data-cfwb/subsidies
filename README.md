# subsidies

## Deployment and rollback

Deployments are manual. In GitHub, open **Actions** → **Deploy GitHub Pages** →
**Run workflow**, then enter the Git reference to publish:

- `main` deploys the current main branch.
- A tag or full commit SHA deploys that exact revision. To roll back, select the
  commit SHA of a known-good deployment and run the workflow again.

The workflow builds the selected revision and publishes it to the `gh-pages`
branch.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
