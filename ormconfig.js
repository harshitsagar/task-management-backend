const { createConnection } = require('typeorm');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = createConnection({
  type: isProduction ? 'postgres' : 'sqlite',
  database: isProduction ? process.env.DB_NAME : 'database.sqlite',
  
  // PostgreSQL configuration (for production)
  ...(isProduction ? {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  } : {}),
  
  // SQLite configuration (for development)
  ...(!isProduction ? {
    database: 'database.sqlite'
  } : {}),
  
  synchronize: true,
  logging: false,
  entities: [
    require('./entities/User'),
    require('./entities/Task'),
    require('./entities/RefreshToken')
  ]
});