import converterListActionTypes from "./converterlist.types";
import uuid from "uuid";
const INITIAL_STATE = {
  isPending: true,
  currencyList: [],
  currencies: [],
  amount: 1,
  id: uuid(),
  base: "EUR",
  result: "",
  date: "",
  convertedTo: "PLN",
  error: ""
};

const converterListReducer = (state = INITIAL_STATE, action = {}) => {
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
        amount: Number(action.payload)
      };
    }
    case converterListActionTypes.HANDLE_CHANGE: {
      return {
        ...state,
        convertedTo: action.payload
      };
    }

    case converterListActionTypes.HANDLE_SWAP: {
      return {
        ...state,
        convertedTo: state.base,
        base: state.convertedTo
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
