import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../componentes/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [done, setDone] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [typeFilter, settypeFilter] = useState('all');

  const history = useHistory();
  const getDoneLocal = () => {
    const inRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
     || [];

    let recipesFavorite;
    if (typeFilter === 'all') {
      recipesFavorite = inRecipes;
    } else {
      recipesFavorite = inRecipes
        .filter((el) => el.type === typeFilter);
    }
    setDone(recipesFavorite);
  };
  // função para salvar os novos favoritos no localStorage
  const btnFavorite = (el) => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'))
     || [];
    setIsDone(!isDone);

    const filterItem = recipesFavorite
      .filter((favItem) => favItem.id !== el.id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(filterItem));
  };

  useEffect(() => {
    getDoneLocal();
  }, [isDone]);

  useEffect(() => {
    getDoneLocal();
  }, [typeFilter]);

  return (
    <div>
      <Header title="Done Recipes" />

      <div className="done-btns">
        {/* // req 48 */}
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
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => settypeFilter('all') }
        >
          All

        </button>
      </div>

      <div>
        {done.length > 0 && done.map((el, index) => (
          <div key={ index } data-testid="divs-done">
            <button
              type="button"
              onClick={ () => history
                .push(`${(el.type === 'food') ? 'foods' : 'drinks'}/${el.id}`) }
            >
              <img
                src={ el.image }
                alt={ el.name }
                className="horizontal-image"
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
                .push(`${(el.type === 'food') ? 'foods' : 'drinks'}/${el.id}`) }
            >

              <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
            </button>

            <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>

            <p>
              {el.tags.map((tag, i) => (
                <div
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </div>))}

            </p>

            <button
            // req 45 e 46
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => {
                copy(`http://localhost:3000/${(el.type === 'food') ? 'foods' : 'drinks'}/${el.id}`); setLinkCopied(true);
              } }
            >
              Compartilhar

            </button>
            {linkCopied && <span>Link copied!</span>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              onClick={ () => btnFavorite(el) }
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
