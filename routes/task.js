
const express = require('express');
const db = require('../models/database');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken, (req, res) => {
    const { title, description, status, assignee_id } = req.body;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    db.run(
        'INSERT INTO Tasks (title, description, status, assignee_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, status, assignee_id, createdAt, updatedAt],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not create task' });
            }
            res.status(201).json({ message: 'Task created' });
        }
    );
});

// GET route to read all tasks
router.get('/get', authenticateToken, (req, res) => {
    db.all('SELECT * FROM Tasks', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        res.status(200).json(rows);
    });
});

// GET route to read a specific task by ID 
router.get('/get/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM Tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(row);
    });
});

// PUT route to update a task by ID 
router.put('/update/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, description, status, assignee_id } = req.body;
    const updatedAt = new Date().toISOString();

    db.run(
        'UPDATE Tasks SET title = ?, description = ?, status = ?, assignee_id = ?, updated_at = ? WHERE id = ?',
        [title, description, status, assignee_id, updatedAt, id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not update task' });
            }
            res.status(200).json({ message: 'Task updated' });
        }
    );
});

// DELETE route to delete a task by ID 
router.delete('/delete/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM Tasks WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not delete task' });
        }
        res.status(200).json({ message: 'Task deleted' });
    });
});


module.exports = router;
