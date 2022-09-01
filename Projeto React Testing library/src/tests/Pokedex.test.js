import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const btntotal = 7;

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons;', () => {
    renderWithRouter(<App />);
    const encounteredHeading = screen
      .getByRole('heading', { name: /encountered pokémons/i, level: 2 });

    expect(encounteredHeading).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo pokémon da lista quando o botão  Próximo
   pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const btnproxPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnproxPokemon).toBeDefined();
    pokemons.forEach((element) => {
      expect(screen.getByText(element.name)).toBeDefined();
      userEvent.click(btnproxPokemon);
    });
    expect(screen.getByText(/Pikachu/i)).toBeDefined();
  });

  test('Teste se é mostrado apenas um pokémon por vez;', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonName).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const typeBttFilter = screen.getAllByTestId(/pokemon-type-button/i);
    expect(typeBttFilter).toHaveLength(btntotal);
    expect(screen.getByRole('button', { name: /all/i })).toBeDefined();
    expect(screen.getAllByRole('button', { name: /electric/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /fire/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /bug/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /poison/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /psychic/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /normal/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /dragon/i })).toHaveLength(1);

    userEvent.click(screen.getByRole('button', { name: /poison/i }));
    expect(screen.getByText(/ekans/i)).toBeDefined();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
