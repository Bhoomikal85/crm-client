import { all } from "redux-saga/effects";
import { emailLoginWorkerWatcher } from "./authSaga";
import { contactCreateWatcher, contactDeleteWatcher, contactEditWatcher, contactListWatcher, contactViewWatcher } from "./contactsSaga";

export default function* rootSaga() {
    yield all([

        emailLoginWorkerWatcher(),
       


    ]);
}
