import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {CART, Images_API, testCART} from '../../config/url';
import {getUserData} from '../../utils/utils';

export default function Cart({navigation}) {
  const [jj, setJj] = useState();
  // const imag = jj.images
  const [isLoading, setLoading] = useState(true);
  console.log(jj);
  // useEffect(async () => {
  //   // const userId = await getUserData();
  //   // const users = userId.id;
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow',
  //   };

  //   fetch(
  //     'https://test-urls.com/elitedesignhub/moyen-express/public/api/get-product',
  //     requestOptions,
  //   )
  //     .then(response => response.json(
  //       console.log(35,response)
  //     ))
  //     // .then(result => console.log(37,result))
  //     .catch(error => console.log(38, error));
  // });
  useEffect(async () => {
    const userId = await getUserData()
    const users = userId.id
    fetch(`${testCART}/${users}`, {
      method: "GET",
      // headers:{
      //   Accept :"application/json",
      //   "Content-Type" :"application/json",
      // },
      //     body:JSON.stringify(item)
    })
      .then(async (response) => await response.json())
      .then((json) => {
        setJj(json)
      })
      .finally(() => setLoading(false));
    // .then((json) => setJj(json))
    // .catch((error) => console.log(error))

    //   console.log("--=0-904895",json)
    //   .catch((error) => console.error(error))
  }, [])
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFDDC9',
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
          {isLoading ? (
            <ActivityIndicator
              size={100}
              color="#512500"
              style={{marginTop: 100}}
            />
          ) : (
            <FlatList
              data={jj}
              keyExtractor={item => item.key}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.box}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{
                          uri: `${Images_API}/${item.get_products.images[0].name}`,
                        }}
                        style={{width: wp("30%"), height: hp("15%")}}
                      />
                      <View style={{marginTop: 20}}>
                        <Text
                          numberOfLines={2}
                          style={{width:wp("40%"), fontSize: 14, color: '#B64400',marginLeft:10}}>
                          {item.get_products.description}
                        </Text>
                        <Text></Text>
                        <Text
                          style={{
                            width: wp("95%"),
                            fontSize: 18,
                            color: '#B64400',
                            fontWeight: 'bold',
                            marginLeft:10
                          }}>
                          Rs : {item.get_products.price}
                        </Text>
                      </View>
                    </View>
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
                      <TouchableOpacity style={{flexDirection: 'row'}}>
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
          )}
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
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    borderWidth: 0,
    borderBottomWidth: 1,
    // borderColor: '#CECECE',
    // // width: 250,
    // // height: 50,
    // alignSelf: 'center',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    // marginTop: 30,
    // padding: 5,
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
    width: wp("70%"),
    height: hp("6%"),
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
});
