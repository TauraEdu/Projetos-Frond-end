const fetchProducts = async (products) => {
  // seu código aqui
  if (!products) return new Error('You must provide an url'); 
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${products}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
