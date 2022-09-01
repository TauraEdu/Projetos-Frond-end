import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../componentes/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [RecipesFav, setRecipesFav] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [typeFilter, settypeFilter] = useState('all');
  const history = useHistory();

  const favoriteLocalStorage = () => {
    const dtfRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let recipesFavorite;
    if (typeFilter === 'all') {
      recipesFavorite = dtfRecipes;
    } else {
      recipesFavorite = dtfRecipes
        .filter((el) => el.type === typeFilter);
    }
    setRecipesFav(recipesFavorite);
  };

  const newDatafavo = (el) => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(!isFavorite);
    const filterItem = recipesFavorite.filter((favItem) => favItem.id !== el.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterItem));
  };

  useEffect(() => {
    favoriteLocalStorage();
  }, [isFavorite]);

  useEffect(() => {
    favoriteLocalStorage();
  }, [typeFilter]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => settypeFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => settypeFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => settypeFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {RecipesFav && RecipesFav.map((el, index) => (
          <div key={ index } data-testid="divs-fav">
            <button
              type="button"
              onClick={ () => history.push(`${(el.type === 'food') ? 'foods'
                : 'drinks'}/${el.id}`) }
            >
              <img
                className="img-recipes, horizontal-image"
                src={ el.image }
                alt={ el.name }
                data-testid={ `${index}-horizontal-image` }
              />

            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {(el.type === 'food')
                ? `${el.nationality} - ${el.category}` : el.alcoholicOrNot }

            </p>
            <button
              type="button"
              onClick={ () => history
                .push(`${
                  (el.type === 'food')
                    ? 'foods'
                    : 'drinks'}/${el.id}`) }
            >

              <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => { copy(`http://localhost:3000/${(el.type === 'food') ? 'foods' : 'drinks'}/${el.id}`); setLinkCopied(true); } }
            >
              Compartilhar

            </button>
            {linkCopied && <span>Link copied!</span>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              onClick={ () => newDatafavo(el) }
            >
              Favorite
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FavoriteRecipes;
