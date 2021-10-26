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
          style={{marginTop: 40}}
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
                    source={{uri: `https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d35eacaf1176b0008974b54%2F0x0.jpg%3FcropX1%3D790%26cropX2%3D5350%26cropY1%3D784%26cropY2%3D3349`}}>
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
    width: wp('18%'),
    borderRadius: 10,
    textAlign: 'center',
    fontSize:10
  },
});
