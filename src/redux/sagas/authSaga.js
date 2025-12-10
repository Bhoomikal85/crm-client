import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api/axios';
import * as types from '../constants/authConstants';

function* login(action) {
  try {
    const { data } = yield call(api.post, '/auth/login', action.payload);
    // data: { accessToken, user }
    yield put({ type: types.LOGIN_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: types.LOGIN_FAILURE, payload: e.response?.data?.message || e.message });
  }
}

function* signup(action) {
  try {
    const { data } = yield call(api.post, '/auth/signup', action.payload);
    yield put({ type: types.SIGNUP_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: types.SIGNUP_FAILURE, payload: e.response?.data?.message || e.message });
  }
}

function* refresh() {
  try {
    const { data } = yield call(api.post, '/auth/refresh');
    yield put({ type: types.REFRESH_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: types.LOGIN_FAILURE, payload: 'Session expired' });
  }
}

export default function* authSaga() {
  yield takeLatest(types.LOGIN_REQUEST, login);
  yield takeLatest(types.SIGNUP_REQUEST, signup);
  yield takeLatest(types.REFRESH_REQUEST, refresh);
}
