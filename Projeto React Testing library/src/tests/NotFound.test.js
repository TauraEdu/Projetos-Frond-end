import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      const textHeading = screen
        .getByRole('heading', { name: /page requested not found/i });

      expect(textHeading).toBeInTheDocument();
    });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgNotFound.src).toBe(src);
  });
});
