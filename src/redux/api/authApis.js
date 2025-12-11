import { api } from "./api";


export const emailLoginApi = (params) => {
    return api.post(`/auth/login`, JSON.stringify(params));
};

