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
import {CART, CARTDELEtE, Images_API, testCART} from '../../config/url';
import {getUserData} from '../../utils/utils';

export default function Cart({navigation}) {
  const [cartdata, setCartdata] = useState(null);
  const add = () => {
    setCartdata(cartdata.quantity + 1);
  };
  const [isLoading, setLoading] = useState(true);
  // const cartss=()=>{

  // // }
  // console.log(24,cartdata);
  useEffect(async () => {
    const userId = await getUserData();
    const users = userId.id;
    fetch(`${testCART}/${users}`, {
      method: 'GET',
    })
      .then(async response => await response.json())
      .then(json => {
        if(json.message=="Cart is empty"){
          //  setCartdata("null")
           setLoading(false)
        }else{

          setCartdata(json);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const onLogoutAlert = id => {
    Alert.alert(
      'Warning ! ',
      'Are you sure, yout want to delete this Item ! ',
      [{text: 'Yes', onPress: () => delet(id)}, {text: 'No'}],
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

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFDDC9',
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 1 },
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
      <View style={{paddingBottom: 150}}>
        <ScrollView>
          {isLoading  ? (
            <ActivityIndicator
              size={100}
              color="#512500"
              style={{marginTop: 100}}
            />
            ) : !cartdata ? 
            <View style={styles.imm} >
              {/* <Image  source={require("../../images/Ellipse14.png")} style={styles.imm} /> */}
              <Ionicons  name="cart" color="#E9691D" size={80} />
              <Text style={styles.tee} >You have no items in the cart</Text>
              <Text>Add items you want to shop</Text>
              <TouchableOpacity style={styles.maior} onPress={()=>navigation.goBack()} >
              <Text style={styles.or}>Continue Shopping</Text>
            </TouchableOpacity>
            </View>
            :
           ( <>
            <FlatList
              data={cartdata}
              keyExtractor={item => item.key}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.box}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Cartdetails', item)}>
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
                            Rs : {item.get_products.price}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{flex: 1, height: 1, backgroundColor: 'black'}}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity>
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
                        onPress={() => onLogoutAlert(item.id)}>
                        <Ionicons
                          style={{paddingTop: 13, marginRight: 10}}
                          name="trash"
                          size={20}
                          color="#B64400"
                        />
                        <Text
                          style={{
                            color: '#B64400',
                            fontSize: 16,
                            fontWeight: 'bold',
                            paddingTop: 13,
                          }}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                      {/* <View style={{flex: 1, height: 1, backgroundColor: 'black' ,flexDirection:"row"}} /> */}
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
                        <TouchableOpacity>
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
              <Text style={{color: '#B64400', fontWeight: 'bold'}}>Total</Text>
              <Text style={[styles.ty, {color: '#B64400', fontWeight: 'bold'}]}>
                7890
              </Text>
            </View>
            <TouchableOpacity style={styles.maior}>
              <Text style={styles.or}>Complete your order</Text>
            </TouchableOpacity>
          </View>
            </>
          )}
         
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    margin: 20,
  },
  box: {
    padding: 13,
    margin: 20,
    backgroundColor: '#F3F5F7',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  verticleLine: {
    height: 30,
    width: 1,
    backgroundColor: '#909090',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  ty: {
    marginLeft: 'auto',
  },
  maior: {
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: '#FF7E33',
    alignItems: 'center',
    marginTop: 42,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  or: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
  },
  imm:{
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    marginTop:hp('20%')
  },
  tee:{
    color:"#512500",
    fontSize:20,
    marginBottom:10
  }
});
