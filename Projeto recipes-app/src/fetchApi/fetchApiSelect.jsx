const uRLFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const uRLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const getApiSelect = async (type, tipoFiltro, itemBuscado) => {
  const dataURLApi = { foods: {
    Generic: uRLFoods,
    Ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    Name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    'First Letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    Categories: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  },
  drinks: {
    Generic: uRLDrinks,
    Ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    Name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    'First Letter': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    Categories: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  },

  };

  const URL = dataURLApi[type][tipoFiltro] + itemBuscado;
  const response = await fetch(URL);
  const data = (itemBuscado || tipoFiltro === 'Generic')
    ? await response?.json() : response;
  return data;
};

export default getApiSelect;
