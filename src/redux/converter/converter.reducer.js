import converterActionTypes from "./converter.types";

const INITIAL_STATE = {
  isPending: false,
  currencies: [],
  error: "",
  rates: {},
  result: "",
  date: ""
};

export const requestRobots = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case converterActionTypes.REQUEST_RATES_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case converterActionTypes.REQUEST_RATES_SUCCESS: {
      return {
        ...state,
        isPending: false,
        currencies: action.payload
      };
    }
    case converterActionTypes.REQUEST_RATES_FAILED: {
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
