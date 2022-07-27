import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Recipe () {
  const {recipeId} = useParams();
  const [currentRecipe, setCurrentRecipe] = useState();

  useEffect(() => {
    axios.get(`/recipes/${recipeId}`)
      .then(response => {
        setCurrentRecipe(response.data);
      })
      .catch(err => console.log(err))
  }, [])

  if (currentRecipe) {
    return (
      <div className="current-recipe-page">
        <div className="current-recipe-container">
          <span className="current-recipe-title">{currentRecipe.title}</span>

          <div className="current-recipe-summary">{currentRecipe.summary.split('.').splice(0, 4).join('.').concat('.')}</div>

          {currentRecipe.sourceName && <div>By
            <a
              href={`${currentRecipe.sourceLink}`}
              className="current-recipe-source"
            >
              {currentRecipe.sourceName}
            </a>
          </div>}

          <img className="current-recipe-image" src={currentRecipe.image} />

          <div className="current-recipe-about">
            <span className="current-recipe-about__title">About this Recipe</span>

            <div className="current-recipe-about__info">
              <span>{currentRecipe.servings} Servings</span>
              <span>Prep time: {currentRecipe.time} Mins </span>
            </div>

            <div className="current-recipe-about__diets">
            <h3>Special Diet</h3>
              <ul className="diets-list">
                {currentRecipe.diets.map((diet, index) => {
                  return <li className="diet-item" key={index}>{diet}</li>
                })}
              </ul>
            </div>

            <div className="current-recipe-about__ingredients">
            <h3>Ingredients</h3>
              <ul className="ingredient-list">
                {currentRecipe.ingredients.map((ingredient, index) => {
                  return <li className="ingredient-item" key={index}>{ingredient}</li>
                })}
              </ul>
            </div>
          </div>


          {currentRecipe.instructions.map((instruction, index) => {
            return (
            <div className="current-recipe__instructions" key={`i-${index}`}>{instruction}</div>
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}