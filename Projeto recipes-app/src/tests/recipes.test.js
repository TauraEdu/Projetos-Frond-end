import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import App from "../App";
import Recipes from "../componentes/Recipes";
import RecipesProvider from "../Provider/RecipesProvider";
import MOCK_DRINKS_API from "./helpers/mockDrinksAPI";
import MOCK_FOODS_API from "./helpers/mockFoodsAPI";
import renderWithRouter from "./helpers/renderWithRouter";

const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


describe('Testando a pagina de Receitas com foods', () => {
  it('testa se é renderizado as receitas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(()=>Promise
      .resolve({
        json: () => Promise.resolve(MOCK_FOODS_API)
      }))
    
      const {history} =renderWithRouter(
        <RecipesProvider>
          <App/>
        </RecipesProvider>)
      
        history.push('/foods')

    await waitFor(() => expect(screen.findByTestId('0-card-name')))
    
    ids.forEach((id) => {
      expect(screen.getByTestId(`${id}-card-name`)).toBeDefined();
    });
  });


  it('Testando a pagina de receitas com Drinks', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(()=>Promise
    .resolve({
      json: () => Promise.resolve(MOCK_DRINKS_API)
    }))
  
    const {history} =renderWithRouter(
      <RecipesProvider>
        <App/>
      </RecipesProvider>)
    
      history.push('/drinks')

  await waitFor(() => expect(screen.findByTestId('0-card-name')))

  ids.forEach((id) => {
    expect(screen.getByTestId(`${id}-card-name`)).toBeDefined();
  });
    
  })
});
