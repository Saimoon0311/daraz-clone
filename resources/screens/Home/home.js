import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ADDTOWISHLIST,
  ARRIVALS,
  BRANDDATA,
  FEATURED,
  featuredDefault,
  newArrivalDefault,
  ALLNEWARRIVALS,
  ALLFEATUREDPRODUCTS,
} from '../../config/url';
import {NativeBaseProvider, Box, Center, AspectRatio} from 'native-base';
import Alldata from '../../data/alldata';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';
import {useIsFocused} from '@react-navigation/native';
import {languageCheck} from '../../config/languageChecker';
import {
  TourGuideZone,
  useTourGuideController, // hook to start, etc.
  TourGuideZoneByPosition,
} from 'rn-tourguide';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/type';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({navigation}) {
  const isFocused = useIsFocused();
  const iconProps = {size: 40, color: '#888'};
  const {tourStatus} = useSelector(state => state.tourStatus);
  const dispatch = useDispatch();
  // Use Hooks to control!
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController();

  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [titleSearchValue, onChangeText] = useState('');
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [arrivals, setArrvals] = useState();
  const [isLoading, setLoading] = useState(true);
  const [aisLoading, setAloading] = useState(true);
  const [bisLoading, setBloading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [brand, setBrand] = useState();
  const [seacrhData, setSearchData] = useState('');
  const [id, setId] = useState();
  const [userData, setUserData] = useState();
  const [dummy, setDummy] = useState(1);
  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  const detailss = (item, currencySign) => {
    console.log(101, currencySign);
    navigation.navigate('Details', item, currencySign);
  };
  const [refreshing, setRefreshing] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    setAloading(true);
    setBloading(true);
    await checkStatus();
    setRefreshing(false);
  }, []);

  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const handleOnStart = () => console.log('start');
  const handleOnStop = () => {
    dispatch({type: types.TOURCOMPLETED}), navigation.navigate('setting');
  };
  const handleOnStepChange = () => console.log(`stepChange`);
  const checkTourCompleted = () => {
    eventEmitter.on('stop', handleOnStop);
    eventEmitter.on('stepChange', handleOnStepChange);
    if (tourStatus) {
      eventEmitter.on('start', handleOnStart);
      start();
    } else if (!tourStatus) {
      stop();
      eventEmitter.off('start', handleOnStart);
      eventEmitter.off('stop', handleOnStop);
      eventEmitter.off('stepChange', handleOnStepChange);
    }
  };
  useEffect(() => {
    checkTourCompleted();
  }, [dummy]);
  useEffect(() => {
    console.log(118);
    (async () => {
      await checkStatus();
      if (isFocused) {
        await checkStatus();
      } else {
        console.log('Screen is not focused');
      }
    })();
  }, [isFocused]);
  const routeToLogin = () => {
    navigation.navigate('MyTabs');
  };

  const checkStatus = async () => {
    setDummy(dummy + 1);
    const user = await getUserData();
    if (user == null) {
      setIsLoggedIn(false);
      await datacallss(false);
    } else if (user !== null) {
      setIsLoggedIn(true);
      await setUserData(user);
      await datacallss(true);
    }
    setDummy(dummy + 1);
  };
  const addtowishlist = productid => {
    fetch(`${ADDTOWISHLIST}/${productid}/${id}`)
      .then(async response => await response.json())
      .then(json => {
        if (json[0]?.message == 'Added to wishlist') {
          // parentFunction()
          // prop.detailss
          datacallss(isLoggedIn == true ? true : false);
          showMessage({
            type: 'success',
            icon: 'success',
            message: languageCheck(json[0]?.message),
            backgroundColor: '#E9691D',
          });
        } else if (
          json[0]?.message == 'This item has been removed from your wishlist'
        ) {
          // parentFunction()
          datacallss(isLoggedIn == true ? true : false);
          showMessage({
            type: 'success',
            icon: 'auto',
            message: languageCheck(json[0]?.message),
            backgroundColor: '#E9691D',
          });
        }
      })
      .catch(error => {
        console.error(109, error);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something went wrong',
          backgroundColor: '#E9691D',
        });
      });
  };

  const datacallss = async isLogIn => {
    const user = await getUserData();
    let userId = user?.id;
    setId(userId);
    fetch(isLogIn == true ? `${FEATURED}/${userId}` : featuredDefault)
      .then(response => response.json())
      .then(json => {
        setData(json[0]), setLoading(false);
      })
      .catch(e => {
        // showMessage({
        //   type: 'danger',
        //   icon: 'danger',
        //   message: 'Something went wrong',
        //   backgroundColor: '#E9691D',
        // });
        console.log(201219, e);
      });
    fetch(isLogIn == true ? `${ARRIVALS}/${userId}` : newArrivalDefault)
      .then(response => response.json())
      .then(json => {
        setArrvals(json[0]), setAloading(false);
      });
    fetch(BRANDDATA)
      .then(response => response.json())
      .then(json => {
        setBrand(json[0]), setBloading(false);
      });
  };

  const onSubmitSeacrhItem = () => {
    if (seacrhData == '') {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: languageCheck('Please type something to search...'),
        backgroundColor: '#E9691D',
      });
    } else {
      navigation.navigate('subcatdetails', {
        seacrhDatas: seacrhData,
        screenData: 'search-products',
      });
      setToggleSearchBar(false);
      setSearchData('');
    }
  };
  const checkNavigationForFavourite = () => {
    if (isLoggedIn == true) {
      navigation.navigate('subcatdetails', {
        screenData: 'wishlist',
        isWishlist: true,
      });
    } else if (isLoggedIn == false) {
      navigation.navigate('MyTabs');
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar
        barStyle={Platform?.OS == 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={color.statusbarColor}
      />
      <View>
        <Animated.View>
          {toggleSearchBar ? (
            <View style={styles.searchBarWrap}>
              <TextInput
                onChangeText={text => setSearchData(text)}
                value={seacrhData}
                placeholder={'Search...'}
                placeholderTextColor={color.defaultcolor}
                onSubmitEditing={() => onSubmitSeacrhItem()}
                style={styles.search}
              />
              <TouchableOpacity
                onPress={() => setToggleSearchBar(!toggleSearchBar)}>
                <Ionicons
                  name="close-outline"
                  size={40}
                  color={color.defaultcolor}
                />
                {/* <Text style={{color:"#512500",fontWeight:"bold",fontSize:18}} >Cancel</Text> */}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.header}>
              <TourGuideZoneByPosition
                zone={1}
                text={'You can check you Favourite Items here.'}
                borderRadius={16}
                shape={'rectangle_and_keep'}
                isTourGuide
                top={Platform.OS == 'ios' ? hp('6') : hp('2')}
                width={wp('8')}
                height={hp('5')}
                // left={Platform.OS == 'ios' ? wp('6') : wp('6')}
              />
              <TouchableOpacity
                onPress={() => checkNavigationForFavourite()}
                style={{marginLeft: wp('5'), alignSelf: 'center'}}>
                <Ionicons name="heart" size={27} color={color.defaultcolor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => checkTourCompleted()}>
                <Image
                  source={require('../../images/Group66.png')}
                  style={{
                    width: 81,
                    height: 36.5,
                    alignSelf: 'center',
                    // marginLeft: wp('4'),
                  }}
                />
              </TouchableOpacity>
              {/* <View
                // onPress={() => setToggleSearchBar(!toggleSearchBar)}
                style={{marginLeft: wp('10%')}}>
                <Ionicons
                  name="search"
                  size={27}
                  color={color.defaultBackgroundColor}
                />
              </View> */}
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{marginRight: wp('5%')}}>
                <Ionicons name="cart" size={27} color={color.defaultcolor} />
              </TouchableOpacity> */}
              <TourGuideZone
                zone={2}
                text={'You can check you Cart Items here.'}
                borderRadius={16}>
                <HomeCartIcon
                  isLoggedIn={isLoggedIn}
                  navigations={navigationProps}
                />
              </TourGuideZone>
            </View>
          )}
        </Animated.View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('20')}}>
          <Text style={styles.te}>{languageCheck('Top sellers')}</Text>
          <NativeBaseProvider>
            <Alldata
              detailss={detailss}
              data={data}
              isLoading={isLoading}
              userid={id}
              addtowishlist={isLoggedIn ? addtowishlist : routeToLogin}
              currencySign={isLoggedIn ? userData?.currency?.symbol : '$'}
            />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: ALLFEATUREDPRODUCTS,
                })
              }>
              <Text style={styles.seeAllText}>{languageCheck('See All')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.te}>{languageCheck('New Arrivals')}</Text>
          <NativeBaseProvider>
            <Alldata
              detailss={detailss}
              data={arrivals}
              isLoading={aisLoading}
              userid={id}
              addtowishlist={isLoggedIn ? addtowishlist : routeToLogin}
              currencySign={isLoggedIn ? userData?.currency?.symbol : '$'}
            />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: ALLNEWARRIVALS,
                })
              }>
              <Text style={styles.seeAllText}>{languageCheck('See All')}</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.te}>Top sellers</Text>
          <NativeBaseProvider>
            <Alldata
              detailss={detailss}
              data={data}
              isLoading={isLoading}
              userid={id}
              addtowishlist={isLoggedIn ? addtowishlist : routeToLogin}
            />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: ALLFEATUREDPRODUCTS,
                })
              }>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View> */}
          {/* <Text style={styles.te}>{languageCheck('Brands')}</Text>
          <NativeBaseProvider>
            <Alldata
              detailss={detailss}
              data={brand}
              isLoading={bisLoading}
              isBrand={true}
            />
          </NativeBaseProvider> */}
          {/* <View style={styles.see}>
            <TouchableOpacity>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Warning!"
          message="Some thing want wrong."
          contentContainerStyle={{width: wp('80%')}}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Close"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
