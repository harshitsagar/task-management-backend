const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    title: {
      type: 'varchar',
      length: 255
    },
    description: {
      type: 'text',
      nullable: true
    },
    status: {
      type: 'varchar',
      default: 'pending'
    },
    dueDate: {
      type: 'timestamp',  // Changed from 'datetime' to 'timestamp'
      nullable: true
    },
    userId: {
      type: 'int'
    },
    createdAt: {
      type: 'timestamp',  // Changed from 'datetime' to 'timestamp'
      default: () => 'CURRENT_TIMESTAMP'
    },
    updatedAt: {
      type: 'timestamp',  // Changed from 'datetime' to 'timestamp'
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});