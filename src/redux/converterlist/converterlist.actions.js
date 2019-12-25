import converterListActionTypes from "./converterlist.types";

export const requestCurrencyRates = (base, amount) => dispatch => {
  console.log("actionsbase", base);
  console.log("actions", amount);
  if (amount === isNaN || amount === 0) {
    return;
  } else {
    dispatch({ type: converterListActionTypes.REQUEST_RATES_PENDING });
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
      .then(response => response.json())
      .then(data =>
        dispatch({
          type: converterListActionTypes.REQUEST_RATES_SUCCESS,
          payload: data,
          amount: amount
        })
      )
      .catch(error =>
        dispatch({
          type: converterListActionTypes.REQUEST_RATES_FAILED,
          payload: error
        })
      );
  }
};

export const addCurrency = item => ({
  type: converterListActionTypes.ADD_CURRENCY,
  payload: item
});

export const clearCurrency = item => ({
  type: converterListActionTypes.CLEAR_CURRENCY,
  payload: item
});

export const removeCurrency = id => ({
  type: converterListActionTypes.REMOVE_CURRENCY,
  payload: id
});

export const handleInput = event => {
  console.log("handleinput", event);
  return {
    type: converterListActionTypes.HANDLE_INPUT,
    payload: Number(event)
  };
};

export const handleChange = event => {
  console.log("handleChange", event);
  return {
    type: converterListActionTypes.HANDLE_CHANGE,
    payload: event
  };
};

export const handleSwap = () => {
  return {
    type: converterListActionTypes.HANDLE_SWAP
  };
};
