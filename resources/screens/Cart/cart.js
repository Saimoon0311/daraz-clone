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
  CART,
  CARTDELETE,
  Images_API,
  QUANTITYINCREASE,
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

export default function Cart({navigation}) {
  const {saveProduct} = useSelector(state => state.savePosts);
  const dispatch = useDispatch();
  console.log(42, saveProduct);
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

  const checkStatus = async () => {
    const user = await getUserData();
    if (user == null || user == undefined) {
      // console.log(240);
      setCartdata(saveProduct);
      setIsLoggedIn(false);
      setLoading(false);
      notLogintotalprice(saveProduct);
    } else if (user !== null || user !== undefined) {
      setIsLoggedIn(true);
      sendSaveCartData();
    }
  };
  console.log(4273, cartdata);
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
        .then(async json => {
          console.log(91, json);
        })
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
      // console.log(48, userId?.id);
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
            totalprice(json[0]);
            setLoading(false);
            // console.log(54, json[0]);
            // console.log(63, JSON?.parse(json[0][2]?.attributes));
          }
        })
        .catch(e => {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Something want wrong',
            backgroundColor: '#E9691D',
          });
        });
    } else {
      setCartdata([]);
    }
  };
  // const getRecentData = async () => {
  //   const userId = await getUserData();
  //   const users = userId.id;
  //   setUser_id(users);
  //   fetch(`${testCART}/${users}`, {
  //     method: 'GET',
  //   })
  //     .then(async response => await response.json())
  //     .then(async json => {
  //       setSliderData(json[0]);
  //       // console.log(800, json[0]);
  //       // console.log(80, JSON?.parse(silderData[0]?.attributes));
  //       // console.log(78, json);
  //     })
  //     .catch(e => {
  //       // showMessage({
  //       //   type: 'danger',
  //       //   icon: 'danger',
  //       //   message: 'Something want wrong',
  //       // });
  //       // console.log(94, e);
  //     });
  // };

  useEffect(() => {
    (async () => {
      await checkStatus();
      if (isFocused) {
        await checkStatus();
        console.log(58, 'screen is Focused');
      } else {
        console.log(58, 'screen is not Focused');
      }
    })();
  }, [isFocused, saveProduct]);

  const showDeleteAlert = id => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Remove from Cart!"
        message="Are you sure you want to remove this item from your cart."
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Yes"
        cancelText="No"
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
    // console.log(163, a);
    // if (quantity >= 0) {

    // } else{

    //   console.log(183,quantity)
    // }
    fetch(a, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(json => {
        setCartdata(json[0]);
        totalprice(json[0]);
      });
  };

  const deleteCartItem = id => {
    setLoading(true);
    // console.log(140, id);
    // console.log('before ------->>>>>', cartdata);
    const api = CARTDELETE + '/' + id + '/' + user_id;
    // console.log(api);
    fetch(api, {
      method: 'GET',
    })
      .then(async response => await response.json())
      .then(json => {
        // getCartCall();
        totalprice(json);
        setCartdata(json),
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Your Cart Has been deleted',
            backgroundColor: '#E9691D',
          });
        setLoading(false);
        // console.log(68, cartdata);
      })
      .catch(e => {
        // console.log(170, e);
        setLoading(false);
      });
    // .finally(() => setLoading(false));
  };
  const addtowishlist = id => {
    // setLoading(true);
    var product_id = id;
    //  setCartloading(true)
    //  await ff()
    // console.log('id', id, 'userid', user_id);
    fetch(`${ADDTOWISHLIST}/${id}/${user_id}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0].message == 'Added to wishlist') {
          showMessage({
            type: 'success',
            icon: 'success',
            message: json[0].message,
            backgroundColor: '#E9691D',
          });
          getCartCall(true);
          // setLoading(false);
        } else {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: json[0].message,
            backgroundColor: '#E9691D',
          });
          getCartCall(true);
          // setLoading(false)
        }
      });
  };

  const totalprice = data => {
    // console.log(134);
    if (data !== undefined) {
      // console.log(148, data);
      let sum = 0;
      data?.forEach(obj => {
        for (let property in obj) {
          // console.log(152);
          if (property == 'product_total') {
            // console.log(154);
            sum += obj[property];
          }
        }
      });
      // console.log(161, sum);
      // return sum;
      setTotalPrice(sum);
    }
  };
  const notLogintotalprice = data => {
    // console.log(134);

    // console.log(306, total);
    if (data.length > 0) {
      var total = 0;
      data.map(res => {
        // console.log(302, Number(res.price));
        total = total + Number(res.price);
      }); // console.log(148, data);
      // let sum = 0;
      // data.forEach(obj => {
      //   for (let property in obj) {
      //     if (property == 'price') {
      //       console.log(152, property.price);
      //       // console.log(154);
      //       sum += obj[property];
      //     }
      //   }
      // });
      // console.log(161, sum);
      // return sum;
      setTotalPrice(total);
    }
  };
  const loginData = (item, att) => {
    return (
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cartdetails', item)}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: `${Images_API}/${item?.get_products?.images[0]?.name}`,
              }}
              style={{
                width: wp('30%'),
                height: hp('15%'),
                borderRadius: 10,
              }}
            />
            <View style={{marginTop: 20}}>
              <Text
                numberOfLines={1}
                style={{
                  width: wp('40%'),
                  fontSize: hp('1.8'),
                  color: color.textColorRedCart,
                  marginLeft: 10,
                  marginBottom: hp('1'),
                  fontWeight: 'bold',
                }}>
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
                    // color: color.textColorRedCart,
                    color: '#512500',

                    // fontWeight: 'bold',
                    marginLeft: 10,
                    marginBottom: hp('1'),
                  }}>
                  Price : ${/* Price : ${item?.get_products?.price} */}
                </Text>
                {item?.get_products?.is_discounted == 2 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        // color: color.textColorRedCart,
                        color: '#512500',

                        // fontWeight: 'bold',
                        textDecorationLine: 'line-through',
                      }}>
                      {item?.get_products?.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        color: 'red',
                        // fontWeight: 'bold',
                        marginLeft: wp('2'),
                      }}>
                      {item?.get_products?.discounted_price}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: hp('2'),
                      // color: '#512500',

                      color: color.textColorRedCart,
                      // fontWeight: 'bold',
                      marginBottom: hp('1'),
                    }}>
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
              setItemId(item?.id);
              // setProduct_id(item?.product_id)
              showDeleteAlert(item?.id);
              setShowAlert(true);
              // console.log(356,item.id)
            }}>
            <Ionicons
              style={{paddingTop: hp('2.5'), marginRight: 10}}
              name="trash"
              size={20}
              color="#B64400"
            />
            <Text style={styles.remov}>Remove</Text>
          </TouchableOpacity>
          <View
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
              style={{
                width: wp('30%'),
                height: hp('15%'),
                borderRadius: 10,
              }}
            />
            <View style={{marginTop: 20}}>
              <Text
                numberOfLines={1}
                style={{
                  width: wp('40%'),
                  fontSize: hp('1.8'),
                  color: color.textColorRedCart,
                  marginLeft: 10,
                  marginBottom: hp('1'),
                  fontWeight: 'bold',
                }}>
                {item?.name}
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
                  Price : ${/* Price : ${item?.get_products?.price} */}
                </Text>
                {item?.is_discounted == 2 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        color: '#512500',
                        textDecorationLine: 'line-through',
                      }}>
                      {item?.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp('2'),
                        color: 'red',
                        marginLeft: wp('2'),
                      }}>
                      {item?.discounted_price}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: hp('2'),
                      color: color.textColorRedCart,
                      marginBottom: hp('1'),
                    }}>
                    {item?.price}
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
        <Text style={styles.te}>Carts</Text>
        <Ionicons
          name="cart"
          size={30}
          color="#FFDDC9"
          style={{
            ...styles.icon,
            marginRight: wp('3'),
          }}
        />
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
                You have no items in the cart.
              </Text>
              <Text style={{color: 'gray'}}>Add items you want to shop</Text>
              <TouchableOpacity
                style={styles.maior}
                // onPress={() => navigation.navigate('checkOut')}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.or}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <FlatList
                data={cartdata}
                nestedScrollEnabled
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  const att = item?.attributes;
                  const data = item;
                  // return loginData(item, att);
                  return isLoggedIn == true
                    ? loginData(item, att)
                    : logoutData(item, att);
                }}
              />
              {cartdata?.length > 0 && (
                <View>
                  <View style={styles.box}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: 'gray', fontSize: hp('2%')}}>
                        Subtotal
                      </Text>
                      <Text style={styles.ty}>
                        $ {totalPriceShow.toFixed(3)}
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
                        Total
                      </Text>
                      <Text
                        style={[
                          styles.ty,
                          {color: color.textColorRedCart, fontWeight: 'bold'},
                        ]}>
                        $ {totalPriceShow.toFixed(3)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.maior}
                      onPress={() =>
                        isLoggedIn == true
                          ? navigation.navigate('checkOut', {
                              screenData: cartdata,
                              totalPrice: totalPriceShow.toFixed(3),
                            })
                          : navigation.navigate('MyTabs')
                      }>
                      <Text style={styles.or}>Complete your order</Text>
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
