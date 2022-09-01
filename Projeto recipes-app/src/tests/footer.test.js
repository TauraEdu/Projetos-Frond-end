import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../componentes/Footer';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando o componente Header', () => {
test('Verifica os componentes na tela', () => {
render(<Footer />)

const imgDrinkIcon = screen.getByAltText(/drink-icon/i);
const imgFoodIcon = screen.getByAltText(/meal-icon/i);
const buttonDrinkIcon = screen.getByTestId('button-drink-icon');
const buttonFoodIcon = screen.getByTestId('button-meal-icon');

expect(imgDrinkIcon).toBeDefined();
expect(imgFoodIcon).toBeDefined();
expect(buttonDrinkIcon).toBeDefined();
expect(buttonFoodIcon).toBeDefined();
});
test('Verifica a funcionalidade do ícone Drinks', () => {
const { history } = renderWithRouter(<Footer />)
const buttonDrinkIcon = screen.getByTestId('button-drink-icon');

userEvent.click(buttonDrinkIcon);
expect(history.location.pathname).toBe('/drinks');
});
test('Verifica a funcionalidade do ícone Foods', () => {
const { history } = renderWithRouter(<Footer />)
const buttonFoodIcon = screen.getByTestId('button-meal-icon');

userEvent.click(buttonFoodIcon);
expect(history.location.pathname).toBe('/foods');
});
}); 