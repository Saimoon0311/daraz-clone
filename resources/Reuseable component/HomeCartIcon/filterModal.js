import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CATEGORY} from '../../config/url';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../../config/color';

export const FilterModal = props => {
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [seletedCategory, setSeletedCategory] = useState(null);
  const [endingPrice, setEndingPrice] = useState('2500000');
  const [startingPrice, setStartingPrice] = useState('0');
  const [seletedIndex, setSeletedIndex] = useState();
  //   var seletedIndex;
  const getCategoryData = () => {
    fetch(CATEGORY)
      .then(res => res.json())
      .then(json => {
        setCategories(json);
        setCatLoading(false);
      })
      .catch(err => {
        setCatLoading(true);
      });
  };
  const categorySelete = (res, index) => {
    setSeletedIndex(index);
    setSeletedCategory(res);
  };
  const clearFilter = () => {
    setSeletedIndex();
    setStartingPrice('0');
    setEndingPrice('250000');
    setSeletedCategory(null);
    props.setFilter(false);
  };
  var filter = props?.filterModal;
  useEffect(() => {
    setCatLoading(true);
    getCategoryData();
  }, [filter]);

  return (
    <Animatable.View
      animation={
        props?.filterModal == true ? 'fadeInRightBig' : 'fadeOutRightBig'
      }
      style={styles.animatedView}>
      <Pressable onPress={() => props?.onPress()} style={styles.darkView} />
      <ScrollView>
        <View style={styles.itemView}>
          {props.subCatCheck == true ? (
            <View
              style={{
                marginTop: Platform.OS == 'ios' ? hp('6') : hp('10'),
                marginLeft: wp('4'),
                marginBottom: hp('-6'),
              }}>
              <Text style={styles.headings}>Categories :</Text>
              <View style={styles.innerView}>
                {catLoading == true ? (
                  <SkeletonPlaceholder>
                    <View
                      style={{
                        ...styles.innerView,
                        marginTop: hp('0'),
                        flexDirection: 'row',
                      }}>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                      <View style={styles.activeCategoriesText}></View>
                    </View>
                  </SkeletonPlaceholder>
                ) : (
                  categories.length > 0 &&
                  categories.map((res, i) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          categorySelete(res, i);
                        }}
                        style={
                          seletedIndex == i
                            ? styles.activeCategoriesText
                            : styles.inactiveCategoriesText
                        }>
                        <Text style={{color: '#512500'}}>{res?.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            </View>
          ) : null}
          <View
            style={{
              marginTop: Platform.OS == 'ios' ? hp('6') : hp('10'),
              marginLeft: wp('4'),
            }}>
            <Text style={styles.headings}>Price :</Text>
            <View style={{...styles.innerView, alignItems: 'center'}}>
              <TextInput
                value={startingPrice}
                keyboardType="number-pad"
                style={styles.priceInput}
                onChangeText={e => {
                  setStartingPrice(e);
                }}
              />
              <Text style={{fontSize: hp('2')}}> - </Text>
              <TextInput
                value={endingPrice}
                keyboardType="number-pad"
                style={styles.priceInput}
                textAlignVertical="bottom"
                onChangeText={e => {
                  setEndingPrice(e);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                props?.applyFilter(
                  seletedCategory,
                  startingPrice,
                  endingPrice,
                  // startingPrice,
                  // endingPrice,
                );
                props.onPress();
                // setLoading(true);
                props.setFilter(true);
              }}
              style={styles.bottomButton}>
              <Text style={styles.buttonText}>Apply Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => clearFilter()}
              style={{
                ...styles.bottomButton,
                backgroundColor: color.themColorPrimary,
              }}>
              <Text style={styles.buttonText}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flexDirection: 'row',
    width: wp('100'),
    position: 'absolute',
    zIndex: 10,
  },
  darkView: {
    width: wp('15'),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: hp('100'),
  },
  itemView: {
    width: wp('85'),
    backgroundColor: 'white',
    height: hp('100'),
  },
  innerView: {
    marginTop: hp('2'),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  inactiveCategoriesText: {
    height: hp('4'),
    backgroundColor: '#FFDDC9',
    marginBottom: hp('1'),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('34'),
    marginRight: wp('4'),
    borderRadius: 10,
  },
  activeCategoriesText: {
    height: hp('4'),
    backgroundColor: 'white',
    marginBottom: hp('1'),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('34'),
    marginRight: wp('4'),
    borderRadius: 10,
    borderColor: '#512500',
    borderWidth: 0.2,
    // overflow: 'hidden',
  },
  headings: {fontSize: hp('2.5'), color: '#512500'},
  priceInput: {
    width: wp('33'),
    height: hp('4.5'),
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    textAlign: 'center',
    color: '#512500',
    fontSize: hp('2'),
    textAlignVertical: 'bottom',
    justifyContent: 'center',
    textBreakStrategy: 'highQuality',
    paddingBottom: Platform.OS == 'android' ? hp('1') : hp('0'),
    // paddingTop: 'auto',
  },
  bottomButton: {
    width: wp('40'),
    backgroundColor: '#512500',
    height: hp('5'),
    marginTop: hp('4'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {color: 'white', fontSize: hp('2')},
});
