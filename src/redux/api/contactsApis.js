import { api } from "./api";


export const contactsListApi = (params) => {
    return api.get(`/contacts`, { params });
};

export const contactsViewApi = (id) => {
    return api.get(`/contacts/${id}`);
};

export const contactsEditApi = (id, params) => {
    return api.put(`/contacts/${id}`, params);
};

export const contactsCreateApi = (params) => {
    return api.post(`/contacts`, params);
};

export const contactsDeleteApi = (id) => {
    return api.delete(`/contacts/${id}`);
};