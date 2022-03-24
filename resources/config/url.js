export const API_BASED_URL_STOCK = 'https://moyenxpress.com/';
export const API_BASED_URL = 'https://moyenxpress.com/public/api/';
export const Images_API = 'https://moyenxpress.com/public/products';

export const getApi = endpoint => API_BASED_URL + endpoint;

export const FORGETPASSWORD = API_BASED_URL_STOCK + 'forgot-password';

export const LOGIN = getApi('login-api?');
export const SIGNUP = getApi('sing-up-api');
export const GETPRODUCT = getApi('get-product');
export const CART = getApi('get-cart-api');
export const testCART = getApi('get-cart-api-test');
export const CARTDELETE = getApi('cart-delete');
export const ADDTOCART = getApi('cart-data-api');
export const CATEGORY = getApi('shop/category');
export const SUBCAT = getApi('shop/category/subcategory/');
export const ARRIVALS = getApi('new-arrivals');
export const FEATURED = getApi('featured');
export const USERDATA = getApi('user-detail');
export const SUBCATPRODUCTDATA = getApi('shop/sub-category');
export const ADDTOWISHLIST = getApi('shop/add-to-wishlist');
export const ALLFEATUREDPRODUCTS = getApi('products-featured/');
export const BRANDDATA = getApi('dataOfShops');
export const WISHLISTDATA = getApi('wishlist');
export const SEARCH = getApi('search-products');
export const PASSWORDCHNAGE = getApi('changeUserPassword');
export const USERPROFILEUPDATE = getApi('user-detail-update');
export const ALLNEWARRIVALS = getApi('all-new-arrivals/');
export const USERORDERDEATILS = getApi('shop/user-order-details/');
export const QUANTITYINCREASE = getApi('cart-data');
export const ORDERPLACE = getApi('place-an-order');
export const GETCLIENTSECRET = getApi('stripe-form/submit');
export const SENDINTENTANDORDERDATA = getApi('stripe-form/aftersubmit');
export const REVIEWS = getApi('reviews');
export const ALLDATA = getApi('featured-data-all');
export const searchDataWithOutUserID = getApi('search-products-userskip/');
export const AllFeaturedProductWithOutUser = getApi(
  'products-featured-userskip',
);
export const CANCELORDER = getApi('cancel_order');
export const CATEGORYALLDATA = getApi('shop/category-all-data');
export const featuredDefault = getApi('featured-data-all-userskip/');
export const newArrivalDefault = getApi('new-arrivals-userskip/');
export const SubCategoryDataWithOutUserID = getApi(
  'shop/sub-category-userskip/',
);
export const AllDataWithOutUserId = getApi('featured-data-all-over-userskip');
export const AllNewArrivalsDataSkipUser = getApi('all-new-arrivals-userskip/');
export const filterProductUrl = getApi('get-filter/');
export const getFollowApi = getApi('get-follow');
export const postFollowApi = getApi('post-follow');
export const shippingDetailsApi = getApi(
  'get-order-details-with-shipping-billing/',
);

// export const StripePKey =
//   'pk_test_51JzIR5EyPVCLsOYzHfADwwDDXkZBsqTwRdoNbJzNzZNrsdqsOXfWaC6phXJ5Mz8MJk1GeEW8iWZNx1vimLbhJFyN00TyN94KRD';

export const StripePKey =
  'pk_live_51K5P49EoiJYB55N4fClLpBw782KOcOakMNZGmbx2KSVJ59cBhoyIAY4WIF4bINlTF1g0h9rImBDCHEJj9KF2UymM00CL5YnH4E';
