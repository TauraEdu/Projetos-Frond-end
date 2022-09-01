const ApiFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ApiDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const getRecomendation = async (type) => {
  const maxCard = 6;
  const ApiRecomenda = type === 'foods' ? 'meals' : 'drinks';
  const Api = { foods: ApiFoods,
    drinks: ApiDrinks,
  };
  const response = await fetch(`${Api[type]}`);

  const dataApi = await (response)?.json();
  const data = dataApi[ApiRecomenda].filter((el, i) => i < maxCard);
  return data;
};

export default getRecomendation;
