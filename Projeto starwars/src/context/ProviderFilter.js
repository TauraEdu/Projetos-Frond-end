import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filterByNumeric, setfilterByNumeric] = useState([]);

  useEffect(() => {
    const getDataAPI = async () => {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await request.json();
      const newList = data.results.map(({ residents, ...params }) => params);
      const result = [...newList];
      setPlanets(result);
    };
    getDataAPI();
  }, []);

  const contextValue = {
    planets,
    inputName,
    setInputName,
    filterByNumeric,
    setfilterByNumeric,
  };

  return (
    <StarContext.Provider
      value={ contextValue }
    >
      {children}
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
