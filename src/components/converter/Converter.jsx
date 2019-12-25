import React from "react";
import "./Converter.scss";
import ConvertedList from "../converter-list/ConvertedList";
// import uuid from "uuid";
import { connect } from "react-redux";
import { requestCurrencyRates } from "../../redux/converterlist/converterlist.actions";

class Converter extends React.Component {
  // state = {
  //   currencies: [],
  //   id: uuid(),
  //   base: "EUR",

  //   date: "",
  //   convertedTo: "PLN",
  //   rates: {}
  // };

  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value }, this.getCurrency);
  // };

  // handleInput = event => {
  //   this.setState(
  //     {
  //       amount: event.target.value
  //     },
  //     this.getCurrency
  //   );
  // };

  componentDidMount() {
    this.props.getCurrency(this.props.base, this.props.amount);
  }

  // handleSwap = () => {
  //   const { convertedTo, base } = this.props;

  //   this.setState(
  //     {
  //       convertedTo: base,
  //       base: convertedTo
  //     },
  //     this.props.getCurrency()
  //   );
  // };

  render() {
    const { base, result, date, convertedTo, amount } = this.props;
    const { handleChange, handleSwap } = this;
    console.log("amount", this.props.amount);
    console.log("date", this.props.date);
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
            // amount={this.props.amount}
            // base={base}
            // result={result}
            convertedTo={convertedTo}
            handleChange={handleChange}
            handleSwap={handleSwap}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.converterlist.amount,
  data: state.converterlist.data,
  base: state.converterlist.base,
  convertedTo: state.converterlist.convertedTo,
  currencies: state.converterlist.currencies,
  result: state.converterlist.result,
  date: state.converterlist.date
});

const mapDispatchToProps = dispatch => ({
  getCurrency: (base, amount) => dispatch(requestCurrencyRates(base, amount))
});
export default connect(mapStateToProps, mapDispatchToProps)(Converter);
