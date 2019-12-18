import React from "react";
import "./CurrencyList.scss";
import { connect } from "react-redux";
import { setToggleSum } from "../../redux/currency/currency.action";
import {
  selectCurrencyList,
  selectCurrencySum,
  selectCurrencyLarge
} from "../../redux/currency/currency.selectors";

import {
  clearCurrency,
  removeCurrency
} from "../../redux/converterlist/converterlist.actions";

const CurrencyList = ({
  currencyList,
  clearCurrency,
  removeCurrency,
  currencySum,
  currencyLarge,
  hidden,
  toggleSum
}) => {
  return (
    <React.Fragment>
      <div className="currency-list">
        <ul className="currency-item">
          {currencyList.map(({ id, convertedTo, result }) => {
            return (
              <li className="item" key={id}>
                <span className="left-push">{convertedTo}</span>
                <span className="right-push">{result}</span>
                <span
                  className="remove-item"
                  onClick={() => removeCurrency(id)}
                >
                  {" "}
                  &#10060;
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {hidden ? null : (
        <h5 className="sum">
          Sum:{currencySum}
          <span className="largest">Largest:{currencyLarge}</span>
        </h5>
      )}
      <div className="buttons">
        <button
          type="button"
          className="btn danger"
          onClick={() => clearCurrency(currencyList)}
        >
          Clear All
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            toggleSum();
          }}
        >
          Sum
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  hidden: state.currency.hidden,
  currencyList: selectCurrencyList(state),
  currencySum: selectCurrencySum(state),
  currencyLarge: selectCurrencyLarge(state)
});

const mapDispatchToProps = dispatch => ({
  toggleSum: () => dispatch(setToggleSum()),
  clearCurrency: currencyList => dispatch(clearCurrency(currencyList)),
  removeCurrency: id => dispatch(removeCurrency(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);
