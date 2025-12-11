import { all } from "redux-saga/effects";
import { emailLoginWorkerWatcher } from "./authSaga";

export default function* rootSaga() {
    yield all([

        emailLoginWorkerWatcher(),


    ]);
}
