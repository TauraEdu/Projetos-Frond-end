require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Teste se fetch é chamado ao executar a função fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se fetch usa endpoint específico ao executar a função fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Teste se retorna o item correto', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('Teste se retorna erro quando fetchItem é passado sem argumentos ', async () => {
    expect(await fetchItem()).toEqual(new Error ('You must provide an url'));
  });
      
});
