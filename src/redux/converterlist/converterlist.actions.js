import converterListActionTypes from "./converterlist.types";

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

export const handleInput = event => ({
  type: converterListActionTypes.HANDLE_INPUT,
  payload: Number(event)
});

export const handleChange = event => ({
  type: converterListActionTypes.HANDLE_CHANGE,
  payload: event
});

export const handleSwap = event => ({
  type: converterListActionTypes.HANDLE_SWAP,
  payload: event
});
