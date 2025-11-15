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
      type: 'datetime',
      nullable: true
    },
    userId: {
      type: 'int'
    },
    createdAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP'
    },
    updatedAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP'
    }
  }
});