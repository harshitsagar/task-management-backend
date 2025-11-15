const express = require('express');
const { getRepository } = require('typeorm');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all tasks with pagination, filtering, and searching
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const taskRepository = getRepository('Task');
    
    let query = taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId: req.user.userId })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('task.createdAt', 'DESC');

    if (status) {
      query = query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query = query.andWhere('task.title LIKE :search', { search: `%${search}%` });
    }

    const [tasks, total] = await query.getManyAndCount();

    res.json({
      tasks,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single task
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const taskRepository = getRepository('Task');
    const task = await taskRepository.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const taskRepository = getRepository('Task');
    const task = taskRepository.create({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: req.user.userId
    });

    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update task
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const taskRepository = getRepository('Task');
    const task = await taskRepository.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    taskRepository.merge(task, req.body);
    task.updatedAt = new Date();
    await taskRepository.save(task);
    
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const taskRepository = getRepository('Task');
    const task = await taskRepository.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await taskRepository.remove(task);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle task status
router.patch('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const taskRepository = getRepository('Task');
    const task = await taskRepository.findOne({
      where: { id: req.params.id, userId: req.user.userId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = task.status === 'completed' ? 'pending' : 'completed';
    task.updatedAt = new Date();
    await taskRepository.save(task);
    
    res.json(task);
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;