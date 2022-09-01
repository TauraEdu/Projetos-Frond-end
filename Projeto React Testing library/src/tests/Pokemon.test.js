import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test(`Teste se é renderizado um cartão
   com as informações de determinado pokémon::`, () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId(/pokemon-name/i)).toHaveTextContent('Pikachu');

    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');

    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');

    expect(screen
      .getByRole('img', { name: /pikachu sprite/i }))
      .toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Teste se o card do pokémon indicado na Pokédex contém um link de navegação para
  exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>,
   onde <id> é o id do pokémon exibido;`, () => {
    renderWithRouter(<App />);

    expect(screen
      .getByRole('link', { name: /More details/i }))
      .toBeInTheDocument();
  });

  test(`Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento
   da aplicação para a página de detalhes de pokémon;`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
