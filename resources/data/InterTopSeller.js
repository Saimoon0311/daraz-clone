import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import {color} from '../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InterTopSeller = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  return (
    <View>
      <View>
        <Text style={styles.InterTopSelText}>International Top Sellers</Text>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: hp('1.5')}}
        renderItem={({item, index}) => {
          return (
            <View style={styles.InterTopSelView}>
              <Image
                source={require('../images/running_shoes.png')}
                style={{
                  width: wp('23'),
                  height: hp('10'),
                  alignSelf: 'center',
                  marginLeft: wp('2'),
                }}
              />
              <Text numberOfLines={2} style={styles.InterTopSelInnerText}>
                Nike Shoes Air Max ,Lorum Ipsum 299$
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default InterTopSeller;

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
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    height: hp('11'),
    width: wp('90'),
    borderColor: color.borderColor,
    borderWidth: 0.8,
    marginBottom: hp('1'),
  },
  InterTopSelInnerText: {
    fontSize: hp('2.4'),
    color: color.defaultcolor,
    marginLeft: wp('2'),
    width: wp('70'),
    alignItems: 'center',
  },
});
