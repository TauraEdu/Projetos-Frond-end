require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', () => {   
    expect(typeof fetchProducts).toBe('function');
  });
  it('Teste se o parametro passado é o corrreto.', async () => {    
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint', async () => {    
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  }); 
  it('Teste se o objeto retornado esta correto', async () => {     
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna uma mesagem de erro', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
 