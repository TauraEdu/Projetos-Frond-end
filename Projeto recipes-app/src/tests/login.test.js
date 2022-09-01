import { screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event'


describe('Testando toda a página de Login', () =>{
  test('Verifica se todos os elementos estão sendo renderizados', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    const passWordInput = screen.getByTestId('password-input');
    
    expect(emailInput).toBeDefined();
    expect(loginButton).toBeDefined();
    expect(passWordInput).toBeDefined();
  });

  test('Verifica se o função de habilar o botão está funcionando', () => {
    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId('email-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    const passWordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'teste@teste.com');
    expect(loginButton).toBeDisabled();
    userEvent.type(passWordInput, '12345678');
    userEvent.click(loginButton);
    expect(loginButton).toBeEnabled();
  })

  test('Verificar a troca da pagina /foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
  });

})