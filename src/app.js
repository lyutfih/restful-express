const express = require('express');
const path = require('path');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

module.exports = app;