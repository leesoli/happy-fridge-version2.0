import React, { useState, useEffect, useRef, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { IoTimerOutline } from 'react-icons/io5';
import {switchBackground} from '../helpers';

export default function Home (props) {
  const observer = useRef(null);

  const lastRecipe = useCallback(node => {
    if (props.loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && props.hasMore) {
        props.setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [props.loading, props.hasMore])

  return (
    <main className="recipe-page">
      <h2 className="recipes-list-title">Recommended Recipes for You</h2>
      <div className="recipes-list">
          {props.recipes.map((recipe, index) => {
            if (props.recipes.length === index + 1) {
              return (
                <Link
                  to={`/recipes/${recipe.id}`}
                  key={recipe.id}
                  onClick={() => switchBackground(false)}
                  ref={lastRecipe}
                >
                  <div className="recipe-container">
                    <img
                      className="recipe-image"
                      src={recipe.image}
                    />

                    <div
                      className="recipe-info-container">
                      {recipe.missingIngredients &&
                      <div className="recipe-ingredients">Needs {recipe.missingIngredients} More Ingredients</div>}

                      <div className="recipe-title">{recipe.title}</div>

                      <div className="recipe-time">
                        <IoTimerOutline className="timer-icon"/>
                        <div className="recipe-timer-info">{recipe.time} Mins</div>
                      </div>

                    </div>
                  </div>
                </Link>
              )
            } else {
              return (
                <Link
                  to={`/recipes/${recipe.id}`}
                  key={recipe.id}
                  onClick={() => switchBackground(false)}
                >
                  <div className="recipe-container">
                    <img
                      className="recipe-image"
                      src={recipe.image}
                    />

                    <div className="recipe-info-container">
                      {recipe.missingIngredients &&
                      <div className="recipe-ingredients">Needs {recipe.missingIngredients} More Ingredients</div>}

                      <div className="recipe-title">{recipe.title}</div>

                      <div className="recipe-time">
                        <IoTimerOutline className="timer-icon"/>
                        <div className="recipe-timer-info">{recipe.time} Mins</div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }
          })}
          {props.loading && <div className="status-message">Loading...</div>}
          {props.error && <div className="status-message">Error</div>}
      </div>
    </main>
  )
}