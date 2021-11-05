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
import {
  ADDTOCART,
  ADDTOWISHLIST,
  Images_API,
  SUBCATPRODUCTDATA,
} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import {color} from "../../config/color"
import { styles } from './style';
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader,BubblesLoader } from 'react-native-indicator';
import AwesomeAlert from 'react-native-awesome-alerts';


export default function subcatdetails({route, navigation}) {
  const item = route.params;
  console.log(item.id);
  const [user_id, setUser_id] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [isLoading, setLoading] = useState(true);
  const [cartloading, setCartloading] = useState(false);
  const [nshowAlert, setNshowAlert] = useState(false);

const getDatass =()=>{
  fetch(`${SUBCATPRODUCTDATA}/20`)
  .then( response =>  response.json())
  .then(json => {setSubcatdata(json[0]), setLoading(false)})
  .catch(error => setNshowAlert(true))

}

  useEffect(async() => {
    getDatass()
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
    <View style={styles.main} >
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
           <View style={{margin:hp('20%')}} >
           <BubblesLoader size={50} dotRadius={10}  color="#512500" />
         </View>
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


