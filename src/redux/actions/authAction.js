import { EMAIL_LOGIN} from "./types";


export const emailLoginAction = (data, onSuccess, onError) => {
    return {
        type: EMAIL_LOGIN,
        data,
        onSuccess,
        onError,
    };
};
