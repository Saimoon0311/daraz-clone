import React, {useState, useEffect, useRef,useCallback} from 'react';
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
  StatusBar
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ARRIVALS, FEATURED, GETPRODUCT} from '../../config/url';
import {NativeBaseProvider, Box, Center} from 'native-base';
import Alldata from '../../data/alldata';
import NetInfo from '@react-native-community/netinfo';
import Arrivals from '../../data/arrivals';
import {color} from "../../config/color"
import {styles} from "./style"
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Home({navigation}) {
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [titleSearchValue, onChangeText] = useState('');
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [arrivals, setArrvals] = useState();
  const [isLoading, setLoading] = useState(true);
  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  const detailss = item => {
    navigation.navigate('Details', item);
  };


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(  () => {
    setRefreshing(true)
    setLoading(true)
    wait(2000).then( () =>{
      datacallss(),
      setRefreshing(false)
      // setLoading(false),
    } 
    )
  }, []);

const datacallss = async ()=>{
  let netFlag = 0;
  await NetInfo.fetch().then(async state => {
    if (state.isConnected) {
      netFlag = 1;
      fetch(FEATURED)
        .then(response => response.json())
        .then(json => setData(json[0]), console.log(17, data))
        .catch(error => console.error(27, error))
        .finally(() => setLoading(false));

      fetch(ARRIVALS)
        .then(response => response.json())
        .then(json => setArrvals(json[0]), console.log(17, data))
        .catch(error => console.error(33, error))
        .finally(() => setLoading(false));
    } else {
      const title = 'Wifi Status';
      const message = 'Warning, Please Check Your Internet Connection...';
      const emptyArrayButtons = [];
      const alertOptions = {
        cancelable: true,
      };
      Alert.alert(title, message, emptyArrayButtons, alertOptions);
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
}

  useEffect(async () => {
    console.log("jojojojojjjjo")
    datacallss()
  }, []);
  return (
    <SafeAreaView style={styles.main} >
      <StatusBar backgroundColor={color.statusbarColor} />
      <View style={{marginTop: 9}}>
        <Animated.View>
          {toggleSearchBar ? (
            <View style={styles.searchBarWrap}>
              <TextInput
                onChangeText={text => onChangeText(text)}
                value={titleSearchValue}
                placeholder={'Search...'}
                placeholderTextColor={color.defaultcolor}
                style={styles.search}
              />
              <TouchableOpacity
                onPress={() => setToggleSearchBar(!toggleSearchBar)}>
                <Ionicons name="close-outline" size={40} color={color.defaultcolor} />
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
                onPress={() => setToggleSearchBar(!toggleSearchBar)}>
                <Ionicons name="search" size={27} color={color.defaultcolor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{marginRight: 33}}>
                <Ionicons name="cart" size={27} color={color.defaultcolor} />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50, marginLeft: 30}}>
          <Text style={styles.te}>Top sellers</Text>
          <NativeBaseProvider>
            <Alldata detailss={detailss} data={data} isLoading={isLoading} />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.te}>New Arrivals</Text>
          <NativeBaseProvider>
            <Arrivals
              detailss={detailss}
              arrivals={arrivals}
              isLoading={isLoading}
            />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity>
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
          <Text style={styles.te}>Top sellers</Text>
          <NativeBaseProvider>
            <Alldata detailss={detailss} data={data} isLoading={isLoading} />
          </NativeBaseProvider>
          <View style={styles.see}>
            <TouchableOpacity>
              <Text style={{color: '#E9691D'}}>See All</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}



// style={{ transform: [{ translateY: searchBarAnim }] }}
