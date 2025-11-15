const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar',
      length: 100
    },
    email: {
      type: 'varchar',
      unique: true,
      length: 100
    },
    password: {
      type: 'varchar'
    },
    createdAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});