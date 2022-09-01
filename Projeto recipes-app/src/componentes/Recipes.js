import React, { useContext } from 'react';
import RecipesContext from '../Provider/RecipesContext';
import Card from './Card';

function Recipes() {
  const { responseApiFilter } = useContext(RecipesContext);
  const dataApi = responseApiFilter.drinks
   || responseApiFilter.meals
   || [];
  const maxCard = 12;
  const data = dataApi
    .filter((el, i) => i < maxCard);

  return (
    <div id="recipes">
      {data.length > 0 && data.map((card, i) => (
        <Card el={ card } i={ i } key={ i } />
      ))}

    </div>
  );
}

export default Recipes;
