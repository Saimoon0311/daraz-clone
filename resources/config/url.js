export const API_BASED_URL = "https://test-urls.com/elitedesignhub/moyen-express/public/api/"
export const Images_API = "https://test-urls.com/elitedesignhub/moyen-express/public/storage/public/products"

export const getApi = (endpoint) => API_BASED_URL+ endpoint

export const LOGIN = getApi('login-api?email=testvendor@gmail.com&password=password')
export const SIGNUP = getApi('sing-up-api')
export const GETPRODUCT = getApi('get-product')
export const CART = getApi('get-cart-api')