const getProduct = async (type, id) => {
  const dataApi = { foods: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  };
  const response = await fetch(`${dataApi[type]}${id}`);
  const data = await (response)?.json();
  return data;
};

export default getProduct;
