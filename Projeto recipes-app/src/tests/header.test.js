import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import Header from '../componentes/Header';
// import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';
import App from "../App";

describe('Testando o componente Header', () => {
  test('Testa o ícone de pesquisa na página Foods', () => {
    // const { history } = renderWithRouter(<Foods />);   
    const { history } = renderWithRouter(<App />);    
    const EMAIL = "trybe@trybe.com";
    const PASSWORD = "12345612";

    const email = screen.getByTestId("email-input");
    userEvent.type(email, EMAIL);

    const password = screen.getByTestId("password-input");
    userEvent.type(password, PASSWORD);

    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);
    expect(history.location.pathname).toBe('/foods');  
    const buttonSearchIcon  = screen.getByRole('button', {  name: /search/i});
    userEvent.click(buttonSearchIcon ); 
    const buttonProfileIcon = screen.getByRole('button', {  name: /profile/i});
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(buttonProfileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

});
