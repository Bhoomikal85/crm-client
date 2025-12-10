import * as types from '../constants/contactConstants';
export const fetchContacts = (payload) => ({ type: types.FETCH_CONTACTS_REQUEST, payload }); // payload {page, q, status}
export const createContact = (payload) => ({ type: types.CREATE_CONTACT_REQUEST, payload });
export const updateContact = (id, payload) => ({ type: types.UPDATE_CONTACT_REQUEST, id, payload });
export const deleteContact = (id) => ({ type: types.DELETE_CONTACT_REQUEST, id });
