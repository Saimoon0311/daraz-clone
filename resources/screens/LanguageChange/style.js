import {StyleSheet, Platform} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
    flex: 1,
  },
  icon: {
    // margin: 20,
    marginTop: hp(Platform?.OS == 'ios' ? '5' : '3'),
    marginLeft: wp('3'),
  },
  headerMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFDDC9',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    height: hp(Platform?.OS == 'ios' ? '10' : '9'),
  },
  mainpage: {
    width: wp('80%'),
    alignSelf: 'center',
  },
  page: {
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  pickerStyle: {
    width: Platform.OS == 'ios' ? wp('85') : wp('80'),
    height: hp(Platform?.OS == 'ios' ? '20' : '7'),
    color: '#512500',
    backgroundColor: Platform?.OS == 'ios' ? 'transparent' : '#FFDDC9',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: Platform.OS == 'ios' ? hp('-5') : hp('2'),
    borderRadius: 50,
  },
});
