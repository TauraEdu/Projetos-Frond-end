import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../context/StarContext';

function Filter() {
  const {
    inputName,
    setInputName,
    filterByNumeric,
    setfilterByNumeric,
  } = useContext(StarContext);

  const [filterAllvalue, setfilterAllvalue] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const options = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const getTypeColumn = options
    .filter(
      (column) => !filterByNumeric
        .some((el) => column === el.column),
    );

  useEffect(() => {
    setfilterAllvalue((prevState) => ({ ...prevState, column: getTypeColumn[0] }));
  }, [filterByNumeric]);

  return (
    <div>
      Star Wars
      <form>
        <label htmlFor="input-search">
          Search
          <input
            data-testid="name-filter"
            id="input-search"
            type="text"
            name="inputText"
            value={ inputName }
            onChange={ (event) => setInputName(event.target.value) }
          />
        </label>
        <br />
        <label htmlFor="input-column">
          Coluna
          <select
            data-testid="column-filter"
            id="input-column"
            name="column"
            value={ filterAllvalue.column }
            onChange={ (event) => setfilterAllvalue({ ...filterAllvalue,
              column: event.target.value }) }
          >
            {getTypeColumn.map((column) => (
              <option key={ column } value={ column }>
                {column}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="input-comparison">
          Operador
          <select
            data-testid="comparison-filter"
            id="input-comparison"
            name="comparison"
            value={ filterAllvalue.comparison }
            onChange={ (event) => setfilterAllvalue({ ...filterAllvalue,
              comparison: event.target.value }) }

          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>

          </select>

        </label>

        <label htmlFor="input-value">
          Valor
          <input
            type="text"
            data-testid="value-filter"
            name="value"
            id="input-value"
            value={ filterAllvalue.value }
            onChange={ (event) => setfilterAllvalue({ ...filterAllvalue,
              value: (event.target.value) }) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => setfilterByNumeric([...filterByNumeric,
            filterAllvalue]) }
        >
          Filtrar
        </button>

      </form>
    </div>
  );
}

export default Filter;
