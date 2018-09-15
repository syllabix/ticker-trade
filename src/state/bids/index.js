import { createActions, handleActions } from "redux-actions";

const actions = createActions({
  BIDS: {
    UPDATE: (bids = []) => bids
  }
}).bids;

const reducers = handleActions(
  {
    [actions.update.toString()]: (state, action) => [...action.payload]
  },
  // Default State
  []
);

export { actions, reducers };
