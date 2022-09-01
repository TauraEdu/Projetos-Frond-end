import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /Pokédex/i });
    expect(aboutPokedex).toBeDefined();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedexText = screen.getByRole('heading', { name: /about pokédex/i });

    expect(aboutPokedexText).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const aboutPokedexImg = screen.getByRole('img', { name: /pokédex/i });
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(aboutPokedexImg).toHaveProperty('src', url);
  });
});
