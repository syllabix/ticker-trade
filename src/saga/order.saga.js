import { call, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";

import { processMatches } from "../util/process-matches";
import { BidActions, AskActions, MatchActions, ErrorActions } from "../state";
import { OrderService } from "../service";

const exchangeState = state => ({
  asks: state.asks,
  bids: state.bids,
  matches: state.matches
});

export function* fetchOrders() {
  while (true) {
    try {
      const result = yield call([OrderService, OrderService.next]);
      yield processOrders(result.data);
      // Clear errors in case there was one previously
      yield put(ErrorActions.dissmiss());
    } catch (error) {
      const err = yield call(
        ErrorActions.display,
        "An error occurred while fetching data from the exchange"
      );
      yield put(err);
    }
    yield call(delay, 1500);
  }
}

export function* processOrders(orders) {
  let state = yield select(exchangeState);
  orders.forEach(order => (state = processMatches(order, state)));

  const bids = yield call(BidActions.update, state.bids);
  yield put(bids);

  const asks = yield call(AskActions.update, state.asks);
  yield put(asks);

  const matches = yield call(MatchActions.update, state.matches);
  yield put(matches);
}
