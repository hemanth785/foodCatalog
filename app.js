const express = require("express");
const path = require("path")
const morgan = require("morgan");

const foodRouter = require('./routes/foodRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();

app.use(express.json());

//  MIDDLEWARES
app.use(morgan('dev'));

// console.log(process.env);


app.get("/",(req,res) => {
    res.status(200).send('Welcome');
});

//ROUTERS
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/order', orderRouter);

module.exports = app;