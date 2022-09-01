import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(homeLink).toHaveTextContent('Home');
    expect(aboutLink).toHaveTextContent('About');
    expect(favoriteLink).toHaveTextContent('Favorite Pokémons');
  });

  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Favorite Pokémons,', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/NotFound');
    const pageNotFound = screen.getByRole('heading', { name: /not found/i });
    expect(pageNotFound).toBeInTheDocument();
  });
});
