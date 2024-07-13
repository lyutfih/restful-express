const pool = require('../config/db');

const getAllUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');

        if(rows.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(rows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserById = async (req, res, next) => {
    res.json(req.order);
};

const getUserOrders = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);

        if(rows.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(rows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const { first_name, last_name, age } = req.body;

    try {
        const { rows } = await pool.query('INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, age]);

        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { first_name, last_name, age } = req.body;

    try {
        const { rows } = await pool.query('UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *', [first_name, last_name, age, req.user.id]);

        res.json(rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const setUserStatus = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);

        if(rows.length === 0) {
            await pool.query('UPDATE users SET active = false WHERE id = $1', [req.user.id]);
            return res.status(404).json({ message: 'User is inactive' });
        }

        return res.status(200).json({ message: 'User is active' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);

        res.status(200).json({ message: `User ${req.order.id} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllUsers, getUserById, getUserOrders, createUser, updateUser, setUserStatus, deleteUser };