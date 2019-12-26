import React from "react";
import "./Converter.scss";
import ConvertedList from "../converter-list/ConvertedList";
import { connect } from "react-redux";
import { requestCurrencyRates } from "../../redux/converterlist/converterlist.actions";

class Converter extends React.Component {
  componentDidMount() {
    this.props.getCurrency(this.props.base, this.props.amount);
  }

  render() {
    const { base, result, date, convertedTo, amount } = this.props;
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
          <ConvertedList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  converterlist: { amount, date, base, convertedTo, result }
}) => ({
  amount,
  date,
  base,
  convertedTo,
  result
});

const mapDispatchToProps = dispatch => ({
  getCurrency: (base, amount) => dispatch(requestCurrencyRates(base, amount))
});
export default connect(mapStateToProps, mapDispatchToProps)(Converter);
