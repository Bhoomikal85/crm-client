import { all } from "redux-saga/effects";
import { emailLoginWorkerWatcher } from "./authSaga";
import { contactsCreateWatcher, contactsDeleteWatcher, contactsEditWatcher, contactsListWatcher, contactsViewWatcher } from "./contactsSaga";

export default function* rootSaga() {
    yield all([

        emailLoginWorkerWatcher(),
        contactsListWatcher(),
        contactsEditWatcher(),
        contactsViewWatcher(),
        contactsCreateWatcher(),
        contactsDeleteWatcher()


    ]);
}
