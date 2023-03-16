const express = require('express');
const app = express();
const config = require('./config');

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const menuRouter = require('./routes/menu');
app.use('/menu', menuRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

const port = config.port || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

