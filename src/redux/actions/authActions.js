import * as types from '../constants/authConstants';

export const loginRequest = (payload) => ({ type: types.LOGIN_REQUEST, payload });
export const signupRequest = (payload) => ({ type: types.SIGNUP_REQUEST, payload });
export const refreshRequest = () => ({ type: types.REFRESH_REQUEST });
export const logout = () => ({ type: types.LOGOUT });
