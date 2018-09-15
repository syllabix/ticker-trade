import { createActions, handleActions } from "redux-actions";

const actions = createActions({
  MODAL: {
    DISPLAY: id => id,
    HIDE: () => {}
  }
}).modal;

const reducers = handleActions(
  {
    [actions.display.toString()]: (state, action) => ({
      isOpen: true,
      matchId: action.payload
    }),
    [actions.hide.toString()]: (state, action) => ({
      isOpen: false,
      matchId: null
    })
  },
  // Default State
  {
    isOpen: false,
    data: null
  }
);

export { actions, reducers };
