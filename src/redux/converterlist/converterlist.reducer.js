import converterListActionTypes from "./converterlist.types";
import uuid from "uuid";
const INITIAL_STATE = {
  isPending: true,
  currencyList: [],
  currencies: [],
  amount: 1,
  fields: {},
  id: uuid(),
  base: "EUR",
  result: "",
  date: "",
  convertedTo: "PLN",
  rates: "",
  error: ""
};

const converterListReducer = (state = INITIAL_STATE, action = {}) => {
  console.log("actionpayload", action.payload);
  switch (action.type) {
    case converterListActionTypes.ADD_CURRENCY: {
      return {
        ...state,
        currencyList: [...state.currencyList, action.payload]
      };
    }
    case converterListActionTypes.CLEAR_CURRENCY: {
      return {
        ...state,
        currencyList: state.currencyList.filter(
          (currencyItem, index) => currencyItem.id !== action.payload[index].id
        )
      };
    }
    case converterListActionTypes.REMOVE_CURRENCY: {
      return {
        ...state,
        currencyList: state.currencyList.filter(
          currencyItem => currencyItem.id !== action.payload
        )
      };
    }
    case converterListActionTypes.HANDLE_INPUT: {
      return {
        ...state,
        amount: action.payload
      };
    }
    case converterListActionTypes.HANDLE_CHANGE: {
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.name]: action.value
        }
      };
    }

    case converterListActionTypes.HANDLE_SWAP: {
      return {
        ...state,
        base: state.convertedTo,
        convertedTo: state.base
      };
    }
    case converterListActionTypes.REQUEST_RATES_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case converterListActionTypes.REQUEST_RATES_SUCCESS: {
      return {
        ...state,
        isPending: false,
        rates: action.payload.rates,
        currencies: Object.keys(action.payload.rates),
        result: Number(
          (action.payload.rates[state.convertedTo] * state.amount).toFixed(2)
        ),
        date: action.payload.date
      };
    }
    case converterListActionTypes.REQUEST_RATES_FAILED: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default converterListReducer;
