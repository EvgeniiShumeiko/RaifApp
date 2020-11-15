import {storeString, storeObject, getObject, getString} from '../helpers/storage';

export const setAuth = (data) => {
    return storeObject('token', {token: data.token, uid: data.uid})
}

export const getAuth = async () => {
    return getObject('token');
}
