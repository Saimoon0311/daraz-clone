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

const DiscountElectronics = prop => {
  const passedFunction = id => {
    prop.addtowishlist(id);
  };

  return (
    <View>
      <View>
        <Text style={styles.InterTopSelText}>International Top Sellers</Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <FlatList
          data={prop.data}
          numColumns={2}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: hp('1.5')}}
          renderItem={({item, index}) => {
            return (
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
                          style={[
                            styles.textStyle,
                            {backgroundColor: '#512500'},
                          ]}>
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
                      }}>
                      {prop?.currencySign} {item.price}
                    </Text>
                  )}
                  <Text></Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default DiscountElectronics;

const styles = StyleSheet.create({
  container: {},
  InterTopSelText: {
    fontSize: hp('2.3'),
    fontWeight: 'bold',
    color: color.defaultcolor,
    marginTop: 9,
    marginBottom: 12,
    marginLeft: wp('4'),
  },
  InterTopSelView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('28'),
    width: wp('40'),
    borderRadius: 10,
    borderColor: color.borderColor,
    backgroundColor: color.iphoneBoxColor,
    elevation: 2,
    marginTop: hp(1),
    marginBottom: hp('1'),
  },
  InterTopSelInnerText: {
    fontSize: hp('2.4'),
    color: color.defaultcolor,
    marginLeft: wp('2'),
    width: wp('25'),
    alignItems: 'center',
    textAlign: 'center',
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
    height: hp('13'),
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
