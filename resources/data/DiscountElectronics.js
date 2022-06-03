import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {color} from '../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images_API} from '../config/url';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {languageCheck} from '../config/languageChecker';

const DiscountElectronics = prop => {
  const passedFunction = id => {
    prop.addtowishlist(id);
  };
  const flatListRender = item => {
    return (
      <TouchableOpacity
        style={styles.box}
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
              <Text style={[styles.textStyle, {backgroundColor: '#512500'}]}>
                {item.discounted_percentage}%OFF
              </Text>
            </View>
          ) : null}
          {item?.is_wishlisted == true ? (
            <TouchableOpacity
              style={styles.icons}
              onPress={() => passedFunction(item?.id)}>
              <Ionicons name="heart" color={color.themColorPrimary} size={30} />
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
        {/* <Text></Text> */}

        <Text
          numberOfLines={1}
          style={{
            color: '#512500',
            fontSize: hp('1.9'),
            width: wp('30'),
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            marginTop: hp('0.5'),
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
              paddingBottom: hp('1'),
            }}>
            {prop?.currencySign} {item.price}
          </Text>
        )}
        {/* <Text></Text> */}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View>
        <Text style={styles.InterTopSelText}>
          {languageCheck('Recent Products')}
        </Text>
      </View>
      {prop?.isLoading ? (
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
              width: wp('90'),
            }}>
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
          data={prop?.data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: hp('1.5'),
            alignSelf: 'center',
          }}
          renderItem={({item, index}) => {
            return flatListRender(item);
          }}
        />
      )}
    </View>
  );
};

export default DiscountElectronics;

const styles = StyleSheet.create({
  container: {},
  InterTopSelText: {
    fontSize: hp('2'),
    fontWeight: 'bold',
    color: color.defaultcolor,
    marginTop: hp('1'),
    marginBottom: hp('1'),
    marginLeft: wp('5'),
  },
  box: {
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#ebeced',
    marginRight: wp('2'),
    marginLeft: wp('2'),
    marginTop: hp('2'),
    paddingBottom: hp('0.5'),
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
