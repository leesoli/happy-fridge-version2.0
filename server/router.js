const controller = require('./controller/getRecipe');
const express = require('express');
const router = express.Router();

router
  .get('/recipes', controller.getAll)
  .get('/recipes/:recipeId', controller.findRecipe)
  .delete('/recipes', controller.deleteAll)

module.exports = router;