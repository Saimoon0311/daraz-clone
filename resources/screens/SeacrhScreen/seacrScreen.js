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

export default function seacrhScreen({navigation}) {
  const [seacrhData, setSearchData] = useState('');
  const [userId, setUserId] = useState();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const onSubmitSeacrhItem = () => {
    setLoading(true);
    //     if (seacrhData == '') {
    //       showMessage({
    //         type: 'warning',
    //         icon: 'warning',
    //         message: 'Please type something to search...',
    //         backgroundColor: '#E9691D',
    //       });
    //     } else {
    //       navigation.navigate('subcatdetails', {
    //         seacrhDatas: seacrhData,
    //         screenData: 'search-products',
    //       });
    //       // setToggleSearchBar(false);
    //       setSearchData('');
    //     }
    if (seacrhData !== '' && seacrhData !== null) {
      fetch(`${API_BASED_URL}search-products/${userId}?name=${seacrhData}`)
        .then(response => response.json())
        .then(json => {
          console.log(86, json);
          setAllData(json[0]), setLoading(false);
        })
        .catch(error => {
          console.log(90, error);
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
    fetch(`${ADDTOWISHLIST}/${id}/${userId}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0]?.message == 'Added to wishlist') {
          onSubmitSeacrhItem();
          showMessage({
            type: 'success',
            icon: 'success',
            message: json[0]?.message,
            backgroundColor: '#E9691D',
          });
        } else if (
          json[0]?.message == 'This item has been removed from your wishlist'
        ) {
          onSubmitSeacrhItem();
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

  const renderCards = item => {
    console.log(207, item);
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
                onPress={() => addtowishlist(item?.id)}>
                <Ionicons
                  name="heart"
                  color={color.themColorPrimary}
                  size={30}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.icons}
                onPress={() => addtowishlist(item?.id)}>
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

  useEffect(() => {
    async () => {
      const user = await getUserData();
      setUserId(user?.id);
    };
  }, []);
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
              onSubmitEditing={() => onSubmitSeacrhItem()}
              value={seacrhData}
              autoFocus={true}
              focusable={true}
              onPressIn={() => console.log(111)}
              onChangeText={text => setSearchData(text)}
              //               autoFocus={ena}
              // onTouchCancel={}
              // keyboardAppearance={true}
            />
            <TouchableOpacity onPress={() => onSubmitSeacrhItem()}>
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
            <HomeCartIcon navigations={navigationProps} />
          </View>
        </View>
      </View>
      {loading ? (
        <View style={{margin: hp('22%'), alignSelf: 'center'}}>
          <BubblesLoader size={50} dotRadius={10} color="#512500" />
        </View>
      ) : allData?.length == 0 ? (
        <View style={styles.imm}>
          <MaterialCommunityIcons
            name="database-remove"
            color="#E9691D"
            size={80}
          />
          <Text style={styles.tee}>No product found in this list.</Text>
          {/* <Text style={{color: 'gray'}}>Add items you want to shop</Text> */}
          {/* <TouchableOpacity
            style={styles.maior}
            onPress={() => navigation.goBack()}>
            <Text style={styles.or}>Continue Shopping</Text>
          </TouchableOpacity> */}
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
