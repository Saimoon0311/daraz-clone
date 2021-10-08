export const API_BASED_URL = "https://test-urls.com/elitedesignhub/moyen-express/public/api/"

export const getApi = (endpoint) => API_BASED_URL+ endpoint

export const LOGIN = getApi('login-api?email=testvendor@gmail.com&password=password')
export const SIGNUP = getApi('sing-up-api')