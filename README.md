# subsidies

## Project setup

### Using Docker (recommended)

Start the development server:
```
docker compose up
```

The app will be available at http://localhost:8080

To rebuild after dependency changes:
```
docker compose up --build
```

To run in the background:
```
docker compose up -d
```

To stop:
```
docker compose down
```

### Using local Node.js

Requires Node.js version 22 or earlier.

```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```

#### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
