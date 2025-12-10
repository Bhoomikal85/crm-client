import api from './axios';

export const protectedGet = (url, accessToken, params) => {
  return api.get(url, {
    params,
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const protectedPost = (url, body, accessToken) => {
  return api.post(url, body, { headers: { Authorization: `Bearer ${accessToken}` } });
};

export const protectedPut = (url, body, accessToken) => {
  return api.put(url, body, { headers: { Authorization: `Bearer ${accessToken}` } });
};

export const protectedDelete = (url, accessToken) => {
  return api.delete(url, { headers: { Authorization: `Bearer ${accessToken}` } });
};
