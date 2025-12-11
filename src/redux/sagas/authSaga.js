import { call, takeLatest } from "redux-saga/effects";
import * as authApis from "../apis/authApis"
import { EMAIL_LOGIN, EMAIL_SIGNUP, GOOGLE_LOGIN } from "../actions/types";


export function* emailLoginWorker(action) {
    try {
        const res = yield call(authApis.emailLoginApi, action.data);
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


/**Watcher functions */


export function* emailLoginWorkerWatcher() {
    yield takeLatest(EMAIL_LOGIN, emailLoginWorker);
}

