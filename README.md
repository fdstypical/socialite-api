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

## Environments

#### Requirements

- Must be in the root of the project
- Filename format should be: .\*.env
- Available environments: test, development, production

#### Example env

```
# .*.env
BASE_URL=https://some.domain.com/
PORT=3000
DB_NAME=postgres
DB_USERNAME=postgres
DB_PASSWORD=root
DB_PORT=5432
DB_HOST=localhost
MULTER_DEST=static
JWT_ACCESS_SECRET=**********
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_SECRET=**********
JWT_REFRESH_EXPIRES_IN=30d
```

## Running the Database

`docker run -d --name postgres -e POSTGRES_PASSWORD=root -e POSTGRES_USER=postgres -p 5432:5432 postgres` - start postgres localy on port 5432.

## Migrations

`db:migrate:status` - status
`db:migrate` - run migrations
`db:migrate:undo` - undo last migration
`migration:gen` -- generate new migrations _example: migration:gen -- --name create_tablex_

## Git-hooks

#### To prepare git-hooks run

```bash
$ npm run husky:prepare
```
