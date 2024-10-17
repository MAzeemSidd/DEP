const db = require('../models/db');

// Get all properties
exports.getProperties = (req, res) => {
  db.query('SELECT * FROM properties', (err, results) => {
    if (err) return res.status(500).send('Error fetching properties');
    res.json(results);
  });
};

// Create new property
exports.createProperty = (req, res) => {
  const { title, description, price, address } = req.body;
  const userId = req.user.id;  // Assuming user ID is available from JWT token

  db.query(
    'INSERT INTO properties (user_id, title, description, price, address) VALUES (?, ?, ?, ?, ?)',
    [userId, title, description, price, address],
    (err, result) => {
      if (err) return res.status(500).send('Error creating property');
      res.status(201).send('Property created successfully');
    }
  );
};

// Update a property
exports.updateProperty = (req, res) => {
  const { id } = req.params;
  const { title, description, price, address, available } = req.body;

  db.query(
    'UPDATE properties SET title = ?, description = ?, price = ?, address = ?, available = ? WHERE id = ?',
    [title, description, price, address, available, id],
    (err, result) => {
      if (err) return res.status(500).send('Error updating property');
      res.send('Property updated successfully');
    }
  );
};

// Delete a property
exports.deleteProperty = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM properties WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send('Error deleting property');
    res.send('Property deleted successfully');
  });
};
