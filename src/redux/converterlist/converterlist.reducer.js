import converterListActionTypes from "./converterlist.types";
import uuid from "uuid";
const INITIAL_STATE = {
  currencyList: [],
  currencies: [],
  amount: 1,
  fields: {},
  id: uuid(),
  base: "EUR",
  result: "",
  date: "",
  convertedTo: "PLN",
  rates: {}
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
        amount: action.payload
      };
    }

    default:
      return state;
  }
};

export default converterListReducer;
