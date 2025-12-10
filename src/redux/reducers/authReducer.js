import * as types from '../constants/authConstants';

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_REQUEST:
    case types.SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
    case types.REFRESH_SUCCESS:
      return { ...state, loading: false, accessToken: action.payload.accessToken, user: action.payload.user };
    case types.LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.LOGOUT:
      return initialState;
    default: return state;
  }
}
