import * as types from '../constants/contactConstants';
const initialState = { items: [], total: 0, page: 1, pages: 0, loading: false, error: null };

export default function contactReducer(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_CONTACTS_REQUEST:
      return {...state, loading: true};
    case types.FETCH_CONTACTS_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case types.FETCH_CONTACTS_FAILURE:
      return {...state, loading: false, error: action.payload};
    default: return state;
  }
}
