const config = require('../../config');
const axios = require('axios');
const Recipes = require('../../database/Recipes.js');
const mongoose = require('mongoose');

module.exports = {
  getAll: (req, res) => {
    axios.get(config.url, {
      params: {
        apiKey: config.apiKey,
        includeIngredients: req.query.ingredients,
        ignorePantry: true,
        number: 6,
        offset: req.query.offset,
        sort: 'max-used-ingredients',
        addRecipeInformation: true,
        instructionsRequired: true,
      }
    }).then((response) => {
      return response.data.results.map((recipe) => {
        const ingredients = [];
        const instructions = [];
        recipe.analyzedInstructions.forEach(instruction => {
          instruction.steps.forEach(step => {
            instructions.push(step.step)
            step.ingredients.forEach(ingredient => {
              ingredients.push(ingredient.name)
            })
          })
        })

        const recipeObj = {
          id: recipe.id,
          image: recipe.image,
          title: recipe.title,
          time: recipe.readyInMinutes,
          missingIngredients: recipe.missedIngredientCount,
          diets: recipe.diets,
          sourceLink: recipe.spoonacularSourceUrl,
          servings: recipe.servings,
          summary: recipe.summary.replace(/<[^>]*>?/gm, ''),
          instructions: instructions,
          ingredients: ingredients,
          sourceName: recipe.sourceName
        }
        return recipeObj;
      })
    }).then((recipes) => {
      Recipes.insertMany(recipes, function (err) {
        if (err) {
          res.status(404);
        } else {
          Recipes.find((err, response) => {
            if (err) {
              res.status(404).send('Failed');
            } else {
              res.status(200).send(response);
            }
          }).sort({ missingIngredients: 'asc'});
        }
      })
    })
  },
  findRecipe: (req, res) => {
    const userId = Number(req.params.recipeId);

    Recipes.findOne({ id: userId })
    .then(recipe => {
      res.status(200).send(recipe);
    }).catch(err => {
      res.status(404).send(err);
    })
  },
  deleteAll: (req, res) => {
    Recipes.deleteMany({})
    .then(() => {
      res.status(200);
    }).catch(err => {
      res.status(400);
    })
  }
}