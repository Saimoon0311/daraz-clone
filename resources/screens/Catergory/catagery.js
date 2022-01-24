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

export default function cate({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [subloading, setSubloading] = useState(true);
  const [catdata, setCatdata] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [click, setClick] = useState(null);
  const [nshowAlert, setNshowAlert] = useState(false);
  const [seacrhData, setSearchData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  const apicall = () => {
    fetch(CATEGORY)
      .then(async response => await response.json())
      .then(json => {
        setCatdata(json), setLoading(false);
      })
      .catch(error => setNshowAlert(true));

    const api = SUBCAT + 24;
    fetch(api)
      .then(async response => await response.json())
      .then(json => {
        setSubcatdata(json), setClick(0), setSubloading(false);
      });
    // .catch(error => setNshowAlert(true))
    // .finally(() => setSubloading(false),setClick(0));
  };
  const navigationProps = () => {
    navigation.navigate('Cart');
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
      // setToggleSearchBar(false);
      setSearchData('');
    }
  };
  const checkStatus = async () => {
    const user = await getUserData();
    // console.log(236, user);
    if (user == null) {
      console.log(240);

      setIsLoggedIn(false);
      // await datacallss(false);
    } else if (user !== null) {
      console.log(244);
      setIsLoggedIn(true);

      // await datacallss(true);
    }
  };
  useEffect(() => {
    if (isFocused) {
      (async () => {
        apicall();
        await checkStatus();
      })();
    }
  }, [isFocused]);
  const getData = async (id, index) => {
    // setStyless(true)
    setClick(index);
    setSubloading(true);
    const api = SUBCAT + id;
    fetch(api)
      .then(async response => await response.json())
      .then(json => {
        setSubcatdata(json), setSubloading(false);
      })
      .catch(error => setNshowAlert(true));
  };
  return (
    <View style={styles.mains}>
      <View style={styles.appbarStyle}>
        <Text style={styles.head}>Category</Text>
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
              // autoFocus={true}
              onPressIn={() => console.log(111)}
              onChangeText={text => setSearchData(text)}
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
                        <Text style={{...styles.cattext, fontSize: hp('2')}}>
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
                See All Product
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
