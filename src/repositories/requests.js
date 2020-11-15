import {getRequest} from "../helpers/request";

export const getUserToken = (userId) => {
    return getRequest('auth/hack/'+userId, false);
}

export const getOffers = () => {
    return getRequest('offers');
}

export const getShops = () => {
    return getRequest('shop/list');
}

export const getShopById = (id) => {
    return getRequest('shop/'+id);
}

export const getCartById = (id) => {
    console.log('cart/'+id+'/user/info');
    return getRequest('cart/'+id+'/user/info');
}

export const postCart = (id) => {
    return getRequest('cart/'+id+'/pay');
}
