import { createActions, handleActions } from "redux-actions";

const actions = createActions({
  ASKS: {
    UPDATE: (asks = []) => asks
  }
}).asks;

const reducers = handleActions(
  {
    [actions.update.toString()]: (state, action) => [...action.payload]
  },
  // Default State
  []
);

export { actions, reducers };
