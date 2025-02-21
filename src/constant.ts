export const Const = {
  TITLE_LENGTH: 255,
  DESC_LENGTH: 512,
  LOGIN_LENGTH: 36,
  err: {
    DB_UNAVAILABLE: 'Can\'t connect to database. Please check it\'s installed or dockerized and available at',
    DB_EXISTS: 'Database already exists',
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    TASK_NOT_FOUND: 'Task not found',
    UPDATE_IMPOSSIBLE: 'Body must contain at least one task parameter to update'
  },
  sql: {
    CREATE_DB: 'CREATE DATABASE'
  },
  CREATING_DATABASE: 'Trying to create database...',
  DB_CREATED: 'Database  created successfully',
  HELLO_WORLD: `Hello to OneRouteX test backend app!`,
  JWT_SECRET: 'ABCDE12345',
  IS_PUBLIC_KEY: 'IS_PUBLIC'
};
