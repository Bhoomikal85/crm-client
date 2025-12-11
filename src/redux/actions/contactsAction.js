import { CONTACT_CREATE, CONTACT_LIST, CONTACT_EDIT, CONTACT_VIEW,CONTACT_DELETE} from "../types";

export const contactList = (data, onSuccess, onError) => {
    return {
        type: CONTACT_LIST,
        data,
        onSuccess,
        onError,
    };
};

export const contactView = (id, onSuccess, onError) => {
    return {
        type: CONTACT_VIEW,
        id,
        onSuccess,
        onError,
    };
};

export const contactEdit = (data, onSuccess, onError) => {
    return {
        type: CONTACT_EDIT,
        data,
        onSuccess,
        onError,
    };
};



export const contactCreate = (data, onSuccess, onError) => {
    return {
        type: CONTACT_CREATE,
        data,
        onSuccess,
        onError,
    };
};


export const contactDelete = (data, onSuccess, onError) => {
    return {
        type: CONTACT_DELETE,
        data,
        onSuccess,
        onError,
    };
};