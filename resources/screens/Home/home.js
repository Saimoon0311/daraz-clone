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
import {ARRIVALS, BRANDDATA, FEATURED, GETPRODUCT} from '../../config/url';
import {NativeBaseProvider, Box, Center} from 'native-base';
import Alldata from '../../data/alldata';
import NetInfo from '@react-native-community/netinfo';
import Arrivals from '../../data/arrivals';
import {color} from '../../config/color';
import {styles} from './style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AwesomeAlert from 'react-native-awesome-alerts';
import { showMessage } from 'react-native-flash-message';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({navigation}) {
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
  const [seacrhData, setSearchData] = useState("");
  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  const detailss = item => {
    navigation.navigate('Details', item);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setAloading(true);
    wait(2000).then(() => {
      datacallss(), setRefreshing(false);
    });
  }, []);

  const datacallss = async () => {
    let netFlag = 0;
    await NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        netFlag = 1;
        fetch(FEATURED)
          .then(response => response.json())
          .then(json => {
            setData(json[0]), setLoading(false);
          })
          .catch(e => {
            setShowAlert(true);
          });
        fetch(ARRIVALS)
          .then(response => response.json())
          .then(json => {
            setArrvals(json[0]), setAloading(false);
          });
        fetch(BRANDDATA)
          .then(response => response.json())
          .then(json => {
            setBrand(json[0]), setBloading(false);
          });
      } else {
        setShowAlert(true);
      }
    });
    if (toggleSearchBar) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -45,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const onSubmitSeacrhItem =() =>{
    if (seacrhData=="") {
      showMessage({
        type:"warning",
        icon:"warning",
        message:"Please type something to search..."
      })
    } else {
      navigation.navigate('subcatdetails', {
        seacrhDatas: seacrhData,
        screenData: 'search-products',
      })
      setToggleSearchBar(false)
      setSearchData("")
    }
  }

  useEffect(() => {
    (async () => {
      datacallss();
    })();
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={color.statusbarColor} />
      <View style={{marginTop: 9}}>
        <Animated.View>
          {toggleSearchBar ? (
            <View style={styles.searchBarWrap}>
              <TextInput
                onChangeText={text => setSearchData(text)}
                value={seacrhData}
                placeholder={'Search...'}
                placeholderTextColor={color.defaultcolor}
                onSubmitEditing={ ()=>
                  onSubmitSeacrhItem ()
                }
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
                style={{width: 81, height: 36.5}}
              />
              <TouchableOpacity
                onPress={() => setToggleSearchBar(!toggleSearchBar)}
                style={{marginLeft: wp('15%')}}>
                <Ionicons name="search" size={27} color={color.defaultcolor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{marginRight: wp('5%')}}>
                <Ionicons name="cart" size={27} color={color.defaultcolor} />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100, marginLeft: 30}}>
          <Text style={styles.te}>Top sellers</Text>
          <NativeBaseProvider>
            <Alldata detailss={detailss} data={data} isLoading={isLoading} />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: 'products-featured/',
                })
              }>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.te}>New Arrivals</Text>
          <NativeBaseProvider>
            {/* <Arrivals
              detailss={detailss}
              arrivals={arrivals}
              aisLoading={aisLoading}
            /> */}
            <Alldata
              detailss={detailss}
              data={arrivals}
              isLoading={aisLoading}
            />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: 'all-new-arrivals',
                })
              }>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.te}>Top sellers</Text>
          <NativeBaseProvider>
            <Alldata detailss={detailss} data={data} isLoading={isLoading} />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity>
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
          <View style={styles.see}>
            <TouchableOpacity>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AwesomeAlert
          show={showAlert}
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
            setShowAlert(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// style={{ transform: [{ translateY: searchBarAnim }] }}
