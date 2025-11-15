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
      type: 'datetime'
    },
    userId: {
      type: 'int'
    },
    createdAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});