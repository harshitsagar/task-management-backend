const { createConnection } = require('typeorm');

console.log('🔧 PRODUCTION: Using PostgreSQL on Render');
console.log('🔧 DATABASE_URL:', process.env.DATABASE_URL ? 'Exists' : 'Missing');

module.exports = createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true,
  logging: false,
  entities: [
    require('./entities/User'),
    require('./entities/Task'),
    require('./entities/RefreshToken')
  ]
});