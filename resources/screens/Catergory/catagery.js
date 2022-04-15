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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CATEGORY, SUBCAT} from '../../config/url';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
  BubblesLoader,
} from 'react-native-indicator';
import {color} from '../../config/color';
import {styles} from './style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AwesomeAlert from 'react-native-awesome-alerts';
import {showMessage} from 'react-native-flash-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';
import {getUserData} from '../../utils/utils';
import {useIsFocused} from '@react-navigation/native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export default function cate({navigation}) {
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
  const [isLoading, setLoading] = useState(true);
  const [subloading, setSubloading] = useState(true);
  const [catdata, setCatdata] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [click, setClick] = useState(0);
  const [nshowAlert, setNshowAlert] = useState(false);
  const [seacrhData, setSearchData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstParentCat, setFirstParentCat] = useState(1);
  const isFocused = useIsFocused();

  const apicall = async () => {
    await fetch(CATEGORY)
      .then(response => response.json())
      .then(async json => {
        setCatdata(json), setLoading(false);
        getData(json[0].id, click);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const onSubmitSeacrhItem = () => {
    if (seacrhData == '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: translate('Please type something to search'),
        backgroundColor: '#E9691D',
      });
    } else {
      navigation.navigate('subcatdetails', {
        seacrhDatas: seacrhData,
        screenData: 'search-products',
      });
      setSearchData('');
    }
  };
  const checkStatus = async () => {
    const user = await getUserData();
    if (user == null) {
      setIsLoggedIn(false);
    } else if (user !== null) {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    if (isFocused) {
      RNLocalize.addEventListener('change', handleLocalizationChange());

      (async () => {
        await checkStatus();
        await apicall();
      })();
      return () => {
        RNLocalize.removeEventListener('change', handleLocalizationChange());
      };
    }
  }, [isFocused]);
  const getData = async (id, index) => {
    setClick(index);
    setSubloading(true);
    const api = SUBCAT + id;
    fetch(api)
      .then(async response => await response.json())
      .then(json => {
        setSubcatdata(json), setSubloading(false);
      })
      .catch(error => {
        showMessage({
          type: 'danger',
          icon: 'auto',
          message: translate('Issue while fetching categories.'),
          backgroundColor: '#E9691D',
        });
      });
  };
  return (
    <View style={styles.mains}>
      <View style={styles.appbarStyle}>
        <Text style={styles.head}>{translate('Category')}</Text>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          <View style={styles.search}>
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#512500"
              style={styles.searchbar}
              onSubmitEditing={() => onSubmitSeacrhItem()}
              value={seacrhData}
              onPressIn={() => console.log(111)}
              onChangeText={text => setSearchData(text)}
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
            <HomeCartIcon
              isLoggedIn={isLoggedIn}
              navigations={navigationProps}
            />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
            <View style={{...styles.sidebox, height: hp('9%')}} />
          </SkeletonPlaceholder>
        ) : (
          <View>
            <FlatList
              data={catdata}
              keyExtractor={item => item.key}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 160}}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={
                        index === click ? styles.sidebox : styles.sideboxactive
                      }
                      onPress={() => getData(item.id, index)}>
                      <View>
                        <Text style={{...styles.cattext, fontSize: hp('1.7')}}>
                          {item?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        )}
        <View style={{width: wp('65%')}}>
          {subcatdata?.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: 'featured-data-all/',
                })
              }
              style={styles.but}>
              <Text
                style={{fontSize: 14, color: '#512500', marginLeft: 'auto'}}>
                {translate('See All Product')}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                color="#512500"
                size={30}
                style={{marginLeft: 'auto'}}
              />
            </TouchableOpacity>
          )}
          {subloading ? (
            <View
              style={{
                marginTop: hp('15%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <BubblesLoader size={50} dotRadius={10} color="#512500" />
            </View>
          ) : subcatdata?.length == 0 ? (
            <View
              style={{
                alignSelf: 'center',
                // backgroundColor:"green",
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: hp('15'),
              }}>
              <MaterialIcon name="database-remove" size={70} color="#512500" />
              <Text
                style={{
                  color: '#512500',
                  fontSize: hp('2'),
                }}>
                No item in the list.
              </Text>
            </View>
          ) : (
            // <Text
            // style={{
            //   backgroundColor:"green",
            //   width:wp('100')
            // }}
            // >hy</Text>
            // console.log("hyfdfdfdfdf")
            <FlatList
              data={subcatdata}
              // keyExtractor={item => item.key}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 160}}
              renderItem={({item}) => {
                return (
                  <View style={styles.main}>
                    <View style={styles.inside}>
                      <Text
                        style={{
                          fontSize: hp('2'),
                          color: '#512500',
                          fontWeight: 'bold',
                        }}>
                        {item?.name}
                      </Text>
                      <View style={styles.multibox}>
                        {
                          <FlatList
                            data={item.child_category}
                            // keyExtractor={item => item.key}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  margin: 3,
                                  // backgroundColor: 'red',
                                }}>
                                <TouchableOpacity
                                  style={styles.itss}
                                  onPress={() =>
                                    navigation.navigate('subcatdetails', {
                                      item: item,
                                      screenData: 'subCat',
                                    })
                                  }>
                                  <View>
                                    {/* <Image style={styles.img} source={require("../../images/yyy.png")} /> */}
                                    <Text
                                      numberOfLines={2}
                                      style={styles.insidetext}>
                                      {item?.name}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            )}
                          />
                        }
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
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
