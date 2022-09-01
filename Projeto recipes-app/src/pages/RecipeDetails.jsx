import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams }
from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../Provider/RecipesContext';
import getProduct from '../fetchApi/FetchProduct';// erro no buscar o id
import getRecomendation from '../fetchApi/FetchRecomendation';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { setApiSelect } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const ApiSelect = (pathname.includes('foods')) ? 'foods' : 'drinks';
  const ApiRecomend = (pathname.includes('foods')) ? 'drinks' : 'foods';
  const MDrecomenda = (pathname.includes('foods')) ? 'Drink' : 'Meal';
  const localRecomenda = (pathname.includes('foods')) ? 'meals' : 'drinks';
  const inRecomenda = (pathname.includes('foods')) ? 'Meal' : 'Drink';
  const history = useHistory();

  const [data, setData] = useState({});
  const [recomendation, setRecomendation] = useState({});
  const [btnInProgress, setbtnInProgress] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const productInfo = async () => {
    const inProduct = await getProduct(ApiSelect, id);
    const inRecomendations = await getRecomendation(ApiRecomend);

    setData(inProduct);
    setRecomendation(inRecomendations);
  };

  const renderIngredients = () => {
    const inIngredients = (data[localRecomenda]) ? data[localRecomenda][0] : [];
    const inIngredents = Object.keys(inIngredients)
      .filter((el) => el.includes('strIngredient'));
    const dataINgredients = inIngredents.map((el) => data[localRecomenda][0][el])
      .filter((el) => el);

    const inMeasures = (data[localRecomenda]) ? data[localRecomenda][0] : [];
    const inMeasure = Object.keys(inMeasures)
      .filter((el) => el.includes('strMeasure'));
    const measures = inMeasure.map((el) => data[localRecomenda][0][el])
      .filter((el) => el !== ' ').filter((el) => el);

    return (dataINgredients.map((el, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${el} ${measures[index]}`}

      </li>

    )));
  };
  const keyValidation = () => {
    const cocktailsOrMeals = (pathname.includes('foods')) ? 'meals' : 'cocktails';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {
        'id-da-bebida': [''],
      },
      meals: {
        'id-da-comida': [''],
      },
    };
    const findItem = inProgressRecipes[cocktailsOrMeals][id];
    const validaItem = !!(findItem);
    setbtnInProgress(validaItem);
  };

  // req 34 localStorage na chave favoriteRecipes
  const keyValidationLocal = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const findItem = recipesFavorite.find((el) => el.id === id);
    const validaItem = !!(findItem);
    setIsFavorite(validaItem);
  };
  // Const para salvar receitas favoritas no localStorage
  const btnFavorite = () => {
    const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const type = (pathname.includes('foods')) ? 'food' : 'drink';
    console.log(data);
    setIsFavorite(!isFavorite);
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
    if (!isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...recipesFavorite, item]));
    } else {
      const filterItem = recipesFavorite.find((el) => el.id === !id) || [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterItem));
    }
  };

  useEffect(() => {
    productInfo();
    setApiSelect(ApiSelect);
    keyValidation();
    keyValidationLocal();
  }, []);

  return (
    <div className="div-card-info">
      {Object.keys(data).length > 0 && (
        <div className="image-recipe-details">
          <h1 data-testid="recipe-title">
            {data[localRecomenda][0][`str${inRecomenda}`]}

          </h1>
          <img
            data-testid="recipe-photo"
            // className="image-recipe-details"
            src={ data[localRecomenda][0]
              .strMealThumb
              || data[localRecomenda][0].strDrinkThumb }
            alt={ data[localRecomenda][0]
              .strMeal
              || data[localRecomenda][0].strDrink }
          />

          {
            localRecomenda === 'meals' ? (
              <p className="subtitle-recipe" data-testid="recipe-category">
                {data[localRecomenda][0].strCategory}
              </p>) : (
              (
                <p className="subtitle-recipe" data-testid="recipe-category">
                  {data[localRecomenda][0].strAlcoholic}

                </p>)
            )

          }
          <ul clasName="recipe-list">
            {renderIngredients()}
          </ul>

          <p className="recipe-instructions" data-testid="instructions">
            {data[localRecomenda][0].strInstructions}

          </p>

          {(ApiSelect === 'foods') && <iframe
            data-testid="video"
            width="300"
            className="recipe-video"
            src={ data[localRecomenda][0].strYoutube.replace('watch?v=', 'embed/') }
            title="wawd"
          />}

          <div className="recomendation-div, carousel">
            { recomendation.length > 0 && recomendation?.map((el, i) => (
              <div
                className="recomendation-card"
                // style={ { width: '160px' } }
                data-testid={ i.toString().concat('-recomendation-card') }
                key={ i }
              >
                {/* <img
                  src={ el[`str${MDrecomenda}Thumb`] }
                  alt={ el['str'.concat(MDrecomenda)] }
                  className="image-recomendation"
                /> */}
                <h1 data-testid={ i.toString().concat('-recomendation-title') }>
                  {el['str'.concat(MDrecomenda)]}
                </h1>
              </div>
            ))}
          </div>
          <div className="buttons-comp-Fav">

            <button
              type="button"
              data-testid="share-btn"
              src={ shareIcon }
              onClick={ () => { copy(`http://localhost:3000${pathname}`); setLinkCopied(true); } }
            >
              Compartilhar

            </button>
            {linkCopied && <span>Link copied!</span>}

            <button
              type="button"
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              onClick={ btnFavorite }
            >
              Favoritar

            </button>

          </div>
          {(!btnInProgress) ? (
            // req 28 e 31
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history.push(`/${ApiSelect}/${id}/in-progress`) }
            >
              Start Recipe

            </button>) : (

            (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-btn"
                onClick={ () => history.push(`/${ApiSelect}/${id}/in-progress`) }
              >
                Continue Recipe

              </button>))}

        </div>)}

    </div>
  );
}

export default RecipeDetails;
