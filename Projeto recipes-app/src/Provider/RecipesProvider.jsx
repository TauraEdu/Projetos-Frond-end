/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import getApiSelect from '../fetchApi/fetchApiSelect';
import getCategories from '../fetchApi/fetchCategories';

function RecipesProvider({ children }) {
  const history = useHistory();
  // const [inputheader, setInputheader] = useState(false);

  const [SearchInput, setSearchInput] = useState('');
  const [FilterHeader, setFilterHeader] = useState('');
  const [ApiSelect, setApiSelect] = useState('foods');
  const [idSelected, setIdSelected] = useState('');
  const [categoriesAll, setcategoriesAll] = useState([]);
  const [responseApiFilter, setresponseApiFilter] = useState([]);
  const context = {
    // inputheader,
    // setInputheader,
    SearchInput,
    setSearchInput,
    FilterHeader,
    setFilterHeader,
    responseApiFilter,
    setresponseApiFilter,
    setApiSelect,
    categoriesAll,
    idSelected,
    setIdSelected,

  };

  // buscar a api para pegar as categorias
  // req 20
  const getcategoriesAll = async () => {
    const dataApi = await getCategories(ApiSelect);
    const apiCategories = dataApi.meals || dataApi.drinks;
    const categories = apiCategories.map((el) => el.strCategory);
    setcategoriesAll(categories);
  };

  const setDataSelect = async () => {
    const data = await getApiSelect(ApiSelect, 'Generic', SearchInput);
    setresponseApiFilter(data);
  };
  // req 15.
  const setInApi = async () => {
    if (FilterHeader === 'First Letter' && SearchInput.toString().length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const data = await getApiSelect(ApiSelect, FilterHeader, SearchInput);

    if (data.meals?.length === 1 && FilterHeader !== 'Categories') {
      history.push(`/foods/${data.meals[0].idMeal}`);
    }
    if (data.drinks?.length === 1 && FilterHeader !== 'Categories') {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
    if ((data.drinks === null || data.meals === null) && FilterHeader) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setresponseApiFilter(data);
  };

  useEffect(() => {
    setDataSelect();
    getcategoriesAll();
  }, [ApiSelect]);

  useEffect(() => {
    setInApi();
  }, [FilterHeader]);

  return (
    <RecipesContext.Provider
      value={ context }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
