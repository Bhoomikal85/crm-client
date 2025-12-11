import { call, takeLatest } from "redux-saga/effects";
import * as contactsApis from "../api/contactsApis"
import { CONTACTS_CREATE, CONTACTS_DELETE, CONTACTS_EDIT, CONTACTS_LIST, CONTACTS_VIEW } from "../actions/types";


export function* contactsListWorker(action) {
    try {
        const res = yield call(contactsApis.contactsListApi, action.data);

        if (res.status == 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}



export function* contactsEditWorker(action) {
    try {
        const res = yield call(contactsApis.contactsEditApi,action.data );
        if (res.status == 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}

export function* contactsViewWorker(action) {
    try {
        const res = yield call(contactsApis.contactsViewApi, {
            id: action.id,
        });
        if (res.status == 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}




export function* contactsCreateWorker(action) {
    try {
        const res = yield call(contactsApis.contactsCreateApi, action.data);
        if (res.status == 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}
export function* contactsDeleteWorker(action) {
    try {
        const res = yield call(contactsApis.contactsDeleteApi, action.data);
        if (res.status == 200) {
            yield action.onSuccess(res);
        } else {
            yield action.onError(res);
        }
    } catch (error) {
        yield action.onError({
            data: {
                message: error,
            },
        });
    }
}




export function* contactsListWatcher() {
    yield takeLatest(CONTACTS_LIST, contactsListWorker);
}

export function* contactsEditWatcher() {
    yield takeLatest(CONTACTS_EDIT, contactsEditWorker);
}

export function* contactsViewWatcher() {
    yield takeLatest(CONTACTS_VIEW, contactsViewWorker);
}


export function* contactsCreateWatcher() {
    yield takeLatest(CONTACTS_CREATE, contactsCreateWorker);
}

export function* contactsDeleteWatcher() {
    yield takeLatest(CONTACTS_DELETE, contactsDeleteWorker);
}