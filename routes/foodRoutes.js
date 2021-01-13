const express = require('express');
const foodController = require('../controllers/foodController');

const router = express.Router();

router.route("/")
      .get(foodController.getFoodCatalog)
      .post(foodController.addFood);

module.exports = router;