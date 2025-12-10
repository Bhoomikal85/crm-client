import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import contactsSaga from './contactsSaga'; // we'll add next

export default function* rootSaga() {
  yield all([
    authSaga(),
    contactsSaga()
  ]);
}
