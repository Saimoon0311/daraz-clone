export const API_BASED_URL = "https://test-urls.com/elitedesignhub/moyen-express/public/api/"
export const Images_API = "https://test-urls.com/elitedesignhub/moyen-express/public/storage/public/products"

export const getApi = (endpoint) => API_BASED_URL+ endpoint

export const LOGIN = getApi('login-api?')
export const SIGNUP = getApi('sing-up-api')
export const GETPRODUCT = getApi('get-product')
export const CART = getApi('get-cart-api')
export const testCART = getApi('get-cart-api-test')
export const CARTDELEtE =getApi('cart-delete')
export const ADDTOCART =getApi('cart-data-api')
export const CATEGORY = getApi ('shop/category')
export const SUBCAT = getApi('shop/category/subcategory/')
export const ARRIVALS =getApi('new-arrivals')
export const FEATURED =getApi('featured')
export const USERDATA =getApi('user-detail')
export const SUBCATPRODUCTDATA = getApi('shop/sub-category')
export const ADDTOWISHLIST = getApi('add-to-wishlist')
export const ALLFEATUREDPRODUCTS = getApi('products-featured/')