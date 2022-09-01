import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { planets,
    inputName,
    filterByNumeric,
    setfilterByNumeric,
  } = useContext(StarContext);

  const getTypeComparison = planets
    .filter((elem) => elem.name.toLowerCase().includes(inputName))
    .filter((elem) => filterByNumeric.every(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        return Number(elem[column]) > value;
      case 'menor que':
        return Number(elem[column]) < value;
      default:
        return Number(elem[column]) === Number(value);
      }
    }));
  return (
    <div>
      {filterByNumeric.map((el) => (
        <div key={ el.column } data-testid="filter">
          <span>{el.column}</span>
          {' '}
          <span>{ el.comparison}</span>
          { ' '}
          <span>
            {' '}
            {el.value}
          </span>
          <button
            type="button"
            onClick={ () => setfilterByNumeric(
              filterByNumeric
                .filter(
                  (name) => name.column !== el.column,
                ),
            ) }
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setfilterByNumeric([]) }
      >
        {' '}
        Remover todas as filtragens

      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { getTypeComparison.map((elem) => (
            <tr key={ elem.name }>
              <td>
                {elem.name}
              </td>
              <td>
                {elem.rotation_period}
              </td>
              <td>
                { elem.orbital_period}
              </td>
              <td>
                { elem.diameter}
              </td>
              <td>
                {elem.climate}
              </td>
              <td>
                { elem.gravity}
              </td>
              <td>
                { elem.terrain }
              </td>
              <td>
                { elem.surface_water}
              </td>
              <td>
                { elem.population }
              </td>
              <td>
                {elem.films}
              </td>
              <td>
                { elem.created}
              </td>
              <td>
                { elem.edited}
              </td>
              <td>
                { elem.url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
