import {getAuth} from "../repositories/storage";

const request = async (method, apiMethod, auth = true) => {
    let headers = {
        Accept: 'application/json',
    }

    if (auth) {
        let auth = await getAuth()
        headers.Authorization = auth.token
    }
    const init = {
        method: method,
        headers: headers
    }
    return fetch('https://raifhack-api.judoekb.ru/api/' + apiMethod, init)
        .then((response) => {
            return response.json()
        })
}

export const getRequest = async (apiMethod, auth = true) => {
    return request('GET', apiMethod, auth);
}

export const postRequest = async (apiMethod, auth = true) => {
    return request('POST', apiMethod, auth);
}

