import { call, put, takeLatest, select } from 'redux-saga/effects';
import { protectedGet, protectedPost, protectedPut, protectedDelete } from '../../api/protected';
import * as types from '../constants/contactConstants';
import api from '../api/axios';

const getAccessToken = (state) => state.auth.accessToken;

function* fetchContacts(action) {
  try {
    const token = yield select(getAccessToken);
    const { data } = yield call(protectedGet, '/contacts', token, action.payload);
    yield put({ type: types.FETCH_CONTACTS_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: types.FETCH_CONTACTS_FAILURE, payload: e.response?.data?.message || e.message });
  }
}

function* createContact(action) {
  try {
    const token = yield select(getAccessToken);
    yield call(protectedPost, '/contacts', action.payload, token);
    yield put({ type: types.FETCH_CONTACTS_REQUEST, payload: { page: 1 } }); // refresh list
  } catch (e) { console.error(e); }
}

function* updateContact(action) {
  try {
    const token = yield select(getAccessToken);
    yield call(protectedPut, `/contacts/${action.id}`, action.payload, token);
    yield put({ type: types.FETCH_CONTACTS_REQUEST, payload: { page: 1 } });
  } catch (e) { console.error(e); }
}

function* deleteContact(action) {
  try {
    const token = yield select(getAccessToken);
    yield call(protectedDelete, `/contacts/${action.id}`, token);
    yield put({ type: types.FETCH_CONTACTS_REQUEST, payload: { page: 1 } });
  } catch (e) { console.error(e); }
}

export default function* contactsSaga() {
  yield takeLatest(types.FETCH_CONTACTS_REQUEST, fetchContacts);
  yield takeLatest(types.CREATE_CONTACT_REQUEST, createContact);
  yield takeLatest(types.UPDATE_CONTACT_REQUEST, updateContact);
  yield takeLatest(types.DELETE_CONTACT_REQUEST, deleteContact);
}
