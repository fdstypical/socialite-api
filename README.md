## Description

### Socialite App - social platform for finding interesting places and events around you

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the Database

`docker run -d --name postgres -e POSTGRES_PASSWORD=root -e POSTGRES_USER=postgres -p 5432:5432 postgres` - start postgres localy on port 5432.
