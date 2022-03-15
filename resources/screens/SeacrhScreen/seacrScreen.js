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
  Platform,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ADDTOWISHLIST,
  API_BASED_URL,
  CATEGORY,
  Images_API,
  SEARCH,
  searchDataWithOutUserID,
  SUBCAT,
} from '../../config/url';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
  BubblesLoader,
} from 'react-native-indicator';
import {styles} from './style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AwesomeAlert from 'react-native-awesome-alerts';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../config/color';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {getUserData} from '../../utils/utils';

export default function seacrhScreen({navigation}) {
  const isFocused = useIsFocused();

  const [seacrhData, setSearchData] = useState('');
  const [userId, setUserId] = useState();
  const [allData, setAllData] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkStatus = async () => {
    const user = await getUserData();
    // console.log(236, user);
    if (user == null) {
      // console.log(240);
      setIsLoggedIn(false);
      await onSubmitSeacrhItem(false);
    } else if (user !== null) {
      // console.log(244);
      setUserId(user.id);
      setIsLoggedIn(true);
      await onSubmitSeacrhItem(true, user.id);
    }
  };
  const checkStatusForCartUpdate = async () => {
    const user = await getUserData();
    // console.log(236, user);
    if (user == null) {
      // console.log(240);
      setIsLoggedIn(false);
    } else if (user !== null) {
      // console.log(244);
      setUserId(user.id);
      setIsLoggedIn(true);
    }
  };
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const onSubmitSeacrhItem = async confirm => {
    // console.log(72, confirm);
    setLoading(true);
    if (seacrhData !== '' && seacrhData !== null) {
      fetch(
        confirm == true
          ? `${API_BASED_URL}search-products/${userId}?name=${seacrhData}`
          : searchDataWithOutUserID + '?name=' + seacrhData,
      )
        .then(response => response.json())
        .then(json => {
          // console.log(86, json);
          setAllData(json[0]), setLoading(false);
        })
        .catch(error => {
          // console.log(90, error);
        });
    } else {
      setLoading(false);
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please Enter correct Seacrh.',
        backgroundColor: '#E9691D',
      });
    }
  };

  const addtowishlist = id => {
    // console.log(126, id);
    // console.log(127, userId);
    fetch(`${ADDTOWISHLIST}/${id}/${userId}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0]?.message == 'Added to wishlist') {
          onSubmitSeacrhItem(true);
          showMessage({
            type: 'success',
            icon: 'success',
            message: json[0]?.message,
            backgroundColor: '#E9691D',
          });
        } else if (
          json[0]?.message == 'This item has been removed from your wishlist'
        ) {
          onSubmitSeacrhItem(true);
          showMessage({
            type: 'success',
            icon: 'auto',
            message: json[0]?.message,
            backgroundColor: '#E9691D',
          });
        }
      })
      .catch(error => {
        console.error(109, error);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something went wrong.',
          backgroundColor: '#E9691D',
        });
      });
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
    // console.log(207, item);
    return (
      <View style={{...styles.box, marginLeft: wp('6%')}}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
          <ImageBackground
            style={styles.im}
            imageStyle={{borderRadius: 20}}
            source={{uri: `${Images_API}/${item?.images[0]?.name}`}}
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

  // useEffect(() => {
  //   async () => {
  //     const user = await getUserData();
  //     setUserId(user.id);
  //     console.log(48, user);
  //   };
  // }, []);
  useEffect(() => {
    (async () => {
      // await checkStatus();
      if (isFocused) {
        await checkStatusForCartUpdate();
      } else {
        console.log('Screen is not focused');
      }
      // await datacallss();
    })();
  }, [isFocused]);
  return (
    <View>
      <View style={styles.appbarStyle}>
        <Text style={styles.head}>Search</Text>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          {/* <TouchableOpacity>
            <Ionicons size={37.5} color="#512500" name="chevron-back-outline" />
          </TouchableOpacity> */}
          <View style={styles.search}>
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#512500"
              style={styles.searchbar}
              onSubmitEditing={() => checkStatus()}
              value={seacrhData}
              autoFocus={false}
              focusable={true}
              // onPressIn={() => console.log(111)}
              onChangeText={text => setSearchData(text)}
              //               autoFocus={ena}
              // onTouchCancel={}
              // keyboardAppearance={true}
            />
            <TouchableOpacity onPress={() => checkStatus()}>
              <Ionicons name="search" color="#512500" size={20} />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons
              size={37.5}
              color="#512500"
              name="cart"
              style={{
                marginTop: hp(Platform?.OS == 'ios' ? '3' : '0.5'),
              }}
            />
          </TouchableOpacity> */}
          <View
            style={{
              marginTop: hp(Platform?.OS == 'ios' ? '3' : '0.7'),
            }}>
            <HomeCartIcon
              isLoggedIn={isLoggedIn}
              navigations={navigationProps}
            />
          </View>
        </View>
      </View>
      {loading ? (
        <View style={{margin: hp('22%'), alignSelf: 'center'}}>
          <BubblesLoader size={50} dotRadius={10} color="#512500" />
        </View>
      ) : allData?.length == 0 ? (
        <View style={styles.imm}>
          <MaterialIcons name="search-off" color="#E9691D" size={80} />
          <Text style={styles.tee}>No product found.</Text>
          {/* <Text style={{color: 'gray'}}>Add items you want to shop</Text> */}
          {/* <TouchableOpacity
            style={styles.maior}
            onPress={() => navigation.goBack()}>
            <Text style={styles.or}>Continue Shopping</Text>
          </TouchableOpacity> */}
        </View>
      ) : allData == null ? (
        <View style={styles.imm}>
          <MaterialCommunityIcons
            name="shopping-search"
            color="#E9691D"
            size={60}
          />
          <Text
            style={{...styles.tee, fontSize: hp('2.5'), textAlign: 'center'}}>
            Kindly search to see products listings.
          </Text>
        </View>
      ) : (
        <FlatList
          // data={subcatdata}
          data={allData}
          // keyExtractor={item => item.key}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: hp('20%'),
            width: wp('100%'),
            alignSelf: 'flex-start',
          }}
          renderItem={({item, index}) => {
            return renderCards(item);
          }}
        />
      )}
    </View>
  );
}
