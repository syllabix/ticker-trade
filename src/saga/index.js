import sagaRouter from "./router";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([sagaRouter()]);
}
