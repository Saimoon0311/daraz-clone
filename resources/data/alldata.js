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
import {ADDTOWISHLIST, GETPRODUCT, Images_API} from '../config/url';
import {VStack, Box, Divider} from 'native-base';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, {Circle, Rect} from 'react-native-svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../config/color';
import {showMessage} from 'react-native-flash-message';
import {addtowishlist} from '../screens/Home/home';

export default function Alldata(prop, {navigation}) {
  const passedFunction = id => {
    prop.addtowishlist(id);
  };
  const flatListRender = item => {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => prop.detailss(item, prop?.currencySign)}>
            <ImageBackground
              style={styles.im}
              imageStyle={{borderRadius: 20}}
              source={{uri: `${Images_API}/${item.images[0]?.name}`}}>
              {item.featured == 1 ? (
                <View style={styles.fea}>
                  <Text style={styles.textStyle}>Featured</Text>
                </View>
              ) : null}
              {item.is_discounted == 2 ? (
                <View style={styles.fea}>
                  <Text
                    style={[styles.textStyle, {backgroundColor: '#512500'}]}>
                    {item.discounted_percentage}%OFF
                  </Text>
                </View>
              ) : null}
              {item?.is_wishlisted == true ? (
                <TouchableOpacity
                  style={styles.icons}
                  onPress={() => passedFunction(item?.id)}>
                  <Ionicons
                    name="heart"
                    color={color.themColorPrimary}
                    size={30}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.icons}
                  onPress={() => passedFunction(item?.id)}>
                  <Ionicons
                    name="heart-outline"
                    color={color.themColorPrimary}
                    size={30}
                  />
                </TouchableOpacity>
              )}
            </ImageBackground>
            <Text></Text>

            <Text
              numberOfLines={1}
              style={{
                color: '#512500',
                fontSize: 14,
                width: wp('30'),
                fontWeight: 'bold',
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              {item?.name}
            </Text>
            {item.is_discounted == 2 ? (
              <View
                style={{
                  width: wp('35'),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#512500',
                    fontSize: hp('2'),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textDecorationLine: 'line-through',
                  }}>
                  {prop?.currencySign} {item.price}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: 'red',
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {' '}
                  {prop?.currencySign} {item.discounted_price}
                </Text>
              </View>
            ) : (
              <Text
                numberOfLines={1}
                style={{
                  color: '#512500',
                  fontSize: hp('2%'),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: wp('30'),
                  alignSelf: 'center',
                }}>
                {prop?.currencySign} {item.price}
              </Text>
            )}
            <Text></Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
      </ScrollView>
    );
  };

  const flatListRenderBrands = item => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.box}>
          <ImageBackground
            style={styles.im}
            imageStyle={{borderRadius: 20}}
            source={{uri: `${Images_API}/${item?.image}`}}></ImageBackground>
          <Text style={styles.boxImageStyle}>{item?.name}</Text>
        </View>
      </ScrollView>
    );
  };

  const checkSliderType = item => {
    if (prop?.isBrand) {
      return flatListRenderBrands(item);
    } else {
      return flatListRender(item);
    }
  };

  return (
    <View>
      {prop.isLoading ? (
        <SkeletonPlaceholder>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View
              style={{...styles.box, height: hp('25%'), width: wp('40%')}}
            />
            <View
              style={{...styles.box, height: hp('25%'), width: wp('40%')}}
            />
            <View
              style={{...styles.box, height: hp('25%'), width: wp('40%')}}
            />
            <View
              style={{...styles.box, height: hp('25%'), width: wp('40%')}}
            />
          </View>
        </SkeletonPlaceholder>
      ) : prop?.data?.length == 0 ? (
        <View style={styles.imm}>
          {/* <Ionicons name="cart" color="#E9691D" size={30} /> */}
          <Text style={styles.tee}>You have no items in this list</Text>
          {/* <Text style={{color: 'gray'}}>Add items you want to shop</Text> */}
          {/* <TouchableOpacity
            style={styles.maior}
            onPress={() => navigation.goBack()}>
            <Text style={styles.or}>Continue Shopping</Text>
          </TouchableOpacity> */}
        </View>
      ) : (
        <FlatList
          data={prop.data}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            // return flatListRender(item);
            return checkSliderType(item);
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
    height: hp('12'),
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
    fontSize: 10,
    overflow: 'hidden',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
  },
  boxImageStyle: {
    color: '#512500',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  icons: {
    marginTop: 'auto',
    marginLeft: 5,
    width: wp('9%'),
  },
  imm: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  tee: {
    color: '#512500',
    fontSize: 20,
    marginBottom: 10,
  },
});
