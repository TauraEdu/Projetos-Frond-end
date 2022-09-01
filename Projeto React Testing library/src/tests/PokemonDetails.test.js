import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test(`Teste se as informações
   detalhadas do pokémon selecionado são mostradas na tela:`, () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonDetails);

    expect(screen.getByRole('heading', { name: /pikachu Details/i }))
      .toHaveTextContent('Pikachu Details');
    expect(buttonDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();

    const pikachuDetails = /This intelligent Pokémon roasts hard berries/i;
    expect(screen.getByText(pikachuDetails)).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção
   com os mapas contendo as localizações do pokémon:`, () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonDetails);

    expect(screen
      .getByRole('heading', { name: /game locations of pikachu/i })).toBeInTheDocument();

    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
    expect(screen
      .getAllByRole('img', { name: /pikachu location/i })[0].src).toBe(
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(screen
      .getAllByRole('img', { name: /pikachu location/i })[1].src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  test(`Teste se o usuário pode favoritar um pokémon
   através da página de detalhes:`, () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonDetails);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
  });
});
