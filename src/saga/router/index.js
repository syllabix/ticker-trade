import { router } from "redux-saga-router";
import createBrowserHistory from "history/createBrowserHistory";
import { call, fork, cancel, cancelled, put } from "redux-saga/effects";

import { routes } from "../../constant";

import { OrderService } from "../../service";
import { fetchOrders, processOrders } from "../order.saga";
import { ErrorActions } from "../../state";

const routeSagas = {
  [routes.HOME]: function* home() {
    const task = yield fork(fetchOrders);
    if (yield cancelled()) {
      cancel(task);
    }
  },
  [routes.MATCH_OVERVIEW]: function* match(param) {}
};

function* init() {
  const result = yield call([OrderService, OrderService.all]);
  yield processOrders(result.data);
}

export default function* sagaRouter() {
  try {
    yield init();
  } catch (error) {
    const err = yield call(
      ErrorActions.display,
      "An error occurred while initializing ticker trade"
    );
    yield put(err);
  }
  yield fork(router, createBrowserHistory(), routeSagas);
}
