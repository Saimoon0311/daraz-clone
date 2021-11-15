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
  API_BASED_URL,
  Images_API,
  SUBCATPRODUCTDATA,
} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import {color} from '../../config/color';
import {styles} from './style';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
  BubblesLoader,
} from 'react-native-indicator';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function subcatdetails({route, navigation}) {
  const paramData = route?.params;
  const productData = route?.params?.item;
  const getSearchData = route?.params?.seacrhDatas
  const [user_id, setUser_id] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [allData, setAllData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [cartloading, setCartloading] = useState(false);
  const [nshowAlert, setNshowAlert] = useState(false);

  const getSubCatData = async () => {
    // console.log(50, productData?.id);
    // fetch(`${SUBCATPRODUCTDATA}/${productData?.id}`) for subcat data render we just uncomment it  
    fetch(`${SUBCATPRODUCTDATA}/20`)
      .then(response => response.json())
      .then(json => {
        // console.log(51, json);
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        console.log(58, error);
      });
  };
  const getSavedItemsData = async () => {
    const userId = await getUserData()?.then(res => res?.id);

    fetch(`${API_BASED_URL}${paramData?.screenData}/${userId}`)
      // fetch(
      //   'https://test-urls.com/elitedesignhub/moyen-express/public/api/wishlist/13',
      // )
      .then(response => response.json())
      .then(json => {
        console.log(69, json);
        setAllData(json[0]), setLoading(false);
      })
      .catch(error => {
        console.log(70, error);
      });
  };

  const searchAllData = async ()=>{
    fetch(`${API_BASED_URL}${paramData?.screenData}?name=${getSearchData}`)
    // fetch(`${API_BASED_URL}${paramData?.screenData}?name=n`)
    // fetch(
    //   'https://test-urls.com/elitedesignhub/moyen-express/public/api/search-products',{
    //     body:{
    //        name:"n"
    //     }
    //   }
    // )
    .then(response => response.json())
    .then(json => {
      console.log(86, json);
      setAllData(json[0]), setLoading(false);
    })
    .catch(error => {
      console.log(90, error);
    });
  }

  const getAllData = async () => {
    fetch(`${API_BASED_URL}${paramData?.screenData}`)
      .then(response => response.json())
      .then(json => {
        setAllData(json[0]), setLoading(false);
      })
      .catch(error =>
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something want wrong.',
        }),
      );
  };
  const parentFunction = async () => {
    if (paramData?.screenData == 'subCat') {
      await getSubCatData();
    } else if (paramData?.screenData == 'wishlist') {
      await getSavedItemsData();
    } else if (paramData?.screenData=='search-products'){
      await searchAllData()
    } else {
      await getAllData();
    }
  };
  useEffect(() => {
    (async () => {
      const userId = await getUserData()?.then(res => res?.id);
      await setUser_id(userId);
      await parentFunction();
    })();
  }, []);

  const addtowishlist = id => {
    var product_id = id;
    fetch(`${ADDTOWISHLIST}/${id}/${user_id}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0].message == 'Added to wishlist') {
          showMessage({
            type: 'success',
            icon: 'success',
            message: json[0].message,
          });
        } else {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: json[0].message,
          });
        }
      })
      .catch(error => console.error(109, error));
  };

  // const addtocart = id => {
  //   var product_id = id;
  //   //  setCartloading(true)
  //   //  await ff()
  //   // console.log('userid', user_id);
  //   fetch(ADDTOCART, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       user_id,
  //       product_id,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       // console.log(json);
  //       if (json[0].message == 'Successfully added to cart') {
  //         showMessage({
  //           type: 'success',
  //           icon: 'auto',
  //           message: 'Your Product Has Been Add To Cart',
  //           backgroundColor: '#E9691D',
  //         });
  //       } else {
  //         showMessage({
  //           type: 'warning',
  //           icon: 'warning',
  //           message: json.message,
  //         });
  //       }
  //     })
  //     .done();
  //   // console.log(id);
  // };

  const renderHeaderText = () => {
    if (paramData?.screenData == 'products-featured/') {
      return <Text>Featured</Text>;
    } else if (paramData?.screenData == 'all-new-arrivals') {
      return <Text>New Arrivals</Text>;
    } else if (paramData?.screenData == 'subCat') {
      return <Text>{productData?.name}</Text>;
    } else if (paramData?.screenData == 'wishlist') {
      return <Text>Wishlist</Text>;
    }else if (paramData?.screenData == "search-products"){
      return <Text>Search Items</Text>   
    }
  };

  const renderCards = item => {
    console.log(207,item)
    return (
      <View style={{...styles.box,marginLeft:wp('6%')}}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
          <ImageBackground
            style={styles.im}
            imageStyle={{borderRadius: 20}}
            source={{uri:`${Images_API}/${item?.images[0].name}`}}
            // source={{
            //   uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
            // }}
          >
            {item.featured == 1 ? (
              <Text style={styles.fea}>Featured</Text>
            ) : null}
            {item.is_discounted == 2 ? (
              <Text style={[styles.fea, {backgroundColor: '#512500'}]}>
                {item.discounted_percentage}%OFF
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.icons}
              onPress={() => addtowishlist(item?.id)}>
              <Ionicons name="heart-outline" color="#FF0000" size={30} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{width: wp('35%')}}>
            <Text style={styles.text} numberOfLines={1}>
              {item?.name}
            </Text>
          </View>
          {item.is_discounted == 2 ? (
            <View
              style={{
                flexDirection: 'row',
                paddingTop: hp('2%'),
                marginLeft: wp('2%'),
                width: wp('35%'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // width:wp('10%'),
                  maxWidth: wp('17.5%'),
                }}>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    textDecorationLine: 'line-through',
                  }}
                  numberOfLines={1}>
                  $ {item.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: wp('17.5%'),
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}>
                  {' '}
                  $ {item.discounted_price}
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={{
                color: '#512500',
                fontSize: hp('2%'),
                fontWeight: 'bold',
                paddingTop: hp('2%'),
                paddingLeft: wp('2%'),
              }}>
              $ {item.price}
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
      <View style={{...styles.box,marginLeft:wp('6%')}}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', item?.get_products)}>
          <ImageBackground
            style={styles.im}
            imageStyle={{borderRadius: 20}}
            source={{uri: `${Images_API}/${item?.get_products?.images[0]?.name}`}}
            // source={{
            //   uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
            // }}
            >
            {item?.get_products?.featured == 1 ? (
              <Text style={styles.fea}>Featured</Text>
            ) : null}
            {item?.get_products?.is_discounted == 2 ? (
              <Text style={[styles.fea, {backgroundColor: '#512500'}]}>
                {item?.get_products?.discounted_percentage}%OFF
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.icons}
              onPress={() => addtowishlist(item?.get_products?.id)}>
              <Ionicons name="heart-outline" color="#FF0000" size={30} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{width: wp('35%')}}>
            <Text style={styles.text} numberOfLines={1}>
              {item?.get_products?.name}
            </Text>
          </View>
          {item?.get_products?.is_discounted == 2 ? (
            <View
              style={{
                flexDirection: 'row',
                paddingTop: hp('2%'),
                marginLeft: wp('2%'),
                width: wp('35%'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // width:wp('10%'),
                  maxWidth: wp('17.5%'),
                }}>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    textDecorationLine: 'line-through',
                  }}
                  numberOfLines={1}>
                  $ {item?.get_products?.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: wp('17.5%'),
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}>
                  {' '}
                  $ {item?.get_products?.discounted_price}
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={{
                color: '#512500',
                fontSize: hp('2%'),
                fontWeight: 'bold',
                paddingTop: hp('2%'),
                paddingLeft: wp('1%'),
              }}>
              $ {item?.get_products?.price}
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
        <Text style={styles.te}>{renderHeaderText()}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={30} color="#512500" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={{...styles.body}}>
        {isLoading ? (
          <View style={{margin: hp('22%')}}>
            <BubblesLoader size={50} dotRadius={10} color="#512500" />
          </View>
        ) : (
          <FlatList
            // data={subcatdata}
            data={allData}
            // keyExtractor={item => item.key}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={{paddingBottom: hp('20%'),width:wp('100%'),alignSelf:"flex-start"}}
            renderItem={({item, index}) => {
              // return renderCards(item);
              return checkRender(item);
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
