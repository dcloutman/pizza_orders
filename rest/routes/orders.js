const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config');

// create a MySQL connection pool
const pool = mysql.createPool(config.mysql);

// GET all orders
router.get('/', (req, res) => {
  pool.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// GET an order by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM orders WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Order Not Found');
      return;
    }
    res.json(results[0]);
  });
});

// POST a new order
router.post('/', (req, res) => {
  const { user_id, status, total } = req.body;
  pool.query(
    'INSERT INTO orders (user_id, status, total) VALUES (?, ?, ?)',
    [user_id, status, total],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        return;
      }
      const newOrder = { id: result.insertId, user_id, status, total };
      res.json(newOrder);
    }
  );
});

// PUT update an order by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { user_id, status, total } = req.body;
  pool.query(
    'UPDATE orders SET user_id = ?, status = ?, total = ? WHERE id = ?',
    [user_id, status, total, id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('Order Not Found');
        return;
      }
      const updatedOrder = { id, user_id, status, total };
      res.json(updatedOrder);
    }
  );
});

// DELETE an order by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM orders WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Order Not Found');
      return;
    }
    res.status(204).send();
  });
});

module.exports = router;

