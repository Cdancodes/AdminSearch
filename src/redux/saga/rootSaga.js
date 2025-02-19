import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import bannerSaga from "./bannerSaga";
import carSaga from "./carSaga";
import bikeSaga from "./bikeSaga";
import customerSaga from "./customerSaga";
import packageSaga from "./packageSaga";

export default function* rootSaga() {
  yield all(
    [
      loginSaga(),
      bannerSaga(),
      carSaga(),
      bikeSaga(),
      customerSaga(),
      packageSaga()
    ]);
}