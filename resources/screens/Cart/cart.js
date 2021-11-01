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
import {ADDTOWISHLIST, CART, CARTDELEtE, Images_API, testCART} from '../../config/url';
import {getUserData} from '../../utils/utils';
import { NineCubesLoader,BubblesLoader } from 'react-native-indicator';
import {color} from "../../config/color"
import { styles } from './style';

export default function Cart({navigation}) {
  const [cartdata, setCartdata] = useState(null);
  const [user_id,setUser_id] =useState()
  const [total,setTotal]=useState('')
  const [quantity,setQuantity]=useState(null)
  const add = () => {
    console.log(cartdata[0].quantity+1)
  };
  const [isLoading, setLoading] = useState(true);
  useEffect(async () => {
    const userId = await getUserData();
    const users = userId.id;
    setUser_id(users)
    fetch(`${testCART}/${users}`, {
      method: 'GET',
    })
      .then(async response => await response.json())
      .then(json => {
        if (json.message == 'Cart is empty') {
          //  setCartdata("null")
          setLoading(false);
        } else {
          setCartdata(json);
          // const tota= cartdata.created_at
          // setTotal(tota)
        }
      })
      .finally(() => setLoading(false));
  }, []);
// console.log("==================xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=============================",cartdata.created_at)
  const onDeleteAlert = id => {
    Alert.alert(
      'Remove from Cart ',
      'Are you sure you want to remove this item from your cart !',
      [{text: 'Yes', onPress: () => delet(id),style:"destructive"}, {text: 'No',style:"cancel"}],
      {cancelable: true},
    );
  };
  const delet = id => {
    setLoading(true);
    console.log('before ------->>>>>', cartdata);
    const api = CARTDELEtE + '/' + id;
    console.log(api);
    fetch(api, {
      method: 'GET',
    })
      .then(async response => await response.json())
      .then(json => {
        setCartdata(json),
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Your Cart Has been deleted',
          }),
          console.log(68, cartdata);
      })
      .finally(() => setLoading(false));
  };
  const addtowishlist =(id)=>{
    var product_id =id
    //  setCartloading(true)
          //  await ff()
         console.log("userid",user_id)
         fetch(`${ADDTOWISHLIST}/${id}/${user_id}`)
     .then(async response => await response.json())
     .then(json =>{
    if (json[0].message=="Added to wishlist") {
    showMessage({
    type:"success",
    icon:"success",
    message:json[0].message
    }),console.log(json[0].message)
    } else {
    showMessage({
    type:"warning",
    icon:"warning",
    message:json[0].message
    }),console.log(json[0].message)
    }}
    )
    //  .catch(error => console.error(17, error))
    }
  return (
    <View style={styles.main} >
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
        <ScrollView contentContainerStyle={{paddingBottom: 150}} >
          {isLoading ? (
            <View  style={{alignSelf:"center",marginTop:hp('20%')}} >
            <BubblesLoader size={50}
              color="#512500" dotRadius={10} />
           </View>
          ) : !cartdata ? (
            <View style={styles.imm}>
              <Ionicons name="cart" color="#E9691D" size={80} />
              <Text style={styles.tee}>You have no items in the cart</Text>
              <Text>Add items you want to shop</Text>
              <TouchableOpacity
                style={styles.maior}
                onPress={() => navigation.goBack()}>
                <Text style={styles.or}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <FlatList
                data={cartdata}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
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
                                color: '#B64400',
                                marginLeft: 10,
                              }}>
                              {item.get_products.description}
                            </Text>
                            <Text></Text>
                            <Text
                              style={{
                                width: wp('95%'),
                                fontSize: 18,
                                color: '#B64400',
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
                        <TouchableOpacity onPress={() => addtowishlist(item.id)}>
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
                          onPress={() => onDeleteAlert(item.id)}>
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
                              color="#512500"
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
                          <TouchableOpacity onPress={add}>
                            <Ionicons
                              name="add-circle-sharp"
                              size={20}
                              color="#512500"
                              style={{paddingTop: 13, marginRight: 10}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              <View style={styles.box}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Subtotal</Text>
                  <Text style={styles.ty}>7890</Text>
                </View>
                <Text></Text>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                <Text></Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#B64400', fontWeight: 'bold'}}>
                    Total
                  </Text>
                  <Text
                    style={[styles.ty, {color: '#B64400', fontWeight: 'bold'}]}>
                    7890
                  </Text>
                </View>
                <TouchableOpacity style={styles.maior}>
                  <Text style={styles.or}>Complete your order</Text>
                </TouchableOpacity>
              </View>
            </>
          )}



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



        </ScrollView>
      </View>
    </View>
  );
}

