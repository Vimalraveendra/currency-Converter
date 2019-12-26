import React from "react";
import "./ConvertedList.scss";
import CurrencyList from "../currency-list/CurrencyList";
import { connect } from "react-redux";
import {
  addCurrency,
  handleInput,
  handleChange,
  requestCurrencyRates,
  handleSwap
} from "../../redux/converterlist/converterlist.actions";

import uuid from "uuid";

const ConvertedList = ({
  currencies,
  amount,
  convertedTo,
  base,
  handleChange,
  handleInput,
  addCurrency,
  handleSwap,
  result,
  getCurrency
}) => {
  return (
    <React.Fragment>
      <div className="input-item">
        <input
          className="input"
          type="number"
          value={amount}
          onChange={event => {
            handleInput(event);
            getCurrency(base, amount);
          }}
        />

        <select
          className="options"
          name="base"
          value={base}
          onChange={event => {
            handleChange(event);
            getCurrency(base, amount);
          }}
        >
          {<option className="option">{base}</option>}
        </select>
      </div>
      <div className="input-item">
        <input
          className="input"
          type="number"
          value={result}
          onChange={handleInput}
        />
        <select
          className="options  "
          name="convertedTo"
          value={convertedTo}
          onChange={event => {
            handleChange(event);
            getCurrency(base, amount);
          }}
        >
          {currencies.map((currency, index) => (
            <option key={index}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="input-item">
        <button
          type="submit"
          className="btn"
          onClick={() =>
            addCurrency({
              base: base,
              id: uuid(),
              convertedTo: convertedTo,
              amount: Number(amount),
              result: Number(result)
            })
          }
        >
          Add Item
        </button>
        <h1
          className="swap"
          onClick={() => {
            handleSwap();
            getCurrency(convertedTo, amount);
          }}
        >
          &#8595;&#8593;
        </h1>
      </div>
      <CurrencyList />
    </React.Fragment>
  );
};

const mapStateToProps = ({
  converterlist: { amount, base, result, currencies, convertedTo }
}) => ({
  amount,
  base,
  result,
  currencies,
  convertedTo
});

const mapDispatchToProps = dispatch => ({
  addCurrency: item => dispatch(addCurrency(item)),
  handleInput: event => dispatch(handleInput(event.target.value)),
  handleChange: event => dispatch(handleChange(event.target.value)),
  handleSwap: () => dispatch(handleSwap()),
  getCurrency: (base, amount) => dispatch(requestCurrencyRates(base, amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConvertedList);
