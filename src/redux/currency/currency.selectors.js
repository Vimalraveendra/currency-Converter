import { createSelector } from "reselect";

const selectConverterList = state => state.converterlist;

export const selectCurrencyList = createSelector(
  [selectConverterList],
  converterlist => converterlist.currencyList
);

export const selectCurrencySum = createSelector(
  [selectCurrencyList],
  currencyList =>
    currencyList.reduce((acc, sum) => acc + sum.result, 0).toFixed(2)
);

export const selectCurrencyLarge = createSelector(
  [selectCurrencyList],
  currencyList =>
    Math.max(
      ...currencyList.map(item =>
        item.convertedTo === "PLN" ? item.result.toFixed(2) : null
      )
    )
);
