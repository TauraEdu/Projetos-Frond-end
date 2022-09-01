import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from '../Provider/RecipesContext';

function Card({ el, i }) {
  const { setIdSelected } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const infoDetails = () => {
    setIdSelected(el.idMeal || el.idDrink);
    history.push(`${pathname}/${el.idMeal || el.idDrink}`);
  };
  return (
    <div data-testid={ `${i}-recipe-card` } className="cards-imgs">
      <button
        type="button"
        onClick={ infoDetails }
      >
        <img
          data-testid={ `${i}-card-img` }
          src={ el.strDrinkThumb || el.strMealThumb }
          alt={ el.strCategory }

        />
      </button>

      <p data-testid={ `${i}-card-name` }>{el.strDrink || el.strMeal}</p>
    </div>
  );
}

Card.propTypes = {
  el: PropTypes.node.isRequired,
  i: PropTypes.number.isRequired,

};

export default Card;
