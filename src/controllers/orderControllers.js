const pool = require('../config/db');

const getAllOrders = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM orders');

        if(rows.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(rows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    res.json(req.order);
};

const createOrder = async (req, res) => {
    const { price, user_id } = req.body;

    try {
        const { rows } = await pool.query('INSERT INTO orders (price, user_id) VALUES ($1, $2) RETURNING *', [price, user_id]);

        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    const { price, user_id } = req.body;

    try {
        const { rows } = await pool.query('UPDATE orders SET price = $1, user_id = $2 WHERE id = $3 RETURNING *', [price, user_id, req.order.id]);

        res.json(rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        await pool.query('DELETE FROM orders WHERE id = $1', [req.order.id]);

        res.status(200).json({ message: `Order ${req.order.id} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };