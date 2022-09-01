import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../componentes/Header';
import Recipes from '../componentes/Recipes';
import Footer from '../componentes/Footer';
import RecipesContext from '../Provider/RecipesContext';
import FilterCategories from '../componentes/FilterCategories';
import '../css/drinks.css';

function Drinks() {
  const { setApiSelect } = useContext(RecipesContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setApiSelect(pathname.slice(1));
  }, []);
  return (
    <div className="div">
      <Header title="Drinks" />
      <FilterCategories />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
