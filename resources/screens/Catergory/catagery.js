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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {alignContent, backgroundColor, color} from 'styled-system';
import {CATEGORY, SUBCAT} from '../../config/url';

export default function cate({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [subloading, setSubloading] = useState(true);
  const [catdata, setCatdata] = useState();
  const [subcatdata, setSubcatdata] = useState();
  const [click, setClick] = useState(null);
  useEffect(() => {
    fetch(CATEGORY)
      .then(async response => await response.json())
      .then(json => setCatdata(json), console.log(28, catdata))
      .catch(error => console.error(17, error))
      .finally(() => setLoading(false))

      const api = SUBCAT + 3;
      console.log(api);
      fetch(api)
        .then(async response => await response.json())
        .then(json => setSubcatdata(json))
        .finally(() => setSubloading(false),setClick(0));
    

  }, []);
  const getData = async (id,index) => {
    // setStyless(true)
    setClick(index)
    setSubloading(true);
    console.log(39999999999,index)
    console.log('before ------->>>>>', catdata);
    const api = SUBCAT + id;
    console.log(api);
    fetch(api)
      .then(async response => await response.json())
      .then(json => setSubcatdata(json))
      .finally(() => setSubloading(false));
  };
  console.log('=============.............', subcatdata);
  return (
    <View>
      <View style={styles.appbarStyle}>
        <Text style={styles.head}>Category</Text>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          <TouchableOpacity>
            <Ionicons size={37.5} color="#512500" name="chevron-back-outline" />
          </TouchableOpacity>
          <View style={styles.search}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#512500"
              style={styles.searchbar}
            />
            <Ionicons name="search" color="#512500" size={20} />
          </View>
          <TouchableOpacity  onPress={() => navigation.navigate('Cart')}>
            <Ionicons size={37.5} color="#512500" name="cart" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        {isLoading ? (
          <ActivityIndicator
            size={100}
            color="#512500"
            style={{marginTop: 100}}
          />
        ) : (
          <View>
            <FlatList
              data={catdata}
              keyExtractor={item => item.key}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 300}}
              renderItem={({item,index}) => {
                return (
                  <View>
                   <TouchableOpacity
                  style={index === click? styles.sidebox:styles.sideboxactive}
                   onPress={() => getData(item.id,index)}>
                   <View  >
                   <Text style={styles.cattext}>{item.name}</Text>
                   </View>
                 </TouchableOpacity>

                  </View>
                );
              }}
            />
          </View>
        )}
        <View>
          <TouchableOpacity style={styles.but}>
            <Text style={{fontSize: 14, color: '#512500', marginLeft: 'auto'}}>
              See All Product
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              color="#512500"
              size={30}
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>
          {subloading ? (
            <ActivityIndicator
              size={50}
              color="#512500"
              style={{marginTop: 50, right: 10}}
            />
          ) : (
            <FlatList
              data={subcatdata}
              keyExtractor={item => item.key}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 300}}
              renderItem={({item}) => {
                return (
                  <View style={styles.main}>
                    <View style={styles.inside}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#512500',
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                      <View style={styles.multibox}>
                        {
                          <FlatList
                            data={item.child_category}
                            keyExtractor={item => item.key}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: '100%'}}
                            renderItem={({item}) =>  (
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  margin: 3,
                                }}>
                                <TouchableOpacity onPress={()=>navigation.navigate("subcatdetails",item)} >
                                  <View style={styles.itss}>
                                    {/* <Image style={styles.img} source={require("../../images/yyy.png")} /> */}
                                    <Text style={styles.insidetext}>
                                      {item.name}
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
    </View>
  );
}

const styles = StyleSheet.create({
  appbarStyle: {
    backgroundColor: '#FFDDC9',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 10,
    shadowRadius: 6,
    elevation: 5,
  },
  searchbar: {
    width: wp('55%'),

    height: hp('6%'),
    backgroundColor: 'white',
    borderRadius: 17,
    paddingLeft: 15,
  },
  search: {
    width: wp('65%'),
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 17,
  },
  head: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '400',
    fontSize: 18,
    color: '#512500',
  },
  body: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sidebox: {
    borderColor: '#512500',
    borderWidth: 1,
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
    width: wp('30%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    backgroundColor:"white"
  },
  inside: {
    borderColor: '#512500',
    borderWidth: 1,
    marginBottom: hp('2%'),
    padding: 10,
    width: wp('60%'),
    borderRadius: 10,
  },
  multibox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  main: {
    marginLeft: 10,
  },
  img: {
    width: wp('10%'),
    height: hp('10%'),
  },
  itss: {
    borderWidth: 1,
    borderColor: '#512500',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    height:hp('8%'),
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center"
  },
  insidetext: {
    color: '#512500',
    textAlign: 'center',
  },
  cattext: {
    color: '#512500',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sideboxactive: {
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
    width: wp('30%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    backgroundColor: '#FFDDC9',
  },
  but: {
    flexDirection: 'row',
    borderColor: '#512500',
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // textAlign: 'center',
    borderRadius: 10,
    left: 8,
  },
  sideboxs:{
    backgroundColor:"red"
  }
});

