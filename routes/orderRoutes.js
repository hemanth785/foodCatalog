const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route("/")
    //   .get(orderController.getFoodCatalog)
      .post(orderController.placeOrder);

module.exports = router;