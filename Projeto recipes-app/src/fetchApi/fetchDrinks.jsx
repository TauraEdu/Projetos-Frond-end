// const fetchDrinks = async (radioSelected, ingrediente, name, primeiraLetra) => {
//   let response = '';
//   switch (radioSelected) {
//   case 'ingredient':
//     response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
//     break;
//   case 'name':
//     response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
//     break;
//   case 'first-letter':
//     response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
//     break;
//   default:
//     return 'Radio not selected';
//   }

//   let json = '';
//   try { json = await response.json(); } catch (error) { json = { drinks: null }; }

//   return response.ok ? Promise.resolve(json) : Promise.reject(json);
// };

// export default fetchDrinks;
