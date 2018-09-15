import { createActions, handleActions } from "redux-actions";

const actions = createActions({
  MATCHES: {
    UPDATE: (matches = []) => matches
  }
}).matches;

const reducers = handleActions(
  {
    [actions.update.toString()]: (state, action) => [...action.payload]
  },
  // Default State
  []
);

export { actions, reducers };
