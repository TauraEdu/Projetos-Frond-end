import React, { useContext, useState } from 'react';
import RecipesContext from '../Provider/RecipesContext';

function SearchBar() {
  const { SearchInput, setSearchInput, setFilterHeader } = useContext(RecipesContext);
  const [inputRadios, setInputRadio] = useState('');
  return (
    <div id="search-bar">
      {/* // req 10 e 11 */}
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="filter-header"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          onChange={ ({ target }) => setInputRadio(target.value) }
        />
        {' '}
        Ingredient
      </label>

      <label htmlFor="name-search-radio">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="filter-header"
          id="name-search-radio"
          value="Name"
          onChange={ ({ target }) => setInputRadio(target.value) }
        />
        {' '}
        Name
      </label>

      <label htmlFor="name-search-radiofirst-letter-search-radio">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="filter-header"
          id="first-letter-search-radio"
          value="First Letter"
          onChange={ ({ target }) => setInputRadio(target.value) }
        />
        {' '}
        First Letter
      </label>
      {/* // req 09 */}
      <input
        data-testid="search-input"
        name="search-input"
        value={ SearchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => setFilterHeader(inputRadios) }
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;
