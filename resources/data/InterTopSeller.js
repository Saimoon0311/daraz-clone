import {StyleSheet, Text, View, Image, FlatList, Platform} from 'react-native';
import React from 'react';
import {color} from '../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images_API} from '../config/url';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {languageCheck} from '../config/languageChecker';

const InterTopSeller = props => {
  var t = true;
  return (
    <View>
      <View>
        <Text style={styles.InterTopSelText}>
          {languageCheck('International Top Sellers')}
        </Text>
      </View>
      {props?.isLoading ? (
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
              width: wp('90'),
            }}>
            <View style={{...styles.InterTopSelView}} />
            <View style={{...styles.InterTopSelView}} />
            <View style={{...styles.InterTopSelView}} />
            <View style={{...styles.InterTopSelView}} />
            <View style={{...styles.InterTopSelView}} />
            <View style={{...styles.InterTopSelView}} />
            <View style={{...styles.InterTopSelView}} />
            <View style={{...styles.InterTopSelView}} />
          </View>
        </SkeletonPlaceholder>
      ) : props?.data?.length == 0 ? (
        <View style={styles.imm}>
          <Text style={styles.tee}>You have no items in this list</Text>
        </View>
      ) : (
        <FlatList
          data={props?.data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: hp('1.5')}}
          renderItem={({item, index}) => {
            return (
              <View style={styles.InterTopSelView}>
                <Image
                  // resizeMode="contain"
                  source={{uri: `${Images_API}/${item?.image}`}}
                  style={{
                    width: wp('25'),
                    height: hp('9'),
                    alignSelf: 'center',
                    marginLeft: wp('2'),
                    borderRadius: Platform.OS == 'ios' ? 15 : 10,
                  }}
                />
                <View>
                  <Text numberOfLines={2} style={styles.InterTopSelInnerText}>
                    {item?.name}
                  </Text>
                  <Text style={styles.InterTopSelInnerText}>
                    {item?.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default InterTopSeller;

const styles = StyleSheet.create({
  container: {},
  InterTopSelText: {
    fontSize: hp('2'),
    fontWeight: 'bold',
    color: color.defaultcolor,
    marginTop: 9,
    marginBottom: 12,
    marginLeft: wp('4'),
  },
  InterTopSelView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    height: hp('11'),
    width: wp('90'),
    borderColor: color.borderColor,
    borderWidth: 0.8,
    marginBottom: hp('1'),
    borderRadius: 10,
  },
  InterTopSelInnerText: {
    fontSize: hp('1.8'),
    color: color.defaultcolor,
    marginLeft: wp('2'),
    width: wp('60'),
    alignItems: 'center',
  },
});
