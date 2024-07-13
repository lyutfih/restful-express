const pool = require('../config/db');

const checkOrder = async (req, res, next) => {
 const id = req.params.id;

  try {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    req.order = rows[0];
    next();
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkOrder;