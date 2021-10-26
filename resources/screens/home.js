import React, {useState, useEffect, useRef} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ARRIVALS, FEATURED, GETPRODUCT} from '../config/url';
import {NativeBaseProvider, Box, Center} from 'native-base';
import Alldata from '../data/alldata';
import NetInfo from '@react-native-community/netinfo';
import Arrivals from '../data/arrivals';
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
  useEffect(async () => {
    let netFlag = 0;
    await NetInfo.fetch('wifi').then(async state => {
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
  }, []);
  return (
    <SafeAreaView>
      <View style={{marginTop: 9}}>
        <Animated.View>
          {toggleSearchBar ? (
            <View style={styles.searchBarWrap}>
              <TextInput
                onChangeText={text => onChangeText(text)}
                value={titleSearchValue}
                placeholder={'Search...'}
                placeholderTextColor={'#512500'}
                style={styles.search}
              />
              <TouchableOpacity
                onPress={() => setToggleSearchBar(!toggleSearchBar)}>
                <Ionicons name="close-outline" size={40} color="#512500" />
                {/* <Text style={{color:"#512500",fontWeight:"bold",fontSize:18}} >Cancel</Text> */}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.header}>
              <Image
                source={require('../images/Group66.png')}
                style={{width: 81, height: 36.5}}
              />
              <TouchableOpacity
                onPress={() => setToggleSearchBar(!toggleSearchBar)}>
                <Ionicons name="search" size={27} color="#512500" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{marginRight: 33}}>
                <Ionicons name="cart" size={27} color="#512500" />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        <ScrollView
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp('36%'),
    borderBottomWidth: 0.2,
    paddingBottom: 10,
  },
  ic: {
    marginLeft: 'auto',
  },
  te: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#512500',
    marginTop: 9,
    marginBottom: 12,
  },
  see: {
    marginTop: 13,
    backgroundColor: '#F3F5F7',
    marginLeft: 'auto',
    marginRight: 22,
    width: 63,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.1,
  },
  searchBarWrap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('80%'),
  },
  item: {
    backgroundColor: '#716f25',
    padding: 20,
    marginTop: 4,
    marginHorizontal: 4,
  },
  whiteText: {
    color: 'red',
  },
  hidess: {
    display: 'none',
  },
  show: {
    backgroundColor: 'red',
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: wp('63%'),
    borderColor: '#512500',
    borderWidth: 1,
    height: hp('6%'),
    paddingLeft: 10,
  },
});

// style={{ transform: [{ translateY: searchBarAnim }] }}
