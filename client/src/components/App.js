import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from '../page/Home.js';
import Recipe from '../page/Recipe';
import Header from './Header.js';
import Sidebar from './Sidebar';
import About from '../page/About';
import useFetch from '../hooks/useFetch';

export default function App () {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const {
    recipes,
    hasMore,
    loading,
    error,
  } = useFetch(query, pageNumber);
  const [formData, setFormData] = useState({
    vegetableOptions: {
      garlic: false, onion: false, tomato: false, potato: false, mushroom: false, avocado: false, carrots: false, broccoli: false, corn: false, romaine: false, squash: false, bokchoy: false, jalapeno: false, scallion: false, kale: false, cauliflower: false, cabbage: false, celery: false },
    dairyAndEggOptions: {
      butter: false, eggs: false, milk: false, yogurt: false, cream: false, buttermilk: false },
    fruitOptions: {
      strawberry: false, blueberry: false, orange: false, lemon: false, mango: false, coconut: false, apple: false, banana: false, watermelon: false, pineapple: false, peach: false, lime: false },
    meatOptions: {
      bacon: false, beef: false, chicken: false, ham: false, pork: false, sausage: false, prosciutto: false, chorizo: false, salami: false, lamb: false, bison: false }
  });

  function handleChange(e) {
    const {id, name, checked} = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        [id]: checked
      }
    }))
  }

  function findString() {
    const ingredients = Object.assign({}, ...Object.values(formData));
    const checkedItems = [];

    for (const item in ingredients) {
      if (ingredients[item]) {
        checkedItems.push(item);
      }
    }
    return checkedItems.join(', ');
  }

  function resetData() {
    axios.delete('/recipes').catch(err => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPageNumber(1);
    setQuery(findString());
    resetData();

    //closes sidebar after submitting the find recipe button
    document.body.classList.remove('open-sidebar');
  }


  return (
    <div>
      <div className="sidebar-display"></div>
      <Header />
      <Sidebar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}/>
      <Routes>
        <Route
          exact path='/'
          element={<Home
            recipes={recipes}
            loading={loading}
            error={error}
            hasMore={hasMore}
            setPageNumber={setPageNumber}
            />}
        />
        <Route
          path="/about"
          element={<About />}
        >
        </Route>
        <Route
          path="/recipes/:recipeId"
          element={<Recipe />}
        />
      </Routes>
    </div>
  )
}