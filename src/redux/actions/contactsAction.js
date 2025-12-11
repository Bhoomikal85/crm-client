import { CONTACT_CREATE, CONTACT_LIST, CONTACT_EDIT, CONTACT_VIEW,CONTACT_DELETE} from "./types";

export const contactList = (params, onSuccess, onError) => ({
    type: CONTACT_LIST,
    params,
    onSuccess,
    onError
});

export const contactView = (id, onSuccess, onError) => ({
    type: CONTACT_VIEW,
    id,
    onSuccess,
    onError
});

export const contactCreate = (data, onSuccess, onError) => ({
    type: CONTACT_CREATE,
    data,
    onSuccess,
    onError
});

export const contactEdit = (id, data, onSuccess, onError) => ({
    type: CONTACT_EDIT,
    id,
    data,
    onSuccess,
    onError
});

export const contactDelete = (id, onSuccess, onError) => ({
    type: CONTACT_DELETE,
    id,
    onSuccess,
    onError
});