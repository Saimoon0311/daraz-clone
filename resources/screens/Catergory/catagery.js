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
import {CATEGORY, Images_API, SUBCAT, SubCat_Image_Api} from '../../config/url';
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
import {languageCheck} from '../../config/languageChecker';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import notFoundImage from '../../images/notfound_0.png';

export default function cate({navigation}) {
  const {languageType} = useSelector(state => state.languageType);

  const [dummy, setDummy] = useState(1);

  const [isLoading, setLoading] = useState(true);
  const [subloading, setSubloading] = useState(true);
  const [catdata, setCatdata] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [click, setClick] = useState(0);
  const [nshowAlert, setNshowAlert] = useState(false);
  const [seacrhData, setSearchData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subCatStatusLength, setSubcatStatusLength] = useState(0);
  const isFocused = useIsFocused();
  let sliceItem = [];
  const spliceItem = child_category => {
    sliceItem = child_category.slice(0, 4);
  };
  const SubCatImage = item => {
    var requireImage =
      'https://www.blankstyle.com/files/imagefield_default_images/notfound_0.png';
    var urlImage = `${SubCat_Image_Api}${item?.cat_image}`;
    var t = item.cat_image == null ? requireImage : urlImage;
    return t;
  };
  const apicall = async () => {
    await fetch(CATEGORY)
      .then(response => response.json())
      .then(async json => {
        var filterData = json.filter(item => item.status == '1');
        setCatdata(filterData), setLoading(false);
        getData(filterData[0].id, click);
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
        message: languageCheck('Please type something to search'),
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
  var updateCart;
  useEffect(() => {
    (async () => {
      await checkStatus();
      await apicall();
    })();
    if (isFocused) {
      updateCart = true;
    }
  }, []);
  const getData = async (id, index) => {
    setClick(index);
    setSubloading(true);
    const api = SUBCAT + id;
    fetch(api)
      .then(async response => await response.json())
      .then(json => {
        setSubcatdata(json), setSubloading(false);
        let subCatData = json.filter(item => item.status == '0');
        setSubcatStatusLength(subCatData.length);
      })
      .catch(error => {
        showMessage({
          type: 'danger',
          icon: 'auto',
          message: languageCheck('Issue while fetching categories'),
          backgroundColor: '#E9691D',
        });
      });
  };
  const checkChildCat = (child_category, child_categoryFrName, item) => {
    // let filterChildId = child_categoryName.filter(
    //   data => data.id == item.child_category[0].sub_category_id,
    // );
    console.log(3642387, child_category, 8348923, child_categoryFrName);
    navigation.navigate('allSubCat', {
      item: item,
      name: child_category,
      frName: child_categoryFrName,
    });
  };
  return (
    <View style={styles.mains}>
      <View style={styles.appbarStyle}>
        <Text style={styles.head}>{languageCheck('Category')}</Text>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          <View style={styles.search}>
            <TextInput
              placeholder={languageCheck('Search')}
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
              updateCart={updateCart}
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
              contentContainerStyle={{paddingBottom: hp('20')}}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={{
                        ...styles.sidebox,
                        backgroundColor: index === click ? 'white' : '#FFDDC9',
                        borderColor: index === click ? '#512500' : '#FFDDC9',
                      }}
                      onPress={() => getData(item.id, index)}>
                      <View>
                        <FontAwesome5
                          name={item?.get_mobileicons?.code}
                          color={'#512500'}
                          size={hp('2')}
                          style={{alignSelf: 'center', marginBottom: hp('0.8')}}
                        />
                        <Text style={{...styles.cattext, fontSize: hp('1.6')}}>
                          {languageType.code == 'en'
                            ? item?.name
                            : item?.name_fr}
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
                style={{
                  fontSize: hp('1.7'),
                  color: '#512500',
                  marginLeft: 'auto',
                }}>
                {languageCheck('See All Product')}
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
          ) : subcatdata?.length == 0 ||
            subcatdata.length == subCatStatusLength ? (
            <View
              style={{
                alignSelf: 'center',
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
            <FlatList
              data={subcatdata}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 160}}
              renderItem={({item}) => {
                const child_categoryLength = item.child_category;
                const child_categoryName = item.name;
                const child_categoryFrName = item.name_fr;
                return (
                  <View style={styles.main}>
                    {item.status == '1' && (
                      <View style={styles.inside}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('subcatdetails', {
                              item: item,
                              screenData: 'sub-category-all-data/',
                            })
                          }
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: hp('2'),
                              color: '#512500',
                              fontWeight: 'bold',
                            }}>
                            {languageType.code == 'en'
                              ? item?.name
                              : item?.name_fr}
                          </Text>
                          <Ionicons
                            name="md-arrow-forward"
                            size={hp('3')}
                            style={{marginLeft: 'auto'}}
                            color="#512500"
                          />
                        </TouchableOpacity>
                        <View style={styles.multibox}>
                          {child_categoryLength.length > 4 ? (
                            <>
                              {spliceItem(child_categoryLength)}
                              <FlatList
                                data={sliceItem}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2}
                                initialNumToRender={4}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) =>
                                  item.status == '1' && (
                                    <View
                                      style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        margin: 3,
                                      }}>
                                      <TouchableOpacity
                                        style={styles.itss}
                                        onPress={() =>
                                          navigation.navigate('subcatdetails', {
                                            item: item,
                                            screenData: 'subCat',
                                          })
                                        }>
                                        <Image
                                          style={{
                                            height: hp('10'),
                                            marginBottom: hp('1'),
                                            borderRadius: 10,
                                            width: wp('20'),
                                          }}
                                          resizeMode="contain"
                                          source={{uri: SubCatImage(item)}}
                                        />
                                        <Text
                                          numberOfLines={1}
                                          style={styles.insidetext}>
                                          {languageType.code == 'en'
                                            ? item?.name
                                            : item?.name_fr}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  )
                                }
                              />
                              <TouchableOpacity
                                onPress={() => {
                                  checkChildCat(
                                    child_categoryName,
                                    child_categoryFrName,
                                    item,
                                  );
                                }}
                                style={{
                                  alignSelf: 'flex-end',
                                  marginTop: hp('1'),
                                  marginRight: wp('2'),
                                }}>
                                <Text
                                  style={{
                                    color: color.themColorPrimary,
                                    fontSize: hp('1.5'),
                                  }}>
                                  See All
                                </Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                            <FlatList
                              data={item.child_category}
                              keyExtractor={(item, index) => index.toString()}
                              numColumns={2}
                              initialNumToRender={4}
                              showsVerticalScrollIndicator={false}
                              renderItem={({item}) =>
                                item.status == '1' && (
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'column',
                                      margin: 3,
                                    }}>
                                    <TouchableOpacity
                                      style={styles.itss}
                                      onPress={() =>
                                        navigation.navigate('subcatdetails', {
                                          item: item,
                                          screenData: 'subCat',
                                        })
                                      }>
                                      <Image
                                        style={{
                                          height: hp('10'),
                                          marginBottom: hp('1'),
                                          width: wp('20'),
                                          borderRadius: 10,
                                        }}
                                        resizeMode="contain"
                                        source={{uri: SubCatImage(item)}}
                                      />
                                      <Text
                                        numberOfLines={1}
                                        style={styles.insidetext}>
                                        {languageType.code == 'en'
                                          ? item?.name
                                          : item?.name_fr}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                )
                              }
                            />
                          )}
                        </View>
                      </View>
                    )}
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
