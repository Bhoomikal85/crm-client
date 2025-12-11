import { call, takeLatest } from "redux-saga/effects";
import * as contactsApis from "../api/contactsApis"
import { CONTACT_CREATE, CONTACT_DELETE, CONTACT_EDIT, CONTACT_LIST, CONTACT_VIEW } from "../actions/types";

function* listWorker({ params, onSuccess, onError }) {
    try {
        const res = yield call(contactsApis.contactsListApi, params);
        res.status === 200 ? onSuccess(res) : onError(res);
    } catch (err) {
        onError(err.response || err);
    }
}

function* viewWorker({ id, onSuccess, onError }) {
    try {
        const res = yield call(contactsApis.contactsViewApi, id);
        res.status === 200 ? onSuccess(res) : onError(res);
    } catch (err) {
        onError(err.response || err);
    }
}

function* createWorker({ data, onSuccess, onError }) {
    try {
        const res = yield call(contactsApis.contactsCreateApi, data);
        res.status === 201 ? onSuccess(res) : onError(res);
    } catch (err) {
        onError(err.response || err);
    }
}

function* editWorker({ id, data, onSuccess, onError }) {
    try {
        const res = yield call(contactsApis.contactsEditApi, id, data);
        res.status === 200 ? onSuccess(res) : onError(res);
    } catch (err) {
        onError(err.response || err);
    }
}

function* deleteWorker({ id, onSuccess, onError }) {
    try {
        const res = yield call(contactsApis.contactsDeleteApi, id);
        res.status === 200 ? onSuccess(res) : onError(res);
    } catch (err) {
        onError(err.response || err);
    }
}

export function* contactSaga() {
    yield takeLatest(CONTACT_LIST, listWorker);
    yield takeLatest(CONTACT_VIEW, viewWorker);
    yield takeLatest(CONTACT_CREATE, createWorker);
    yield takeLatest(CONTACT_EDIT, editWorker);
    yield takeLatest(CONTACT_DELETE, deleteWorker);
}