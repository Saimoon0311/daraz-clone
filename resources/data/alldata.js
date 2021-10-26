import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import './alldata';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GETPRODUCT, Images_API} from '../config/url';
import {VStack, Box, Divider} from 'native-base';
export default function Alldata(prop, {navigation}) {
  return (
    <View>
      {prop.isLoading ? (
        <ActivityIndicator
          size={100}
          color="#512500"
          style={{marginTop: 40}}
        />
      ) : (
        <FlatList
          data={prop.data}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.box}>
                  <TouchableOpacity onPress={() => prop.detailss(item)}>
                    <ImageBackground
                      style={styles.im}
                      imageStyle={{borderRadius: 20}}
                      source={{uri: `${Images_API}/${item.images[0].name}`}}>
                      {item.featured == 1 ? (
                        <Text style={styles.fea}>Featured</Text>
                      ) : null}
                      {item.is_discounted == 2 ? (
                        <Text
                          style={[styles.fea, {backgroundColor: '#512500'}]}>
                          {item.discounted_percentage}%OFF
                        </Text>
                      ) : null}
                    </ImageBackground>
                    <Text></Text>
                    <Text
                      style={{
                        color: '#512500',
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                    {item.is_discounted == 2 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#512500',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textDecorationLine: 'line-through',
                          }}>
                          $ {item.price}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          {' '}
                          $ {item.discounted_price}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={{
                          color: '#512500',
                          fontSize: 18,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        $ {item.price}
                      </Text>
                    )}
                    <Text></Text>
                    {/* </View> */}
                  </TouchableOpacity>
                </View>
                <Text></Text>
              </ScrollView>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ic: {
    marginLeft: 'auto',
  },
  te: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#512500',
    marginTop: 14,
    marginBottom: 12,
  },
  box: {
    // justifyContent:"space-around",
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#F3F5F7',
    marginRight: 10,
    shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 5,
  },
  im: {
    width: wp('40'),
    height: hp('15'),
    borderRadius: 30,
    // shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 18,
    // elevation: 5,
  },
  fea: {
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#b64400',
    color: 'white',
    width: wp('15%'),
    borderRadius: 10,
    textAlign: 'center',
    fontSize:10
  },
});
