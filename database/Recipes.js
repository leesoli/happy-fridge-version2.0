const mongoose = require('mongoose');
const db = require('./index');

const Schema = mongoose.Schema;

const recipesSchema = new Schema({
  id: Number,
  image: String,
  title: String,
  time: Number,
  missingIngredients: Number,
  diets: Array,
  sourceLink: String,
  servings: Number,
  summary: String,
  instructions: Array,
  ingredients: Array,
  sourceName: String,
})

const Recipes = mongoose.model('Recipe', recipesSchema);

module.exports = Recipes;