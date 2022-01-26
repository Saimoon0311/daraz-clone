import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Animated,
  TextInput,
  SafeAreaView,
  RefreshControl,
  StatusBar,
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
  GETPRODUCT,
  featuredDefault,
  newArrivalDefault,
  ALLNEWARRIVALS,
  ALLFEATUREDPRODUCTS,
} from '../../config/url';
import {NativeBaseProvider, Box, Center, AspectRatio} from 'native-base';
import Alldata from '../../data/alldata';
import NetInfo from '@react-native-community/netinfo';
import Arrivals from '../../data/arrivals';
import {color} from '../../config/color';
import {styles} from './style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AwesomeAlert from 'react-native-awesome-alerts';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';
import {useIsFocused} from '@react-navigation/native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({navigation}) {
  const isFocused = useIsFocused();

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
  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  const detailss = item => {
    navigation.navigate('Details', item);
  };
  const [refreshing, setRefreshing] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    setAloading(true);
    setBloading(true);
    // datacallss(isLoggedIn == true ? true : false), setRefreshing(false);
    await checkStatus();
    setRefreshing(false);
    // wait(2000).then(() => {
    // });
  }, []);

  const navigationProps = () => {
    navigation.navigate('Cart');
  };

  useEffect(() => {
    (async () => {
      await checkStatus();
      if (isFocused) {
        await checkStatus();
      } else {
        console.log('Screen is not focused');
      }
      // await datacallss();
    })();
  }, [isFocused]);
  const routeToLogin = () => {
    // console.log(22222);
    navigation.navigate('MyTabs');
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'MyTabs'}],
    // });
  };

  const checkStatus = async () => {
    const user = await getUserData();
    // console.log(236, user);
    if (user == null) {
      // console.log(240);
      setIsLoggedIn(false);
      await datacallss(false);
    } else if (user !== null) {
      // console.log(244);
      setIsLoggedIn(true);
      // console.log(118, user);
      await datacallss(true);
    }
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
            message: json[0]?.message,
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

  const datacallss = async isLogIn => {
    const user = await getUserData();
    let userId = user?.id;
    // console.log(130, userId);
    // console.log(131, isLogIn);
    setId(userId);
    fetch(isLogIn == true ? `${FEATURED}/${userId}` : featuredDefault)
      .then(response => response.json())
      .then(json => {
        setData(json[0]), setLoading(false);
      })
      .catch(e => {
        // setShowAlert(true);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something want wrong',
          backgroundColor: '#E9691D',
        });
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
        message: 'Please type something to search...',
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

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={color.statusbarColor} />
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
              <Image
                source={require('../../images/Group66.png')}
                style={{
                  width: 81,
                  height: 36.5,
                  marginLeft: wp('4'),
                }}
              />
              <View
                // onPress={() => setToggleSearchBar(!toggleSearchBar)}
                style={{marginLeft: wp('10%')}}>
                <Ionicons
                  name="search"
                  size={27}
                  color={color.defaultBackgroundColor}
                />
              </View>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{marginRight: wp('5%')}}>
                <Ionicons name="cart" size={27} color={color.defaultcolor} />
              </TouchableOpacity> */}
              <HomeCartIcon
                isLoggedIn={isLoggedIn}
                navigations={navigationProps}
              />
            </View>
          )}
        </Animated.View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('24'), marginLeft: 30}}>
          <Text style={styles.te}>Top sellers</Text>
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
          </View>
          <Text style={styles.te}>New Arrivals</Text>
          <NativeBaseProvider>
            <Alldata
              detailss={detailss}
              data={arrivals}
              isLoading={aisLoading}
              userid={id}
              addtowishlist={isLoggedIn ? addtowishlist : routeToLogin}
            />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: ALLNEWARRIVALS,
                })
              }>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.te}>Top sellers</Text>
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
          </View>
          <Text style={styles.te}>Brands</Text>
          <NativeBaseProvider>
            <Alldata
              detailss={detailss}
              data={brand}
              isLoading={bisLoading}
              isBrand={true}
            />
            {/* <Alldata detailss={detailss} data={data} isLoading={isLoading} /> */}
          </NativeBaseProvider>
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
