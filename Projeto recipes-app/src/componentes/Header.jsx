import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [inputSea, setInputSea] = useState(false);
  const history = useHistory();

  return (
    <div id="header">
      <button
        type="button"
        data-testid="button-profile-icon"
        id="button-profile-icon"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile-icon"
        />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      {(title === 'Foods' || title === 'Drinks')
          && (
            <button
              type="button"
              data-testid="button-search"
              id="button-search-icon"
              onClick={ () => setInputSea(!inputSea) }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search Icon"
              />
            </button>) }
      {(inputSea && <SearchBar />)}

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
