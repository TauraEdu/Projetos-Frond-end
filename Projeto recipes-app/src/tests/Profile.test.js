import React from "react";
import App from "../App";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";

const emailInput = "trybe@trybe.com";
const passwordInput = "12345612";

describe("Teste da página Profile.js", () => {

  test('Verifica se os elementos estão redirecionando para as páginas corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    userEvent.type(email, emailInput);
    const password = screen.getByTestId("password-input");
    userEvent.type(password, passwordInput);
    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);
    history.push("/profile");

    const done = screen.getByTestId("profile-done-btn");
    userEvent.click(done);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/done-recipes");
  });

  test('Verifica se o botão Favorite Recipes funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    userEvent.type(email, emailInput);
    const password = screen.getByTestId("password-input");
    userEvent.type(password, passwordInput);
    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);
    history.push("/profile");

    const favorite = screen.getByTestId("profile-favorite-btn");
    userEvent.click(favorite);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/favorite-recipes");
  });

  test('Verifica se ao clicar no logout, o usuário é redirecionado para o Login', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    userEvent.type(email, emailInput);
    const password = screen.getByTestId("password-input");
    userEvent.type(password, passwordInput);
    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);
    history.push("/profile");

    const logout = screen.getByTestId("profile-logout-btn");
    userEvent.click(logout);

    const { location: { pathname },
    } = history;
    expect(pathname).toBe("/");
  });
  
});
