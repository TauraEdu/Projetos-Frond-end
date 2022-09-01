import React, {
  useContext,
  useEffect,
  useState } from 'react';
import {
  useHistory,
  useLocation,
  useParams } from 'react-router-dom/';
import copy from 'clipboard-copy';
import RecipesContext from '../Provider/RecipesContext';
import getProduct from '../fetchApi/FetchProduct';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ProgressoFood() {
  const { setApiSelect } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const ApiSelect = (pathname.includes('foods')) ? 'foods' : 'drinks';
  const localRecomenda = (pathname.includes('foods')) ? 'meals' : 'drinks';
  const inRecomenda = (pathname.includes('foods')) ? 'Meal' : 'Drink';
  const cocktailOrMeals = (pathname.includes('foods')) ? 'meals' : 'cocktails';

  const [data, setData] = useState({});

  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const [disabled, setDisabeld] = useState(true);

  // Chama a api com a id
  const productInfo = async () => {
    const inProduct = await getProduct(ApiSelect, id);
    setData(inProduct);
  };
  const getDataLocalStorage = async () => {
    const progressLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const progressItem = progressLocalStorage[cocktailOrMeals][id] || [];
    setIngredients(progressItem);
  };

  const keyValidationLocal = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const findItem = recipesFavorite.find((el) => el.id === id);
    const validaItem = !!(findItem);
    setIsFavorited(validaItem);
  };

  const Btnnewfavorit = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const type = (pathname.includes('foods')) ? 'food' : 'drink';
    setIsFavorited(!isFavorited);
    const item = {
      id,
      type,
      nationality: (ApiSelect === 'foods') ? data[localRecomenda][0].strArea : '',
      category: data[localRecomenda][0].strCategory,
      alcoholicOrNot: (ApiSelect === 'drinks')
        ? data[localRecomenda][0].strAlcoholic : '',
      name: data[localRecomenda][0][`str${inRecomenda}`],
      image: data[localRecomenda][0].strMealThumb
|| data[localRecomenda][0].strDrinkThumb,

    };
    if (!isFavorited) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...recipesFavorite, item]));
    } else {
      const filterItem = recipesFavorite.find((el) => el.id === !id) || [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterItem));
    }
  };
  // req 42 logica do button
  const enableButton = (ingredient, progressLocalStorage, dataINgredients) => {
    const progressItem = progressLocalStorage[cocktailOrMeals][id] || [];

    const itemSelected = progressItem.find((el) => el === ingredient);

    if (!itemSelected) {
      const dataLocalStorage = { ...progressLocalStorage,
        [cocktailOrMeals]: { [id]: [...progressItem, ingredient] } };

      setIngredients([...progressItem, ingredient]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(dataLocalStorage));
    } else {
      const setIngredientsLocalStorage = progressItem
        .filter((el) => el !== ingredient);

      const dataLocalStorage = { ...progressLocalStorage,
        [cocktailOrMeals]: { [id]: setIngredientsLocalStorage } };

      setIngredients(setIngredientsLocalStorage);

      localStorage.setItem('inProgressRecipes',
        JSON.stringify(dataLocalStorage));
    }

    if (ingredients.length === dataINgredients.length - 1 && !itemSelected) {
      setDisabeld(false);
    } else {
      setDisabeld(true);
    }
  };

  useEffect(() => {
    productInfo();
    setApiSelect(ApiSelect);
    keyValidationLocal();
    getDataLocalStorage();
  }, []);

  useEffect(() => {
    const sec = 1000;
    const link = () => {
      if (linkCopied) setLinkCopied(false);
    };
    setTimeout(() => { link(); }, sec);
  }, [linkCopied]);

  const renderIngredients = () => {
    const inIngredients = data[localRecomenda][0];
    const inIngredents = Object.keys(inIngredients)
      .filter((el) => el.includes('strIngredient'));
    const dataINgredients = inIngredents.map((el) => data[localRecomenda][0][el])
      .filter((el) => el);

    const inMeasures = data[localRecomenda][0];
    const inMeasure = Object.keys(inMeasures)
      .filter((el) => el.includes('strMeasure'));
    const measures = inMeasure.map((el) => data[localRecomenda][0][el])
      .filter((el) => el !== ' ').filter((el) => el);

    const progressLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };

    return (
      // req 38
      dataINgredients.map((el, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <label htmlFor={ `${index}${el}` }>

            <input
              className="check"
              id={ `${index}${el}` }
              type="checkbox"
              data-testid={ `${index}-input-ingredient` }
              onChange={ () => enableButton(el, progressLocalStorage, dataINgredients) }
              checked={ ingredients
                .find((u) => u === el) === el
                 || false }
              name={ index + 1 }
            />
            {' '}
            <span>{`${el} ${measures[index]} `}</span>
          </label>
        </div>

      )));
  };

  return (
    // req 37,42 e 43
    <div className="div-progresso">

      {Object.keys(data).length > 0 && (
        <div>
          <img
            className="progress-img"
            data-testid="recipe-photo"
            src={ data[localRecomenda][0]
              .strMealThumb
              || data[localRecomenda][0]
                .strDrinkThumb }
            alt={ data[localRecomenda][0]
              .strMeal
              || data[localRecomenda][0]
                .strDrink }
          />
          <h1 data-testid="recipe-title">
            {data[localRecomenda][0][`str${inRecomenda}`]}
          </h1>
          <div className="share-fav-btn">
            <input
              type="image"
              data-testid="share-btn"
              src={ shareIcon }
              alt="Compartilhar"
              onClick={ () => { copy(`http://localhost:3000/${ApiSelect}/${id}`); setLinkCopied(true); } }
            />

            {linkCopied && <span>Link copied!</span>}

            <input
              type="image"
              data-testid="favorite-btn"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="Favoritar"
              onClick={ Btnnewfavorit }
            />
          </div>
          {
            localRecomenda === 'meals' ? (
              <p className="subtitle-recipe" data-testid="recipe-category">
                {data[localRecomenda][0]
                  .strCategory}
              </p>) : (
              (
                <p
                  className="subtitle-recipe"
                  data-testid="recipe-category"
                >
                  {data[localRecomenda][0]
                    .strAlcoholic}
                </p>)
            )
          }
          {renderIngredients()}

          <p
            className="recipe-instructions"
            data-testid="instructions"
          >
            {data[localRecomenda][0].strInstructions}

          </p>
          <button
            className="finish-recipe-btn"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ disabled }
            onClick={ () => history.push('/done-recipes') }
          >
            Finalizar
          </button>
        </div>)}
    </div>
  );
}

export default ProgressoFood;
