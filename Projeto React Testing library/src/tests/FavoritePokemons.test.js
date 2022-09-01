import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

const favoritePokemons = screen.queryByTestId('pokemon-name');

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoritePokemon).toBeDefined();
  });

  test('Teste se é exibido todos os cards de pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(favoritePokemons).not.toBeInTheDocument();
  });
});
