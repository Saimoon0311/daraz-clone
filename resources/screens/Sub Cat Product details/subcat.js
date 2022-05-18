import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ADDTOWISHLIST,
  AllDataWithOutUserId,
  ALLFEATUREDPRODUCTS,
  AllFeaturedProductWithOutUser,
  ALLNEWARRIVALS,
  AllNewArrivalsDataSkipUser,
  API_BASED_URL,
  filterProductUrl,
  Images_API,
  searchDataWithOutUserID,
  SubCatAllProduct,
  SubCatAllProductsUserSkip,
  SubCategoryDataWithOutUserID,
  SUBCATPRODUCTDATA,
} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import {color} from '../../config/color';
import {styles} from './style';
import {BubblesLoader} from 'react-native-indicator';
import AwesomeAlert from 'react-native-awesome-alerts';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';
import {useIsFocused} from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';
import {FilterModal} from '../../Reuseable component/HomeCartIcon/filterModal';
import {languageCheck} from '../../config/languageChecker';
import {useSelector} from 'react-redux';

export default function subcatdetails({route, navigation}) {
  const {languageType} = useSelector(state => state.languageType);
  const paramData = route?.params;
  const productData = route?.params?.item;
  const getSearchData = route?.params?.seacrhDatas;
  const [user_id, setUser_id] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [allData, setAllData] = useState([]);
  const [priceData, setPriceData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [cartloading, setCartloading] = useState(false);
  const [nshowAlert, setNshowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();
  const [filterModal, setFilterModal] = useState(false);
  const [checksubcat, setChecksubcat] = useState(true);
  const [filter, setFilter] = useState(false);
  const [price, setPrice] = useState([]);
  const [catergory, setCategory] = useState(null);
  const [end, setEnd] = useState('2500000');
  const [start, setStart] = useState('0');
  const [wishlist, setWishlist] = useState(false);
  const [user, setUser] = useState();
  const getSubCatData = async confirm => {
    const user = await getUserData();
    const id = user?.id;
    // const user = await getUserData();
    // const id = user?.id;
    // console.log(50, productData?.id);
    // ${productData?.id}
    // console.log(58, confirm);
    fetch(
      confirm == true
        ? `${SUBCATPRODUCTDATA}/${productData?.id}/${id}`
        : SubCategoryDataWithOutUserID + productData?.id,
    )
      // fetch(`${SUBCATPRODUCTDATA}/20/${id}`)
      .then(response => response.json())
      .then(json => {
        // console.log(51, json);
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        // console.log(58, error);
      });
  };
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const getSavedItemsData = async () => {
    const userId = await getUserData()?.then(res => res?.id);

    fetch(`${API_BASED_URL}${paramData?.screenData}/${userId}`)
      .then(response => response.json())
      .then(json => {
        // console.log(69, json);
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        // console.log(70, error);
      });
  };

  const searchAllData = async confirm => {
    const user = await getUserData();
    const id = user?.id;
    // console.log(96, confirm);
    fetch(
      confirm == true
        ? `${API_BASED_URL}${paramData?.screenData}/${id}?name=${getSearchData}`
        : searchDataWithOutUserID + '?name=' + getSearchData,
    )
      .then(response => response.json())
      .then(json => {
        // console.log(86, json);
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        // console.log(90, error);
      });
  };
  const getAllData = async confirm => {
    const user = await getUserData();
    const id = user?.id;
    fetch(
      confirm == true
        ? `${API_BASED_URL}${paramData?.screenData}${id}`
        : AllDataWithOutUserId,
    )
      .then(response => response.json())
      .then(json => {
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        // console.log(error);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something want wrongs.',
          backgroundColor: '#E9691D',
        });
      });
  };
  const SubCatAllProducts = async confirm => {
    const user = await getUserData();
    const id = user?.id;
    fetch(
      confirm == true
        ? `${SubCatAllProduct}${productData?.id}/${id}`
        : `${SubCatAllProductsUserSkip}${productData?.id}`,
    )
      .then(response => response.json())
      .then(json => {
        console.log(23854873254782352748, json);
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        console.log(163, error);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something want wrongs.',
          backgroundColor: '#E9691D',
        });
      });
  };
  const getAllNewArrivalsData = async confirm => {
    const user = await getUserData();
    const id = user?.id;
    // console.log(111, confirm);
    fetch(
      confirm == true ? `${ALLNEWARRIVALS}${id}` : AllNewArrivalsDataSkipUser,
    )
      .then(response => response.json())
      .then(json => {
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        // console.log(error);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something want wrongs.',
          backgroundColor: '#E9691D',
        });
      });
  };
  const getAllFeaturedsData = async confirm => {
    const user = await getUserData();
    const id = user?.id;
    // console.log(111, confirm);
    fetch(
      confirm == true
        ? `${ALLFEATUREDPRODUCTS}${id}`
        : AllFeaturedProductWithOutUser,
    )
      .then(response => response.json())
      .then(json => {
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        // console.log(error);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something want wrongs.',
          backgroundColor: '#E9691D',
        });
      });
  };
  const parentFunction = async confirm => {
    if (paramData?.screenData == 'subCat') {
      setChecksubcat(false);
      await getSubCatData(confirm);
    } else if (paramData?.screenData == 'wishlist') {
      // setWishlist(true);/
      setChecksubcat(true);
      await getSavedItemsData();
    } else if (paramData?.screenData == 'search-products') {
      setChecksubcat(true);
      await searchAllData(confirm);
    } else if (paramData?.screenData == 'featured-data-all/') {
      setChecksubcat(true);
      await getAllData(confirm);
    } else if (paramData?.screenData == ALLNEWARRIVALS) {
      setChecksubcat(true);
      await getAllNewArrivalsData(confirm);
    } else if (paramData?.screenData == ALLFEATUREDPRODUCTS) {
      setChecksubcat(true);
      await getAllFeaturedsData(confirm);
    } else if (paramData?.screenData == 'sub-category-all-data/') {
      setChecksubcat(false);
      await SubCatAllProducts(confirm);
    }
  };
  const checkStatus = async () => {
    const user = await getUserData();
    if (user == null) {
      setIsLoggedIn(false);
      await parentFunction(false);
    } else if (user !== null) {
      const users = await getUserData();
      setUser(users);
      setUser_id(users?.id);
      setIsLoggedIn(true);
      await parentFunction(true);
    }
  };

  const addtowishlist = id => {
    fetch(`${ADDTOWISHLIST}/${id}/${user_id}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0]?.message == 'Added to wishlist') {
          if (filter == true) {
            categoryDataCall(catergory, start, end);
          } else if (filter == false) {
            parentFunction(true);
          }
          showMessage({
            type: 'success',
            icon: 'success',
            message: languageCheck(json[0]?.message),
            backgroundColor: '#E9691D',
          });
        } else if (
          json[0]?.message == 'This item has been removed from your wishlist'
        ) {
          if (filter == true) {
            categoryDataCall(catergory, start, end);
          } else if (filter == false) {
            parentFunction(true);
          }
          showMessage({
            type: 'success',
            icon: 'auto',
            message: languageCheck(json[0]?.message),
            backgroundColor: '#E9691D',
          });
        }
      })
      .catch(error => {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: languageCheck('Something went wrong.'),
          backgroundColor: '#E9691D',
        });
      });
  };
  const renderHeaderText = () => {
    if (paramData?.screenData == ALLFEATUREDPRODUCTS) {
      return <Text>{languageCheck('Featured')}</Text>;
    } else if (paramData?.screenData == ALLNEWARRIVALS) {
      return <Text>{languageCheck('New Arrivals')}</Text>;
    } else if (paramData?.screenData == 'subCat') {
      return <Text>{productData?.name}</Text>;
    } else if (paramData?.screenData == 'wishlist') {
      return <Text>{languageCheck('Wishlist')}</Text>;
    } else if (paramData?.screenData == 'search-products') {
      return <Text>{languageCheck('Search Items')}</Text>;
    } else if (paramData?.screenData == 'featured-data-all/') {
      return <Text>{languageCheck('All Products')}</Text>;
    } else if (paramData?.screenData == 'sub-category-all-data/') {
      return (
        <Text>
          {languageType?.code == 'en'
            ? paramData?.item?.name
            : paramData?.item?.name_fr}
        </Text>
      );
    }
  };
  const routeToLogin = () => {
    // console.log(22222);
    navigation.navigate('MyTabs');
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'MyTabs'}],
    // });
  };
  const renderCards = item => {
    return (
      <View style={{...styles.box, marginLeft: wp('6%')}}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
          <ImageBackground
            style={styles.im}
            imageStyle={{borderRadius: 20}}
            source={{uri: `${Images_API}/${item?.images[0]?.name}`}}
            // source={{uri: `${Images_API}/${item?.images[0]?.name}`}}
          >
            {item.featured == 1 ? (
              <Text style={styles.fea}>{languageCheck('Featured')}</Text>
            ) : null}
            {item.is_discounted == 2 ? (
              <Text style={[styles.fea, {backgroundColor: '#512500'}]}>
                {item.discounted_percentage}%OFF
              </Text>
            ) : null}
            {item?.is_wishlisted == true ? (
              <TouchableOpacity
                style={styles.icons}
                onPress={() => {
                  isLoggedIn == true ? addtowishlist(item?.id) : routeToLogin();
                }}>
                <Ionicons
                  name="heart"
                  color={color.themColorPrimary}
                  size={30}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.icons}
                onPress={() => {
                  isLoggedIn == true ? addtowishlist(item?.id) : routeToLogin();
                }}>
                <Ionicons
                  name="heart-outline"
                  color={color.themColorPrimary}
                  size={30}
                />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              style={styles.icons}
              onPress={() => addtowishlist(item?.id)}>
              <Ionicons name="heart" color={color.themColorPrimary} size={30} />
            </TouchableOpacity> */}
          </ImageBackground>
          <View style={{width: wp('35%')}}>
            <Text style={styles.text} numberOfLines={1}>
              {item?.name}
            </Text>
          </View>
          {item.is_discounted == 2 ? (
            <View
              style={{
                width: wp('35%'),
                alignSelf: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    textDecorationLine: 'line-through',
                  }}
                  numberOfLines={1}>
                  {isLoggedIn ? user?.currency?.symbol : '$'} {item.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}>
                  {' '}
                  {isLoggedIn ? user?.currency?.symbol : '$'}{' '}
                  {item.discounted_price}
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={{
                color: '#512500',
                fontSize: hp('2%'),
                fontWeight: 'bold',
                paddingTop: hp('1'),
                // paddingLeft: wp('2%'),
                textAlign: 'center',
              }}>
              {/* $ {item.price} */}
              {isLoggedIn ? user?.currency?.symbol : '$'} {item.price}
            </Text>
          )}
        </TouchableOpacity>
        <Text></Text>
        {/* {item?.stock < 1 ? (
          <Text style={styles.stock}>Out Of Stock</Text>
        ) : (
          <TouchableOpacity
            style={styles.cart}
            onPress={() => addtocart(item?.id)}>
            <Text style={styles.carttext}>Add to Cart</Text>
          </TouchableOpacity>
        )} */}
      </View>
    );
  };

  const renderWishlistData = item => {
    return (
      <View style={{...styles.box, marginLeft: wp('6%')}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', item?.get_products)}>
          <ImageBackground
            style={styles.im}
            imageStyle={{borderRadius: 20}}
            source={{
              uri: `${Images_API}/${item?.get_products?.images[0]?.name}`,
            }}
            // source={{
            //   uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
            // }}
          >
            {item?.get_products?.featured == 1 ? (
              <Text style={styles.fea}>{languageCheck('Featured')}</Text>
            ) : null}
            {item?.get_products?.is_discounted == 2 ? (
              <Text style={[styles.fea, {backgroundColor: '#512500'}]}>
                {item?.get_products?.discounted_percentage}%OFF
              </Text>
            ) : null}
            {item?.is_wishlisted == true ? (
              <TouchableOpacity
                style={styles.icons}
                onPress={() => addtowishlist(item?.get_products?.id)}>
                <Ionicons
                  style={{paddingTop: 13}}
                  name="heart"
                  color="#b64400"
                  size={30}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.icons}
                onPress={() => addtowishlist(item?.get_products?.id)}>
                <Ionicons
                  style={{paddingTop: 13}}
                  name="heart-outline"
                  color="#b64400"
                  size={30}
                />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              style={styles.icons}
              onPress={() => addtowishlist(item?.get_products?.id)}>
              <Ionicons name="heart" color={color.themColorPrimary} size={30} />
            </TouchableOpacity> */}
          </ImageBackground>
          <View style={{width: wp('35%')}}>
            <Text style={styles.text} numberOfLines={1}>
              {item?.get_products?.name}
            </Text>
          </View>
          {item?.get_products?.is_discounted == 2 ? (
            <View
              style={{
                width: wp('35'),
                alignSelf: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    textDecorationLine: 'line-through',
                  }}
                  numberOfLines={1}>
                  {user?.currency?.symbol} {item?.get_products?.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}>
                  {' '}
                  {user?.currency?.symbol}{' '}
                  {item?.get_products?.discounted_price}
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={{
                color: '#512500',
                fontSize: hp('2%'),
                fontWeight: 'bold',
                paddingTop: hp('2'),
                textAlign: 'center',
              }}>
              {user?.currency?.symbol} {item?.get_products?.price}
            </Text>
          )}
        </TouchableOpacity>
        <Text></Text>
        {/* {item?.get_products?.stock < 1 ? (
          <Text style={styles.stock}>Out Of Stock</Text>
        ) : (
          <TouchableOpacity
            style={styles.cart}
            onPress={() => addtocart(item?.product_id)}>
            <Text style={styles.carttext}>Add to Cart</Text>
          </TouchableOpacity>
        )} */}
      </View>
    );
  };

  const checkRender = item => {
    if (paramData?.isWishlist) {
      return renderWishlistData(item);
    } else {
      return renderCards(item);
    }
  };
  var checkApiType;
  var searchName = '';
  const checkFilterFunction = async () => {
    if (paramData?.screenData == 'subCat') {
      checkApiType = `child_category_id/${productData?.id}`;
    } else if (paramData?.screenData == ALLFEATUREDPRODUCTS) {
      checkApiType = `featured/1`;
    } else if (paramData?.screenData == ALLNEWARRIVALS) {
      checkApiType = `newarrivals/0`;
    } else if (paramData?.screenData == 'featured-data-all/') {
      checkApiType = 'alldata/0';
    } else if (paramData?.screenData == 'search-products') {
      checkApiType = `search`;
      searchName = `&filter[name]=${getSearchData}`;
    }
  };
  const categoryDataCall = async (category, start, end) => {
    setCategory(category), setStart(start);
    setEnd(end);
    var userID = isLoggedIn == true ? user_id : '0';
    console.log(577, userID);
    await checkFilterFunction();
    // var price = '0' + ',' + '29615';
    var price = start + ',' + end;

    var checkUrlType =
      category !== null
        ? `${filterProductUrl + userID}/cat_id/${
            category.id
          }?filter[pricebetween]=${price}`
        : `${
            filterProductUrl + userID
          }/${checkApiType}?filter[pricebetween]=${price}`;

    fetch(checkUrlType)
      .then(response => response.json())
      .then(json => {
        setAllData(json[0]);
        setLoading(false);
      })
      .catch(error => {
        console.log(554, error);
      });
  };
  var data = [];

  const applyFilter = async (category, start, end) => {
    setLoading(true);
    categoryDataCall(category, start, end);
  };

  useEffect(() => {
    (async () => {
      if (isFocused) {
        await checkStatus();
      }
    })();
  }, [isFocused]);
  const groupData = (items, groupLen) => {
    const groups = [];
    let i = 0;

    while (i < items.length) {
      groups.push(items.slice(i, (i += groupLen)));
    }

    return groups;
  };
  const groupedItems = groupData(allData, 5);
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={hp('3')}
            color="#512500"
            style={{...styles.icon, marginLeft: wp('3')}}
          />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.te}>
          {renderHeaderText()}
        </Text>
        <View
          style={{
            ...styles.icon,
            marginTop: hp(Platform?.OS == 'ios' ? '4' : '0'),
          }}>
          <HomeCartIcon isLoggedIn={isLoggedIn} navigations={navigationProps} />
        </View>
      </View>
      {paramData?.screenData != 'wishlist' &&
        paramData?.screenData != 'search-products' &&
        paramData?.screenData != 'sub-category-all-data/' &&
        allData.length > 0 && (
          <TouchableOpacity
            onPress={() => setFilterModal(true)}
            style={styles.filterView}>
            <Text style={styles.filterText}>{languageCheck('Filter')}</Text>
            <Foundation size={hp('2.5')} color="#512500" name="filter" />
          </TouchableOpacity>
        )}
      <FilterModal
        subCatCheck={checksubcat}
        filterModal={filterModal}
        onPress={() => setFilterModal(false)}
        applyFilter={applyFilter}
        filterValue={filter}
        setFilter={confirm => setFilter(confirm)}
      />
      <View style={{...styles.body}}>
        {isLoading ? (
          <View style={{margin: hp('22%'), alignSelf: 'center'}}>
            <BubblesLoader size={50} dotRadius={10} color="#512500" />
          </View>
        ) : allData?.length == 0 ? (
          <View style={styles.imm}>
            <Ionicons name="cart" color="#E9691D" size={80} />
            <Text style={styles.tee}>
              {languageCheck('You have no items in this list')}
            </Text>
            <TouchableOpacity
              style={styles.maior}
              onPress={() => navigation.goBack()}>
              <Text style={styles.or}>
                {languageCheck('Continue Shopping')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {catergory !== null && (
              <Text
                style={{
                  color: '#512500',
                  fontSize: hp('2'),
                  marginLeft: wp('4'),
                  marginBottom: hp('2'),
                }}>
                {languageCheck('Category')} : {catergory.name}
              </Text>
            )}

            <FlatList
              data={allData}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              extraData={allData}
              contentContainerStyle={{
                paddingBottom: hp('20%'),
                width: wp('100%'),
                alignSelf: 'flex-start',
              }}
              renderItem={({item}) => {
                return checkRender(item);
              }}
            />
          </>
        )}
      </View>
      <AwesomeAlert
        show={nshowAlert}
        showProgress={false}
        title="Warning!"
        message="You are not connect to the internet."
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setNshowAlert(false);
        }}
      />
    </View>
  );
}
