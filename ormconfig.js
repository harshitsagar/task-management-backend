const { createConnection } = require('typeorm');

const isProduction = process.env.NODE_ENV === 'production';

const databaseUrl = process.env.DATABASE_URL;

module.exports = createConnection({
  type: 'postgres',
  url: databaseUrl,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  synchronize: true,
  logging: false,
  entities: [
    require('./entities/User'),
    require('./entities/Task'),
    require('./entities/RefreshToken')
  ]
});