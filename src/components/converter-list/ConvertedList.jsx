import React from "react";
import "./ConvertedList.scss";
import CurrencyList from "../currency-list/CurrencyList";
import { connect } from "react-redux";
import { addCurrency } from "../../redux/converterlist/converterlist.actions";
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
  id
}) => {
  return (
    <React.Fragment>
      <div className="input-item">
        <input
          className="input"
          type="number"
          value={amount}
          onChange={handleInput}
        />

        <select
          className="options"
          name="base"
          value={base}
          onChange={handleChange}
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
          onChange={handleChange}
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
        <h1 className="swap" onClick={handleSwap}>
          &#8595;&#8593;
        </h1>
      </div>
      <CurrencyList />
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  addCurrency: item => dispatch(addCurrency(item))
});

export default connect(null, mapDispatchToProps)(ConvertedList);
