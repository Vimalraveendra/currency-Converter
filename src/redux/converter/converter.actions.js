import converterActionTypes from "./converter.types";

export const requestCurrencyRates = () => dispatch => {
  dispatch({ type: converterActionTypes.REQUEST_RATES_PENDING });
  fetch(`https://api.exchangeratesapi.io/latest?base=EUR`)
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: converterActionTypes.converterActionTypesREQUEST_RATES_SUCCESS,
        payload: data
      })
    )
    .catch(error =>
      dispatch({
        type: converterActionTypes.REQUEST_RATES_FAILED,
        payload: error
      })
    );
};
