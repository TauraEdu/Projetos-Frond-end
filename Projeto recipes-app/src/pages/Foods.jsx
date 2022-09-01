import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom/';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Recipes from '../componentes/Recipes';
import FilterCategories from '../componentes/FilterCategories';
import '../css/foods.css';

import RecipesContext from '../Provider/RecipesContext';

function Foods() {
  const { setApiSelect } = useContext(RecipesContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setApiSelect(pathname.slice(1));
  }, []);
  return (
    <div>
      <Header title="Foods" />
      <FilterCategories />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
