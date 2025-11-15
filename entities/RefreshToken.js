const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'RefreshToken',
  tableName: 'refresh_tokens',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    token: {
      type: 'varchar',
      unique: true
    },
    expiresAt: {
      type: 'timestamp'  // Changed from 'datetime' to 'timestamp'
    },
    userId: {
      type: 'int'
    },
    createdAt: {
      type: 'timestamp',  // Changed from 'datetime' to 'timestamp'
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});