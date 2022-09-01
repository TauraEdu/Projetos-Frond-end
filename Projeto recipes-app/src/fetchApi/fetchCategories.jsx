const getCategories = async (type = 'foods') => {
  const dataApi = { foods: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  };
  const response = await fetch(dataApi[type]);

  const data = await (response)?.json();
  return data;
};

export default getCategories;
