import { api } from "./api";


export const contactsListApi = (params) => {
    return api.get(`/contacts/list`, { params: params });
};

export const contactsViewApi = (params) => {
    return api.get(`/contacts/view`, {
        params: params
    });
};



export const contactsEditApi = (params) => {
    return api.post(`/contacts/edit`, JSON.stringify(params));
};

export const contactsCreateApi = (params) => {
    return api.post(`/contacts/create`, JSON.stringify(params));
};
export const contactsDeleteApi = (params) => {
    return api.post(`/contacts/delete`, JSON.stringify(params));
};