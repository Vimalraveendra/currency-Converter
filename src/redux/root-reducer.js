import { combineReducers } from "redux";

import currencyReducer from "./currency/currency.reducer";
import converterlistReducer from "./converterlist/converterlist.reducer";

export default combineReducers({
  currency: currencyReducer,
  converterlist: converterlistReducer
});
