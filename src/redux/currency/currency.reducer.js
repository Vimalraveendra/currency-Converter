import currencyActionTypes from "./currency.type";

const INITIAL_STATE = {
  hidden: true
};

const currencyReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case currencyActionTypes.SET_TOGGLE_HIDDEN: {
      return {
        ...state,
        hidden: !state.hidden
      };
    }

    default:
      return state;
  }
};

export default currencyReducer;
