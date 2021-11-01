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
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, {Circle, Rect } from 'react-native-svg'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function Alldata(prop, {navigation}) {
  return (
    <View>
      {prop.isLoading ? (
        // <ActivityIndicator
        //   size={60}
        //   color="#512500"
        //   style={{marginTop: 40}}
        // />
//         <SvgAnimatedLinearGradient
//             primaryColor="#e1e6e2"
//             // secondaryColor="#989c99"
//             secondaryColor="#512500"
//             height={80}>
//     <Rect x="0" y="0" rx="3" ry="3" width="70" height="10"/>
//     <Rect x="80" y="0" rx="3" ry="3" width="100" height="10"/>
//     <Rect x="190" y="0" rx="3" ry="3" width="10" height="10"/>
//     <Rect x="15" y="20" rx="3" ry="3" width="130" height="10"/>
//     <Rect x="155" y="20" rx="3" ry="3" width="130" height="10"/>
//     <Rect x="15" y="40" rx="3" ry="3" width="90" height="10"/>
//     <Rect x="115" y="40" rx="3" ry="3" width="60" height="10"/>
//     <Rect x="185" y="40" rx="3" ry="3" width="60" height="10"/>
// </SvgAnimatedLinearGradient>
      
<SkeletonPlaceholder >
  <View style={{flexDirection:"row",padding:10}}  >
  <View style={{...styles.box,height:hp('25%'),width:wp('40%')}} />
  <View style={{...styles.box,height:hp('25%'),width:wp('40%')}} />
  <View style={{...styles.box,height:hp('25%'),width:wp('40%')}} />
  <View style={{...styles.box,height:hp('25%'),width:wp('40%')}} />
</View>
</SkeletonPlaceholder>


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
                            fontSize: hp('2%'),
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textDecorationLine: 'line-through',
                          }}>
                          $ {item.price}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: hp('2%'),
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
                          fontSize: hp('2%'),
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
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#ebeced',
    marginRight: 10,
    // shadowColor: '#000',
    // shadowOpacity: 0.6,
    // shadowRadius: 10,
    // elevation: 5,
  },
  im: {
    width: wp('40'),
    height: hp('15'),
    borderRadius: 30,
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
