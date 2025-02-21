## Description
OneRouteX Test task implementation by Michael Lampu (https://github.com/nestjs/nest).

## Pre-requisites
1. Node.js v.23.0 or higher installed
2. PostgreSQL database engine running.

## Project setup
```bash
$ npm install
```
## Add environment variables to the project's root dir.
Substitue values by real ones according to your exact configuration
```bash
echo 'DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_PORT=5432
DB_NAME=test
BACKEND_PORT=3000' >> .env
```
Database {DB_NAME} will be automatically created in PostgreSQL at app's startup if not exists.

## Compile and run the project
```bash
# 1. Build
$ npm run build

# 2. Run
$ npm run start:prod
```

## API documentation
Full API documentation and all required testing tools will be available after project start at http://localhost:{BACKEND_PORT}/api/doc
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```