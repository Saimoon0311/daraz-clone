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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images_API} from '../config/url';
export default function Arrivals(prop, {navigation}) {
  return (
    <View>
      {prop.isLoading ? (
        <ActivityIndicator
          size={100}
          color="#512500"
          style={{marginTop: 100}}
        />
      ) : (
        <FlatList
          data={prop.arrivals}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.box}>
                  {item.featured == 1 ? null:
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
                  <Text></Text>
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
                  {/* </View> */}
                </TouchableOpacity>
                  }
                  
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
    borderRadius: 18,backgroundColor: '#F3F5F7',
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 5,
    
  },
  im: {
    width: wp('50'),
    height: hp('20'),
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
    width: wp('18%'),
    borderRadius: 10,
    textAlign: 'center',
  },
});
