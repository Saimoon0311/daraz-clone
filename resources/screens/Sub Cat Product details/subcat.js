import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, marginLeft} from 'styled-system';
import {
  ADDTOCART,
  ADDTOWISHLIST,
  Images_API,
  SUBCATPRODUCTDATA,
} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';

export default function subcatdetails({route, navigation}) {
  const item = route.params;
  console.log(item.id);
  const [user_id, setUser_id] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [isLoading, setLoading] = useState(true);
  const [cartloading, setCartloading] = useState(false);

  useEffect(async () => {
    // ${item.id}
    fetch(`${SUBCATPRODUCTDATA}/20`)
      .then(async response => await response.json())
      .then(json => setSubcatdata(json[0]))
      .catch(error => console.error(17, error))
      .finally(() => setLoading(false));

    const userId = await getUserData();
    const users = userId.id;
    setUser_id(users);
  }, []);

  const addtowishlist = id => {
    var product_id = id;
    //  setCartloading(true)
    //  await ff()
    console.log('userid', user_id);
    fetch(`${ADDTOWISHLIST}/${id}/${user_id}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0].message == 'Added to wishlist') {
          showMessage({
            type: 'success',
            icon: 'success',
            message: json[0].message,
          }),
            console.log(json[0].message);
        } else {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: json[0].message,
          }),
            console.log(json[0].message);
        }
      });
    //  .catch(error => console.error(17, error))
  };

  const addtocart = id => {
    var product_id = id;
    //  setCartloading(true)
    //  await ff()
    console.log('userid', user_id);
    fetch(ADDTOCART, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        product_id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json[0].message == 'Successfully added to cart') {
          showMessage({
            type: 'success',
            icon: 'auto',
            message: 'Your Product Has Been Add To Cart',
            backgroundColor: '#E9691D',
          });
        } else {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: json.message,
          });
        }
      })
      .done();
    console.log(id);
  };
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>{item.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={30} color="#512500" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {isLoading ? (
          <ActivityIndicator size={100} color="#512500" style={styles.loader} />
        ) : (
          <FlatList
            data={subcatdata}
            keyExtractor={item => item.key}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={{paddingBottom: 300}}
            renderItem={({item, index}) => {
              return (
                <View style={styles.box}>
                  <TouchableOpacity onPress={()=>navigation.navigate("Details",item)} >
                    <ImageBackground
                      style={styles.im}
                      imageStyle={{borderRadius: 20}}
                      source={{uri: `${Images_API}/${item.images[0].name}`}}>
                      <TouchableOpacity
                        style={styles.icons}
                        onPress={() => addtowishlist(item.id)}>
                        <Ionicons
                          name="heart-outline"
                          color="#FF0000"
                          size={30}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                    <Text style={styles.text} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.text}>${item.price}</Text>
                  </TouchableOpacity>
                  {item.stock < 1 ? (
                    <Text style={styles.stock}>Out Of Stock</Text>
                  ) : (
                    <TouchableOpacity
                      style={styles.cart}
                      onPress={() => addtocart(item.id)}>
                      <Text style={styles.carttext}>Add to Cart</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFDDC9',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 10,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    margin: 20,
  },
  te: {
    textAlign: 'center',
    fontSize: 18,
    color: '#512500',
    fontWeight: 'bold',
    marginTop: 25,
  },
  loader: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  body: {
    margin: 20,
  },
  box: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#F3F5F7',
    marginRight: 10,
    shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 5,
    marginBottom: 10,
  },
  im: {
    width: wp('43'),
    height: hp('20'),
    borderRadius: 30,
    // shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 18,
    // elevation: 5,
  },
  icons: {
    marginTop: 'auto',
    marginLeft: 5,
    width: wp('9%'),
  },
  text: {
    color: '#512500',
    marginLeft: 5,
    fontSize: 16,
    marginTop: 5,
  },
  cart: {
    backgroundColor: '#EEB08B',
    alignContent: 'center',
    alignItems: 'center',
    width: wp('30%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 15,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
  carttext: {
    color: '#B64400',
    fontWeight: 'bold',
  },
  stock: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    bottom: 10,
  },
});
