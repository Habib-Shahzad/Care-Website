export enum ConfigKeys {
  PORT = 'ENV_NAME',
  TOKEN_SECRET = 'TOKEN_SECRET',
  COOKIE_SECRET = 'COOKIE_SECRET',
  DATABASE_URL = 'DATABASE_URL',
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_USERNAME = 'DATABASE_USERNAME',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',

  IMAGE_BUCKET = 'IMAGE_BUCKET',
  AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID',
  AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY',
}

export default () => {
  const keys = Object.keys(ConfigKeys);
  const map = {};
  keys.forEach((key) => {
    map[key] = process.env[key];
  });
  return map;
};
