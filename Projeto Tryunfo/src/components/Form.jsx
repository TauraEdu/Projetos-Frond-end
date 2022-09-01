import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div>
        <input
          type="text"
          value={ cardName }
          name="cardName"
          data-testid="name-input"
          onChange={ onInputChange }
        />
        <input
          type="textarea"
          value={ cardDescription }
          name="cardDescription"
          data-testid="description-input"
          onChange={ onInputChange }
        />
        <input
          type="number"
          value={ cardAttr1 }
          name="cardAttr1"
          data-testid="attr1-input"
          onChange={ onInputChange }
          min="0"
          max="90"
        />
        <input
          type="number"
          value={ cardAttr2 }
          name="cardAttr2"
          data-testid="attr2-input"
          onChange={ onInputChange }
          min="0"
          max="90"
        />
        <input
          type="number"
          value={ cardAttr3 }
          name="cardAttr3"
          data-testid="attr3-input"
          onChange={ onInputChange }
          min="0"
          max="90"
        />
        <label htmlFor="playing-card-picture">
          Imagem
          <input
            type="text"
            data-testid="image-input"
            id="playing-card-picture"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="rare-card">
          Raridade

          <select
            data-testid="rare-input"
            id="rare-card"
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>

        </label>
        { hasTrunfo === false ? (
          <label htmlFor="trunfo-card">
            Super Trunfo

            <input
              type="checkbox"
              data-testid="trunfo-input"
              id="trunfo-card"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
          </label>
        )
          : <p>Você já tem um Super Trunfo em seu baralho </p> }
        <button
          type="submit"
          data-testid="save-button"
          id="button"
          name="isSaveButtonDisabled"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>

      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
