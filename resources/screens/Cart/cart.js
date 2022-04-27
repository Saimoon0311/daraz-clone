import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  ADDTOCART,
  ADDTOWISHLIST,
  API_BASED_URL,
  CARTDELETE,
  deleteAllCartData,
  Images_API,
  testCART,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {NineCubesLoader, BubblesLoader} from 'react-native-indicator';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/type';
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export default function Cart({navigation}) {
  const {saveProduct} = useSelector(state => state.savePosts);
  const dispatch = useDispatch();
  // console.log(42, saveProduct);
  const [cartdata, setCartdata] = useState([]);
  const [user_id, setUser_id] = useState();
  const [total, setTotal] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [totalPriceShow, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [nshowAlert, setNshowAlert] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [product_id, setProduct_id] = useState();
  const [isLoading, setLoading] = useState(true);
  const [silderData, setSliderData] = useState(null);
  const isFocused = useIsFocused();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dummy, setDummy] = useState(1);
  const [isSelected, setSelection] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [users, setUser] = useState();

  const translationGetters = {
    en: () => require('../../config/Translate/en.json'),
    fr: () => require('../../config/Translate/fr.json'),
  };
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  const setI18nConfig = async () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

    translate.cache.clear();

    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
  };
  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => setDummy(dummy + 1))
      .catch(error => {
        console.error(error);
      });
  };

  const checkStatus = async () => {
    const user = await getUserData();
    if (user == null || user == undefined) {
      setCartdata(saveProduct);
      setIsLoggedIn(false);
      setLoading(false);
      notLogintotalprice(saveProduct);
    } else if (user !== null || user !== undefined) {
      setUser(user);
      setIsLoggedIn(true);
      sendSaveCartData();
    }
  };
  const mapOnCartData = async () => {
    const user = await getUserData();
    saveProduct.map(res => {
      fetch(ADDTOCART, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON?.stringify({
          product_id: res.id,
          user_id: user.id,
          attribute: res?.attributeValue,
        }),
      })
        .then(res => res.json())
        .then(async json => {})
        .catch(err => {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Something want',
            backgroundColor: '#E9691D',
          });
        });
    });
  };
  const sendSaveCartData = async () => {
    if (saveProduct.length > 0) {
      await mapOnCartData();
      dispatch({
        type: types.CLEAR_SAVE_PRODUCT,
      });
      await getCartCall(true);
    } else {
      getCartCall(true);
    }
  };
  const recentArray = [
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];

  const getCartCall = async confirm => {
    if (confirm) {
      const userId = await getUserData();
      const users = userId.id;
      setUser_id(users);
      fetch(`${testCART}/${users}`, {
        method: 'GET',
      })
        .then(async response => await response.json())
        .then(async json => {
          if (json.message == 'Cart is empty') {
            setCartdata([]);
            setSliderData([]);
            setLoading(false);
          } else {
            setCartdata(json[0]);
            setLoading(false);
          }
        })
        .catch(e => {
          console.log(192, e);
        });
    } else {
      setCartdata([]);
    }
  };
  useEffect(() => {
    (async () => {
      await checkStatus();
      RNLocalize.addEventListener('change', handleLocalizationChange());
      if (isFocused) {
        await checkStatus();
        setCheckBox(false);
        setTotalPrice(0);
        console.log(58, 'screen is Focused');
      } else {
        console.log(58, 'screen is not Focused');
      }
    })();
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange());
    };
  }, [isFocused, saveProduct]);

  const selectedTotalPrice = async data => {
    if (data !== undefined && data !== []) {
      var listSeleted = data.filter(item => item.seleted == true);
      var selectedTotal = 0;
      listSeleted.map(res => {
        selectedTotal = selectedTotal + Number(res.product_total);
      });
      setTotalPrice(selectedTotal.toFixed(2));
    } else {
      totalprice();
    }
  };

  const showDeleteAlert = id => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={translate('Remove from Cart!')}
        titleStyle={{color: 'black'}}
        message={translate(
          'Are you sure you want to remove item from your cart',
        )}
        messageStyle={{color: 'gray', textAlign: 'center'}}
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText={translate('Yes')}
        cancelText={translate('No')}
        confirmButtonStyle={styles.buttonstyle}
        cancelButtonStyle={styles.buttonstyle}
        cancelButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonColor={color.textColorRedCart}
        cancelButtonColor={color.textColorRedCart}
        onConfirmPressed={() => {
          deleteCartItem(itemId);
          setShowAlert(false);
        }}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
    );
  };
  const quantityIncrease = async (type, id, quantity) => {
    const userId = await getUserData();
    const users = userId.id;
    const a = `${API_BASED_URL}${type}/${users}/${id}`;
    fetch(a, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(json => {
        setCartdata(json[0]);
        selectedTotalPrice(json[0]);
      });
  };

  const deleteCartItem = id => {
    setLoading(true);
    const api = CARTDELETE + '/' + id + '/' + user_id;
    fetch(api, {
      method: 'GET',
    })
      .then(async response => await response.json())
      .then(json => {
        selectedTotalPrice(json);
        setCartdata(json),
          showMessage({
            type: 'success',
            icon: 'success',
            message: translate('Your Cart Has been deleted'),
            backgroundColor: '#E9691D',
          });
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  };
  const addtowishlist = id => {
    var product_id = id;
    fetch(`${ADDTOWISHLIST}/${id}/${user_id}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0].message == 'Added to wishlist') {
          showMessage({
            type: 'success',
            icon: 'success',
            message: translate(json[0]?.message),
            backgroundColor: '#E9691D',
          });
          getCartCall(true);
        } else {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: translate(json[0]?.message),
            backgroundColor: '#E9691D',
          });
          getCartCall(true);
        }
      });
  };

  const notLogintotalprice = data => {
    if (data.length > 0) {
      var total = 0;
      data.map(res => {
        total = total + Number(res.price);
      });
      setTotalPrice(total);
    }
  };
  var n = [];
  const onChangeCheckValue = async item => {
    const newData = cartdata.map(res => {
      if (res.id == item.id) {
        return {
          ...res,
          seleted: !res.seleted,
        };
      }
      return {
        ...res,
        seleted: res.seleted,
      };
    });
    await setCartdata(newData);
    checkDataLength(newData);
    selectedTotalPrice(newData);
  };
  const totalprice = () => {
    if (cartdata !== []) {
      let sum = 0;
      cartdata.forEach(obj => {
        for (let property in obj) {
          if (property == 'product_total') {
            sum += obj[property];
          }
        }
      });
      console.log(161, sum);
      setTotalPrice(sum);
    }
  };
  const checkStatusType = async () => {
    var listSeleted = cartdata.filter(item => item.seleted == true);
    if (checkBox == true) {
      navigation.navigate('checkOut', {
        screenData: cartdata,
        totalPrice: totalPriceShow,
      });
    } else {
      if (listSeleted.length > 0) {
        navigation.navigate('checkOut', {
          screenData: listSeleted,
          totalPrice: totalPriceShow,
        });
      } else {
        showMessage({
          type: 'danger',
          icon: 'auto',
          message: translate('Kindly select at least 1 item'),
          backgroundColor: '#E9691D',
        });
      }
    }
  };
  const checkDataLength = data => {
    var listSeleted = data.filter(item => item.seleted == true);
    if (cartdata.length == listSeleted.length) {
      setCheckBox(true);
    } else {
      setCheckBox(false);
      data.map(res => {
        return {
          ...res,
          seleted: !res.seleted,
        };
      });
    }
  };
  const loginData = (item, att, index) => {
    return (
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cartdetails', item)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: `${Images_API}/${item?.get_products?.images[0]?.name}`,
              }}
              style={styles.imageStyle}
            />

            <View style={{marginTop: hp('2')}}>
              <Text numberOfLines={1} style={styles.productNameStyle}>
                {item?.get_products?.name}
              </Text>

              <View
                style={{
                  width: wp('50%'),
                  flexDirection: 'row',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: hp('2'),
                    color: '#512500',
                    marginLeft: 10,
                    marginBottom: hp('1'),
                  }}>
                  {translate('Price :')}
                </Text>
                {item?.get_products?.is_discounted == 2 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: wp('45'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        color: '#512500',
                        textDecorationLine: 'line-through',
                      }}>
                      {users?.currency.symbol}
                      {item?.get_products?.price}
                    </Text>
                    <Text style={styles.productDiscountPriceStyle}>
                      {users?.currency.symbol}
                      {item?.get_products?.discounted_price}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.productPriceStyle}>
                    {users?.currency.symbol}
                    {item?.get_products?.price}
                  </Text>
                )}
              </View>
              {item?.attributes?.length == 0 ||
              item?.attributes == null ? null : (
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('55%'),
                  }}>
                  <Text style={styles.attributeStyle}>Attribute :</Text>
                  <View style={styles.attributeViewStyleValue}>
                    {att &&
                      att?.map(res => {
                        return (
                          <Text
                            numberOfLines={1}
                            style={styles.attributeStyleValue}>
                            {res}
                          </Text>
                        );
                      })}
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity>
              <CheckBox
                tintColors={{true: 'yellow', false: 'red'}}
                onTintColor={color.themColorPrimary}
                onCheckColor={color.themColorPrimary}
                disabled={false}
                value={!item.seleted && !checkBox ? false : true}
                onAnimationType="bounce"
                offAnimationType="stroke"
                boxType="circle"
                tintColors={'red'}
                style={styles.checkBox}
                onValueChange={() => onChangeCheckValue(item, index)}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.heartIconicContainer} />
        <View style={{flexDirection: 'row'}}>
          {item?.is_wishlisted == true ? (
            <TouchableOpacity onPress={() => addtowishlist(item?.product_id)}>
              <Ionicons
                style={{paddingTop: hp('2.5')}}
                name="heart"
                color="#B64400"
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => addtowishlist(item?.product_id)}>
              <Ionicons
                style={{paddingTop: hp('2.5')}}
                name="heart-outline"
                color="#B64400"
                size={20}
              />
            </TouchableOpacity>
          )}
          <View style={styles.verticleLine}></View>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              setItemId(item?.id);
              showDeleteAlert(item?.id);
              setShowAlert(true);
            }}>
            <Ionicons
              style={{paddingTop: hp('2.5'), marginRight: 10}}
              name="trash"
              size={20}
              color="#B64400"
            />
            <Text style={styles.remov}>{translate('Remove')}</Text>
          </TouchableOpacity>
          <View style={styles.decrementViewButton}>
            {item?.quantity > 1 && (
              <TouchableOpacity
                onPress={() =>
                  quantityIncrease(
                    'decrement-cart-data',
                    item?.id,
                    item?.quantity,
                  )
                }>
                <Ionicons
                  name="remove-circle-sharp"
                  size={25}
                  color={color.themColorPrimary}
                  style={{
                    paddingTop: hp(Platform?.OS == 'ios' ? '2.2' : '2'),
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.incrementViewButton}> {item?.quantity} </Text>
            <TouchableOpacity
              onPress={() =>
                quantityIncrease(
                  'increment-cart-data',
                  item?.id,
                  item?.quantity,
                )
              }>
              <Ionicons
                name="add-circle-sharp"
                size={25}
                color={color.themColorPrimary}
                style={{
                  paddingTop: hp(Platform?.OS == 'ios' ? '2.2' : '2'),
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const logoutData = item => {
    const att = item?.attributeValue;
    return (
      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: `${Images_API}/${item?.images[0]?.name}`,
              }}
              style={styles.logoutImageContainer}
            />
            <View style={{marginTop: 20}}>
              <Text numberOfLines={1} style={styles.logoutNameContainer}>
                {item?.name}
              </Text>
              <View
                style={{
                  width: wp('50%'),
                  flexDirection: 'row',
                }}>
                <Text numberOfLines={1} style={styles.logoutPriceContainer}>
                  Price :
                </Text>
                {item?.is_discounted == 2 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.logoutPriceValueContainer}>
                      $ {item?.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        color: 'red',
                        marginLeft: wp('2'),
                      }}>
                      $ {item?.discounted_price}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: hp('2'),
                      color: color.textColorRedCart,
                      marginBottom: hp('1'),
                    }}>
                    $ {item?.price}
                  </Text>
                )}
              </View>
              {item?.attributeValue?.length == 0 ? null : (
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('55%'),
                    // flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2'),
                      color: '#512500',

                      // color: color.textColorRedCart,
                      // fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    Attribute :
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      // backgroundColor: 'green',
                      width: wp('35'),
                    }}>
                    {att &&
                      att?.map(res => {
                        return (
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: hp('1.9'),
                              // color: color.textColorRedCart,
                              // fontWeight: 'bold',
                              color: '#512500',
                              marginLeft: wp('1'),
                              alignItems: 'center',
                              // width: wp('34'),
                            }}>
                            {res}
                          </Text>
                        );
                      })}
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: '#C8C8C8',
            marginTop: hp('1'),
          }}
        />
        <View style={{flexDirection: 'row'}}>
          {item?.is_wishlisted == true ? (
            <TouchableOpacity onPress={() => navigation.navigate('MyTabs')}>
              <Ionicons
                style={{paddingTop: hp('2.5')}}
                name="heart"
                color="#B64400"
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('MyTabs')}>
              <Ionicons
                style={{paddingTop: hp('2.5')}}
                name="heart-outline"
                color="#B64400"
                size={20}
              />
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
      onPress={() => addtowishlist(item?.product_id)}>
      <Ionicons
        style={{paddingTop: hp('2.5')}}
        name="heart-outline"
        color="#B64400"
        size={20}
      />
    </TouchableOpacity> */}
          <View style={styles.verticleLine}></View>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              dispatch({
                type: types.UNSAVEPRODUCT,
                payload: item,
              });
              setCartdata(saveProduct);
              notLogintotalprice(saveProduct);
              // setItemId(item?.id);
              // showDeleteAlert(item?.id);
              // setShowAlert(true);
            }}>
            <Ionicons
              style={{paddingTop: hp('2.5'), marginRight: 10}}
              name="trash"
              size={20}
              color="#B64400"
            />
            <Text style={styles.remov}>Remove</Text>
          </TouchableOpacity>
          {/* <View
            style={{
              marginLeft: 'auto',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {item?.quantity > 1 && (
              <TouchableOpacity
                onPress={() =>
                  quantityIncrease(
                    'decrement-cart-data',
                    item?.id,
                    item?.quantity,
                  )
                }>
                <Ionicons
                  name="remove-circle-sharp"
                  size={25}
                  color={color.themColorPrimary}
                  style={{paddingTop: hp('2'), marginRight: 10}}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                paddingTop: hp(Platform?.OS == 'ios' ? '2.2' : '2'),
                marginRight: 10,
                fontSize: hp('3.2'),
                color: '#EEB08B',
                fontWeight: 'bold',
              }}>
              {' '}
              {item?.quantity}{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                quantityIncrease(
                  'increment-cart-data',
                  item?.id,
                  item?.quantity,
                )
              }>
              <Ionicons
                name="add-circle-sharp"
                size={25}
                color={color.themColorPrimary}
                style={{paddingTop: hp('2'), marginRight: 10}}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  };
  const checkAllSelect = value => {
    setCheckBox(value);
    if (value == true) {
      totalprice();
    } else if (value == false) {
      cartdata.map(res => {
        return {
          ...res,
          seleted: !res.seleted,
        };
      });
      setTotalPrice(0);
    }
  };
  const deleteAllCart = () => {
    if (isLoggedIn == true) {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };
      fetch(deleteAllCartData + user_id, requestOptions)
        .then(res => res.json())
        .then(json => {
          showMessage({
            type: 'success',
            icon: 'success',
            message: translate(json.message),
            backgroundColor: '#E9691D',
          });
          getCartCall(true);
        })
        .catch(err => console.log(err));
    } else {
      dispatch({
        type: types.CLEAR_SAVE_PRODUCT,
      });
      showMessage({
        type: 'success',
        icon: 'success',
        message: 'All data has been deleted!',
        backgroundColor: '#E9691D',
      });
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>{translate('Carts')}</Text>
        <TouchableOpacity
          onPress={() => {
            setNshowAlert(true);
          }}>
          <MaterialIcons
            name="delete-outline"
            size={30}
            color={cartdata.length > 0 ? '#512500' : '#FFDDC9'}
            style={{
              ...styles.icon,
              marginRight: wp('3'),
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 150}}
          nestedScrollEnabled={true}>
          {isLoading ? (
            <View style={{alignSelf: 'center', marginTop: hp('20%')}}>
              <BubblesLoader size={50} color="#512500" dotRadius={10} />
            </View>
          ) : cartdata.length == 0 ? (
            <View style={styles.imm}>
              <Ionicons name="cart" color="#E9691D" size={80} />
              <Text numberOfLines={1} style={styles.tee}>
                {translate('You have no items in the cart')}.
              </Text>
              <Text style={{color: 'gray'}}>
                {translate('Add items you want to shop')}
              </Text>
              <TouchableOpacity
                style={styles.maior}
                // onPress={() => navigation.navigate('checkOut')}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.or}>{translate('Continue Shopping')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {isLoggedIn == true && (
                <View style={styles.insideContainer}>
                  <CheckBox
                    tintColors={{true: 'yellow', false: 'red'}}
                    onTintColor={color.themColorPrimary}
                    onCheckColor={color.themColorPrimary}
                    disabled={false}
                    value={checkBox}
                    onAnimationType="bounce"
                    offAnimationType="stroke"
                    boxType="circle"
                    tintColors={'red'}
                    style={{...styles.checkBox, marginLeft: wp('0')}}
                    onValueChange={value => {
                      checkAllSelect(value);
                    }}
                  />
                  <Text
                    style={{
                      ...styles.selectText,
                      color: checkBox ? color.themColorPrimary : 'gray',
                    }}>
                    {translate('Select All')}
                  </Text>
                </View>
              )}
              <FlatList
                data={cartdata}
                nestedScrollEnabled
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  const att = item?.attributes;
                  const data = item;
                  return isLoggedIn == true
                    ? loginData(item, att, index)
                    : logoutData(item, att);
                }}
              />
              {cartdata?.length > 0 && (
                <View>
                  <View style={styles.box}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: 'gray', fontSize: hp('2%')}}>
                        {translate('Subtotal')}
                      </Text>
                      <Text style={styles.ty}>
                        {users?.currency.symbol} {totalPriceShow}
                      </Text>
                    </View>
                    <Text></Text>
                    <View
                      style={{flex: 1, height: 1, backgroundColor: 'black'}}
                    />
                    <Text></Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: color.textColorRedCart,
                          fontWeight: 'bold',
                          fontSize: hp('2%'),
                        }}>
                        {translate('Total')}
                      </Text>
                      <Text
                        style={[
                          styles.ty,
                          {color: color.textColorRedCart, fontWeight: 'bold'},
                        ]}>
                        {users?.currency.symbol} {totalPriceShow}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.maior}
                      onPress={() => {
                        isLoggedIn == true
                          ? checkStatusType()
                          : navigation.navigate('MyTabs');
                      }}>
                      <Text style={styles.or}>
                        {translate('Complete your order')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.recentTextContainer}>
                    <TouchableOpacity>
                      <Text style={{...styles.sliderText, color: 'grey'}}>
                        Recent Views
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.sliderText}>See All</Text>
                    </TouchableOpacity>
                  </View> */}

                  {/* <ScrollView
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    horizontal={true}>
                    <View style={styles.bottomImageScroller}>
                      {cartdata?.length > 0 &&
                        recentArray?.map(res => {
                          return (
                            <View style={styles.bottomimages}>
                              <Image
                                style={styles.imagss}
                                source={{
                                  uri: 'https://picsum.photos/200',
                                }}
                                // source={{
                                //   uri: 'https://reqres.in/img/faces/7-image.jpg',
                                // }}
                              />
                            </View>
                          );
                        })}
                    </View>
                  </ScrollView> */}
                </View>
              )}
            </View>
          )}

          {showDeleteAlert()}
        </ScrollView>
      </View>
      <AwesomeAlert
        show={nshowAlert}
        showProgress={false}
        title={translate('Warning!')}
        message={translate('Are you sure you want to delete all product ?')}
        messageStyle={{color: 'gray', textAlign: 'center'}}
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText={translate('Yes')}
        cancelText={translate('No')}
        confirmButtonStyle={styles.buttonstyle}
        cancelButtonStyle={styles.buttonstyle}
        cancelButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonColor={color.textColorRedCart}
        cancelButtonColor={color.textColorRedCart}
        onConfirmPressed={() => {
          setNshowAlert(false);
          deleteAllCart();
        }}
        onCancelPressed={() => {
          setNshowAlert(false);
        }}
      />
    </View>
  );
}
