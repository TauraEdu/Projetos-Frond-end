import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import mockPlanets from './mockPlanets';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.spyOn(global, "fetch");
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockPlanets),
    }));
  }
);
  
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testa o retorno da API', () => {
  test('Verifica se renderizado, deve esperar a chamada da API pelos planetas', async () => {
  
    await act( async () => render(<App/>));
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });
});

describe('Cerifica funcionalidade dos filtros na tabela', () => {
  test('Verifica o input pesquisa por nome do planeta', async () => {
 
    await act( async () => render(<App/>));
    const inputName = await screen.findByTestId('name-filter');
    userEvent.type(inputName, 'o');
    const planets = await screen.findAllByRole('row');
    expect(planets).toHaveLength(8);
    userEvent.clear(inputName);
    const planets2 = await screen.findAllByRole('row');
    expect(planets2).toHaveLength(11);
  });

  test('Verifica filtros de comparação - maior que', async () => {
   
    await act( async () => render(<App/>));
    const selectColumn = await screen.findByTestId('column-filter');
    expect(selectColumn).toHaveValue('population');
    userEvent.selectOptions(selectColumn, 'diameter');
    expect(selectColumn).toHaveValue('diameter');
    const inputNumber = await screen.findByTestId('value-filter');
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '9000');
    const buttonSearch = await screen.findByTestId('button-filter');
    userEvent.click(buttonSearch);
    const planets = await screen.findAllByRole('row');
    expect(planets).toHaveLength(8);
  });

  test('Verifica filtros de comparação - menor que', async () => {
   
    await act( async () => render(<App/>));
    const selectColumn = await screen.findByTestId('column-filter');
    expect(selectColumn).toHaveValue('population');
    userEvent.selectOptions(selectColumn, 'diameter');
    expect(selectColumn).toHaveValue('diameter');
    const selectOperator = await screen.findByTestId('comparison-filter');
    expect(selectOperator).toHaveValue('maior que');
    userEvent.selectOptions(selectOperator, 'menor que');
    expect(selectOperator).toHaveValue('menor que');
    const inputNumber = await screen.findByTestId('value-filter');
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '10000');
    const buttonSearch = await screen.findByTestId('button-filter');
    userEvent.click(buttonSearch);
    const planets = await screen.findAllByRole('row');
    expect(planets).toHaveLength(4);
  }); 

  test('Verifica filtros de comparação - igual a', async () => {
   
    await act( async () => render(<App/>));
    const selectColumn = await screen.findByTestId('column-filter');
    expect(selectColumn).toHaveValue('population');
    userEvent.selectOptions(selectColumn, 'diameter');
    expect(selectColumn).toHaveValue('diameter');
    const selectOperator = await screen.findByTestId('comparison-filter');
    expect(selectOperator).toHaveValue('maior que');
    userEvent.selectOptions(selectOperator, 'igual a');
    expect(selectOperator).toHaveValue('igual a');
    const inputNumber = await screen.findByTestId('value-filter');
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '10465');
    const buttonSearch = await screen.findByTestId('button-filter');
    userEvent.click(buttonSearch);
    const planets = await screen.findAllByRole('row');
    expect(planets).toHaveLength(2);
  });

  test('Verifica a funcionalidade do button remover filtro', async () => {
   
    await act( async () => render(<App/>));
    const selectColumn = await screen.findByTestId('column-filter');
    userEvent.selectOptions(selectColumn, 'diameter');
    const inputNumber = await screen.findByTestId('value-filter');
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '9000');
    const buttonSearch = await screen.findByTestId('button-filter');
    userEvent.click(buttonSearch);
    const planets = await screen.findAllByRole('row');
    expect(planets).toHaveLength(8);
    const buttonRemove = await screen.findByTestId('button-remove-filters');
    userEvent.click(buttonRemove);
    const planets2 = await screen.findAllByRole('row');
    expect(planets2).toHaveLength(11);
  });

});
