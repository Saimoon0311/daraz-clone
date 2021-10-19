import {Center} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {alignContent} from 'styled-system';

export default function cate() {
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
          <TouchableOpacity>
            <Ionicons size={37.5} color="#512500" name="cart" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <TouchableOpacity style={styles.sidebox}>
            <View>
              <Text style={styles.cattext}>Grocery</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideboxactive}>
            <View>
              <Text style={styles.cattext}>Grocery</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideboxactive}>
            <View>
              <Text style={styles.cattext}>Grocery</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('30%')}}>
          <View style={styles.main}>
            <TouchableOpacity style={styles.but}>
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
            <View style={styles.inside}>
              <Text
                style={{fontSize: 14, color: '#512500', fontWeight: 'bold'}}>
                Food Items
              </Text>
              <View style={styles.multibox}>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Image
                      source={require('../../images/yyy.png')}
                      style={styles.img}
                    />
                    <Text style={styles.insidetext}>Pasta & Noodels</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Image
                      source={require('../../images/yyy.png')}
                      style={styles.img}
                    />
                    <Text>Pasta & Noodels</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.item}>
                    <Image
                      source={require('../../images/yyy.png')}
                      style={styles.img}
                    />
                    <Text>Pasta & Noodels</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Image
                      source={require('../../images/yyy.png')}
                      style={styles.img}
                    />
                    <Text>Pasta & Noodels</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inside}>
              <Text>Food Items</Text>
              <View style={styles.multibox}>
                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>
                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>

                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>
                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>
              </View>
            </View>

            <View style={styles.inside}>
              <Text>Food Items</Text>
              <View style={styles.multibox}>
                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>
                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>

                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>
                <View style={styles.item}>
                  <Image
                    source={require('../../images/yyy.png')}
                    style={styles.img}
                  />
                  <Text>Pasta & Noodels</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
    borderWidth: 1,
    borderColor: '#512500',
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    paddingLeft: wp('6%'),
    paddingRight: wp('6%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
  },
  inside: {
    borderColor: '#512500',
    borderWidth: 1,
    marginBottom: hp('2%'),
    padding: 10,
    width: wp('63%'),
    // height:hp("40%"),
    borderRadius: 10,
  },
  multibox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

    //    width:wp("25%"),
    //    padding:10
    //    height:hp("20%")
  },
  main: {
    marginLeft: 10,
  },
  img: {
    width: wp('10%'),
    height: hp('10%'),
  },
  item: {
    borderWidth: 1,
    borderColor: '#512500',
    padding: 10,
    width: wp('27%'),
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  insidetext: {
    color: '#512500',
  },
  cattext: {
    color: '#512500',
    fontWeight: 'bold',
  },
  sideboxactive: {
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    paddingLeft: wp('6%'),
    paddingRight: wp('6%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
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
    textAlign: 'center',
    borderRadius: 10,
  },
});
