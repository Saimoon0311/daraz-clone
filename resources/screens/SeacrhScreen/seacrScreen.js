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
  filterProductUrl,
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
import {FilterModal} from '../../Reuseable component/HomeCartIcon/filterModal';
import Foundation from 'react-native-vector-icons/Foundation';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export default function seacrhScreen({navigation}) {
  const isFocused = useIsFocused();

  const [seacrhData, setSearchData] = useState('');
  const [userId, setUserId] = useState();
  const [allData, setAllData] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const [catergory, setCategory] = useState(null);
  const [end, setEnd] = useState('2500000');
  const [start, setStart] = useState('0');
  const [checksubcat, setChecksubcat] = useState(false);
  const [user, setUser] = useState();

  const [dummy, setDummy] = useState(1);

  const translationGetters = {
    en: () => require('../../config/Translate/en.json'),
    fr: () => require('../../config/Translate/fr.json'),
  };
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  const setI18nConfig = async () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

    translate.cache.clear();

    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
  };
  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => setDummy(dummy + 1))
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      RNLocalize.addEventListener('change', handleLocalizationChange());
    })();
    if (isFocused) {
      checkStatus();
    }
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange());
    };
  }, [isFocused]);

  const checkStatus = async () => {
    const user = await getUserData();
    if (user == null) {
      setIsLoggedIn(false);
      await onSubmitSeacrhItem(false);
    } else if (user !== null) {
      setUser(user);
      setUserId(user.id);
      setIsLoggedIn(true);
      await onSubmitSeacrhItem(true, user.id);
    }
  };
  const checkStatusForCartUpdate = async () => {
    const user = await getUserData();
    if (user == null) {
      setIsLoggedIn(false);
    } else if (user !== null) {
      setUserId(user.id);
      setIsLoggedIn(true);
    }
  };
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const onSubmitSeacrhItem = async confirm => {
    if (seacrhData !== '' && seacrhData !== null) {
      fetch(
        confirm == true
          ? `${API_BASED_URL}search-products/${userId}?name=${seacrhData}`
          : searchDataWithOutUserID + '?name=' + seacrhData,
      )
        .then(response => response.json())
        .then(json => {
          setAllData(json[0]), setLoading(false);
        })
        .catch(error => {});
    } else {
      setLoading(false);
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: translate('Please Enter correct Search'),
        backgroundColor: '#E9691D',
      });
    }
  };

  const addtowishlist = id => {
    fetch(`${ADDTOWISHLIST}/${id}/${userId}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0]?.message == 'Added to wishlist') {
          onSubmitSeacrhItem(true);
          showMessage({
            type: 'success',
            icon: 'success',
            message: translate(json[0]?.message),
            backgroundColor: '#E9691D',
          });
        } else if (
          json[0]?.message == 'This item has been removed from your wishlist'
        ) {
          onSubmitSeacrhItem(true);
          showMessage({
            type: 'success',
            icon: 'auto',
            message: translate(json[0]?.message),
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
    navigation.navigate('MyTabs');
  };
  const renderCards = item => {
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
              <Text style={styles.fea}>{translate('Featured')}</Text>
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
                paddingTop: hp('2%'),
                width: wp('35%'),
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#512500',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    textDecorationLine: 'line-through',
                  }}
                  numberOfLines={1}>
                  {isLoggedIn ? user?.currency?.symbol : '$'} {item.price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  // width: wp('17.5%'),
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}>
                  {' '}
                  {isLoggedIn ? user?.currency?.symbol : '$'}{' '}
                  {item.discounted_price}
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
                textAlign: 'center',
                // paddingLeft: wp('2%'),
              }}>
              {isLoggedIn ? user?.currency?.symbol : '$'} {item.price}
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
  const applyFilter = async (category, start, end) => {
    setLoading(true);
    categoryDataCall(category, start, end);
  };
  const categoryDataCall = async (category, start, end) => {
    setCategory(category), setStart(start);
    setEnd(end);
    var userID = isLoggedIn == true ? userId : '0';
    var price = start + ',' + end;

    var checkUrlType = `${
      filterProductUrl + userID
    }/search?filter[pricebetween]=${price}&filter[name]=${seacrhData}`;

    fetch(checkUrlType)
      .then(response => response.json())
      .then(json => {
        setAllData(json[0]);
        setLoading(false);
      })
      .catch(error => {
        console.log(554, error);
      });
  };
  useEffect(() => {
    (async () => {
      if (isFocused) {
        await checkStatusForCartUpdate();
      } else {
        console.log('Screen is not focused');
      }
    })();
  }, [isFocused]);
  return (
    <View>
      <View style={styles.appbarStyle}>
        <Text style={styles.head}>{translate('Search')}</Text>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          <View style={styles.search}>
            <TextInput
              placeholder={translate('Search')}
              placeholderTextColor="#512500"
              style={styles.searchbar}
              onSubmitEditing={() => {
                setLoading(true), checkStatus();
              }}
              value={seacrhData}
              autoFocus={false}
              focusable={true}
              autoCorrect={false}
              onChangeText={text => setSearchData(text)}
            />
            <TouchableOpacity
              onPress={() => {
                setLoading(true), checkStatus();
              }}>
              <Ionicons name="search" color="#512500" size={20} />
            </TouchableOpacity>
          </View>
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
      {allData != null && (
        <TouchableOpacity
          onPress={() => setFilterModal(true)}
          style={styles.filterView}>
          <Text style={styles.filterText}>{translate('Filter')}</Text>
          <Foundation size={35} color="#512500" name="filter" />
        </TouchableOpacity>
      )}
      <FilterModal
        subCatCheck={checksubcat}
        filterModal={filterModal}
        onPress={() => setFilterModal(false)}
        applyFilter={applyFilter}
        filterValue={filter}
        setFilter={confirm => setFilter(confirm)}
      />

      {loading ? (
        <View style={{margin: hp('22%'), alignSelf: 'center'}}>
          <BubblesLoader size={50} dotRadius={10} color="#512500" />
        </View>
      ) : allData?.length == 0 ? (
        <View style={styles.imm}>
          <MaterialIcons name="search-off" color="#E9691D" size={80} />
          <Text style={styles.tee}>{translate('No product found')}</Text>
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
            {translate('Kindly search to see products listings')}
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={allData}
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
        </>
      )}
    </View>
  );
}
