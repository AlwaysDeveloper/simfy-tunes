## Description
Simpfy-tunes is microservice based on NestJs API framework running in node js. 
It is using Postgresql as database with Sequelize as ORM. 
For authentication JWT has been used.

## Setup DB using Docker compse
```bash
$ docker-compose up
```

## Running Sequelize migrations
```bash
$ npx sequelize db:migrate
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

## Apis Documentation
http://localhost:3000/api

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
