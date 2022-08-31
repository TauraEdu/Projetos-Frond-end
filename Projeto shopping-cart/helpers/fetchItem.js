const fetchItem = async (itemId) => {
  // seu código aqui  
    if (!itemId) return new Error('You must provide an url'); 
    const url = `https://api.mercadolibre.com/items/${itemId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
