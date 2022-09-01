import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import forkimg from './forkimg.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const validateButton = () => {
    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPassword = 6;

    if (mailFormat.test(email) && password.length >= minPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    validateButton();
    if (name === 'email') {
      return setEmail(value);
    }
    return setPassword(value);
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/foods');
  };

  return (
    <form className="login-form">
      <div className="img-title">
        <img src={ forkimg } alt="icon" />
        <h1 className="title">RecipesApp</h1>
      </div>
      <label className="label-login" htmlFor="email-input">
        <input
          className="email-input"
          data-testid="email-input"
          placeholder="E-mail"
          type="text"
          value={ email }
          name="email"
          onChange={ handleChange }
        />
        <input
          className="password-input"
          data-testid="password-input"
          placeholder="Senha"
          type="text"
          value={ password }
          name="password"
          onChange={ handleChange }
        />
        <button
          className="login-submit-btn"
          data-testid="login-submit-btn"
          type="button"
          disabled={ isDisabled }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </label>
    </form>
  );
}

export default Login;
