const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool(config.mysql);

// Get all menu items
router.get('/', (req, res) => {
  pool.query('SELECT * FROM menu_items', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Get a specific menu item by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM menu_items WHERE id = ?', [id], (error, results, fields) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.sendStatus(404);
    }
  });
});

// Create a new menu item
router.post('/', (req, res) => {
  const { name, description, price, is_pizza } = req.body;
  pool.query('INSERT INTO menu_items (name, description, price, is_pizza) VALUES (?, ?, ?, ?)', [name, description, price, is_pizza], (error, results, fields) => {
    if (error) throw error;
    res.json({ id: results.insertId });
  });
});

// Update a menu item by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, description, price, is_pizza } = req.body;
  pool.query('UPDATE menu_items SET name = ?, description = ?, price = ?, is_pizza = ? WHERE id = ?', [name, description, price, is_pizza, id], (error, results, fields) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

// Delete a menu item by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM menu_items WHERE id = ?', [id], (error, results, fields) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;

