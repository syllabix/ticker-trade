import { createActions, handleActions } from "redux-actions";

const actions = createActions({
  ERROR: {
    DISSMISS: () => {},
    DISPLAY: message => message
  }
}).error;

const reducers = handleActions(
  {
    [actions.dissmiss.toString()]: (state, action) => ({
      hasError: false,
      message: ""
    }),
    [actions.display.toString()]: (state, action) => ({
      hasError: true,
      message: action.payload
    })
  },
  // Default State
  {
    hasError: false,
    message: ""
  }
);

export { actions, reducers };
