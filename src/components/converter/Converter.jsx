import React from "react";
import "./Converter.scss";
import ConvertedList from "../converter-list/ConvertedList";
import uuid from "uuid";
import { connect } from "react-redux";
import { requestCurrencyRates } from "../../redux/converter/converter.actions";

class Converter extends React.Component {
  state = {
    currencies: [],
    id: uuid(),
    amount: 1,
    base: "EUR",
    result: "",
    date: "",
    convertedTo: "PLN",
    rates: {}
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.getCurrency);
  };

  handleInput = event => {
    this.setState(
      {
        amount: event.target.value
      },
      this.getCurrency
    );
  };

  componentDidMount() {
    this.getCurrency();
  }

  handleSwap = () => {
    const { convertedTo, base } = this.state;

    this.setState(
      {
        convertedTo: base,
        base: convertedTo
      },
      this.getCurrency
    );
  };

  getCurrency = () => {
    const { amount, base, convertedTo, currencies } = this.state;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
        .then(resp => resp.json())
        .then(data => {
          const result = (data.rates[convertedTo] * amount).toFixed(2);
          const rates = data.rates;
          for (const key in rates) {
            currencies.push(key);
          }
          const newDate = data.date;
          this.setState({
            result,
            date: newDate,
            rates
          });
        })
        .catch(err => {
          console.log("Oops", err.message);
        });
    }
  };
  render() {
    const { currencies, amount, base, result, date, convertedTo } = this.state;
    const { handleChange, handleInput, handleSwap } = this;

    return (
      <div className="converter">
        <div className="converter-content">
          <h1 className="title">Currency Converter </h1>
          <h3 className="subtitle">
            {amount}
            {base} equals:
            <span>
              {result} {convertedTo}
            </span>
          </h3>
          <h3 className="date">{date}</h3>

          <ConvertedList
            currencies={currencies}
            amount={amount}
            base={base}
            result={result}
            convertedTo={convertedTo}
            handleChange={handleChange}
            handleInput={handleInput}
            handleSwap={handleSwap}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  converterlist: { amount, base, currencies, convertedTo, date, id }
}) => ({
  amount,
  base,
  date,
  currencies,
  convertedTo,
  id
});

const mapDispatachToProps = dispatch => ({
  requestCurrency: () => dispatch(requestCurrencyRates())
});
export default connect(mapStateToProps, mapDispatachToProps)(Converter);
