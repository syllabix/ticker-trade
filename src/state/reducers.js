import { combineReducers } from "redux";

import { reducers as asks } from "./asks";
import { reducers as bids } from "./bids";
import { reducers as matches } from "./matches";
import { reducers as error } from "./error";
import { reducers as modal } from "./modal";

const rootReducer = combineReducers({
  asks,
  bids,
  matches,
  error,
  modal
});

export default rootReducer;
