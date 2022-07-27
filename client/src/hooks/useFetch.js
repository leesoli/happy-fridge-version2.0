import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setRecipes([]);
  }, [query])

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios.get('/recipes', { params: {
      ingredients: query,
      offset: (pageNumber - 1) * 6
    }}).then(res => {
      setRecipes(prevRecipe => {
        return [...new Set([...prevRecipe, ...res.data])];
      })
      setHasMore(res.data.length > 0);
      setLoading(false);
    }).catch(err => {
      setError(true);
    })
  }, [query, pageNumber])
  return { loading, error, recipes, hasMore }
}