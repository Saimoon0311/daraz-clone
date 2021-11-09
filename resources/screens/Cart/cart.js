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
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  ADDTOWISHLIST,
  CART,
  CARTDELEtE,
  Images_API,
  testCART,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {NineCubesLoader, BubblesLoader} from 'react-native-indicator';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Cart({navigation}) {
  const [cartdata, setCartdata] = useState(null);
  const [user_id, setUser_id] = useState();
  const [total, setTotal] = useState('');
  const [quantity, setQuantity] = useState(null);
  const [totalPriceShow, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [nshowAlert, setNshowAlert] = useState(false);
  const [itemId, setItemId] = useState(null);
  // const add = () => {
  //   console.log(cartdata[0].quantity + 1);
  // };
  const [isLoading, setLoading] = useState(true);

  const getCartCall = async () => {
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
          setLoading(false);
        } else {
          setCartdata(json);
          totalprice(json);
          setLoading(false);
          // console.log(54);
        }
      })
      .catch(e => {
        setNshowAlert(true)
      })
  };

  useEffect(() => {
    (async () => {
      getCartCall();
    })();
  }, []);

  const showDeleteAlert = id => {
    return (
        <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Remove from Cart!"
        message="Are you sure you want to remove this item from your cart."
        contentContainerStyle={{width:wp('80%')}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Yes"
        cancelText="No"
        confirmButtonStyle={styles.buttonstyle}
        cancelButtonStyle={styles.buttonstyle}
        cancelButtonTextStyle={{fontSize:hp('2.2%')}}
        confirmButtonTextStyle={{fontSize:hp('2.2%')}}
        confirmButtonColor={color.textColorRedCart}
        cancelButtonColor={color.textColorRedCart}
        onConfirmPressed={() => {
          deleteCartItem(itemId)
          setShowAlert(false)
        }}
        onCancelPressed={()=>{
          setShowAlert(false)
        }}
      />
    );
  };


  const deleteCartItem = id => {
    setLoading(true);
    console.log(140, id);
    // console.log('before ------->>>>>', cartdata);
    const api = CARTDELEtE + '/' + id;
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
          })
          // console.log(68, cartdata);
      })
      .catch((e)=>{
        // console.log(170,e)
      })
      .finally(() => setLoading(false));
  };
  const addtowishlist = id => {
    var product_id = id;
    //  setCartloading(true)
    //  await ff()
    // console.log('userid', user_id);
    fetch(`${ADDTOWISHLIST}/${id}/${user_id}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0].message == 'Added to wishlist') {
          showMessage({
            type: 'success',
            icon: 'success',
            message: json[0].message,
          })
        } else {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: json[0].message,
          })
        }
      });
  };

  const totalprice = data => {
    // console.log(134);
    if (data !== undefined) {
      // console.log(148, data);
      let sum = 0;
      data?.forEach(obj => {
        for (let property in obj?.get_products) {
          // console.log(152);
          if (property == 'price') {
            // console.log(154);
            sum += obj?.get_products[property];
          }
        }
      });
      // console.log(161, sum);
      // return sum;
      setTotalPrice(sum);
    }
  };
  const testfunction = () => {
    // setShowAlert(true);
    // console.log(78, showAlert);
    return (
      <AwesomeAlert
        show={showAlert}
        title="Remove from Cart!"
        message="Are you sure you want to remove this item from your cart."
        confirmText="Yessss"
        showConfirmButton={true}
        onConfirmPressed={() => {
          // deleteCartItem(id);
          // setShowAlert(false);
        }}
      />
    );
  };

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFDDC9',
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 10,
          shadowRadius: 6,
          elevation: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#512500',
            fontWeight: 'bold',
            marginTop: 25,
          }}>
          Carts
        </Text>
        <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon} />
      </View>
      <View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 150}}
          nestedScrollEnabled={true}>
          {isLoading ? (
            <View style={{alignSelf: 'center', marginTop: hp('20%')}}>
              <BubblesLoader size={50} color="#512500" dotRadius={10} />
            </View>
          ) : cartdata?.length == 0 ? (
            <View style={styles.imm}>
              <Ionicons name="cart" color="#E9691D" size={80} />
              <Text style={styles.tee}>You have no items in the cart</Text>
              <Text style={{color: 'gray'}}>Add items you want to shop</Text>
              <TouchableOpacity
                style={styles.maior}
                onPress={() => navigation.goBack()}>
                <Text style={styles.or}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* {console.log(211)} */}
              <FlatList
                data={cartdata}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  // console.log(215,cartdata)
                  return (
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Cartdetails', item)
                        }>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={{
                              uri: `${Images_API}/${item.get_products.images[0].name}`,
                            }}
                            style={{width: wp('30%'), height: hp('15%')}}
                          />
                          <View style={{marginTop: 20}}>
                            <Text
                              numberOfLines={2}
                              style={{
                                width: wp('40%'),
                                fontSize: 14,
                                color: color.textColorRedCart,
                                marginLeft: 10,
                              }}>
                              {item.get_products.description}
                            </Text>
                            <Text></Text>
                            <Text
                              style={{
                                width: wp('95%'),
                                fontSize: 18,
                                color: color.textColorRedCart,
                                fontWeight: 'bold',
                                marginLeft: 10,
                              }}>
                              Price : ${item.get_products.price}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{flex: 1, height: 1, backgroundColor: 'black'}}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => addtowishlist(item.id)}>
                          <Ionicons
                            style={{paddingTop: 13}}
                            name="heart-outline"
                            color="#B64400"
                            size={20}
                          />
                        </TouchableOpacity>
                        <View style={styles.verticleLine}></View>
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={() => {
                            setItemId(item.id)
                            showDeleteAlert(item.id)
                            setShowAlert(true)
                            // console.log(356,item.id)

                          }}>
                          <Ionicons
                            style={{paddingTop: 13, marginRight: 10}}
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
                          <TouchableOpacity>
                            <Ionicons
                              name="remove-circle-sharp"
                              size={20}
                              color={color.themColorPrimary}
                              style={{paddingTop: 13, marginRight: 10}}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              paddingTop: 13,
                              marginRight: 10,
                              fontSize: 14,
                              color: '#EEB08B',
                              textDecorationLine: 'underline',
                              fontWeight: 'bold',
                            }}>
                            {' '}
                            {item.quantity}{' '}
                          </Text>
                          <TouchableOpacity >
                            <Ionicons
                              name="add-circle-sharp"
                              size={20}
                              color={color.themColorPrimary}
                              style={{paddingTop: 13, marginRight: 10}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              {cartdata?.length > 0 && (
                <View style={styles.box}>
                  {/* {console.log(323,cartdata
                    )} */}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', fontSize: hp('2%')}}>
                      Subtotal
                    </Text>
                    <Text style={styles.ty}>{totalPriceShow}</Text>
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
                      {totalPriceShow}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.maior}>
                    <Text style={styles.or}>Complete your order</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

          {showDeleteAlert()}

          {/* <CardField
      postalCodeEnabled={true}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    /> */}

    <ScrollView horizontal={true} >
    <View style={{flexDirection:"row",justifyContent:"space-between",marginLeft:20}} >
          <View style={styles.bottomimages} >
            <Image style={styles.imagss} source={{ uri: "https://reqres.in/img/faces/7-image.jpg" }} />
          </View>
          <View style={styles.bottomimages}>
            <Image style={styles.imagss} source={{ uri: "https://reqres.in/img/faces/7-image.jpg" }} />
          </View>
          <View style={styles.bottomimages}>
            <Image style={styles.imagss} source={{ uri: "https://reqres.in/img/faces/7-image.jpg" }} />
          </View>
          <View style={styles.bottomimages}>
            <Image style={styles.imagss} source={{ uri: "https://reqres.in/img/faces/7-image.jpg" }} />
          </View>
          <View style={styles.bottomimages}>
            <Image style={styles.imagss} source={{ uri: "https://reqres.in/img/faces/7-image.jpg" }} />
          </View>
        </View>
        </ScrollView>
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

// var example = [{a:1, b:2, c:3}, {a:4, b:5, c:6}, {a:7, b:8, c:9}];

// let sum = 0;
// example.forEach(obj => {
//     for (let property in obj) {
//         if(property !== "c")
//         sum += obj[property];
//     }
// })
