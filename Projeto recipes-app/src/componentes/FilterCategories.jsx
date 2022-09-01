import React, { useContext, useState } from 'react';
import RecipesContext from '../Provider/RecipesContext';

function FilterCategories() {
  const [toggleButton, setToggleButton] = useState(false);
  const maxCategore = 5;
  const { categoriesAll, setSearchInput,
    setFilterHeader } = useContext(RecipesContext);

  const btnClear = () => {
    setSearchInput('');
    setFilterHeader('Generic');
    setToggleButton(!toggleButton);
  };

  const setGetCategories = (el) => {
    if (toggleButton) {
      return btnClear();
    }
    setFilterHeader('Categories');
    setSearchInput(el);
    setToggleButton(true);
  };

  return (
    // req 20
    <div id="categorys">
      {categoriesAll.length > 0 && categoriesAll
        .filter((_e, i) => i < maxCategore).map((el, i) => (
          <button
            type="button"
            key={ i }
            data-testid={ `${el}-category-filter` }
            onClick={ () => setGetCategories(el) }
          >
            {el}

          </button>

        ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ btnClear }
      >
        All

      </button>

    </div>
  );
}

export default FilterCategories;
