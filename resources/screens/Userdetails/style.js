import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../config/color';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
  },
  loader: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  headerMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFDDC9',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 21,
    height: hp(Platform?.OS == 'ios' ? '10' : '7'),
    alignItems: 'center',
  },
  te: {
    textAlign: 'center',
    fontSize: hp('2'),
    color: '#512500',
    fontWeight: 'bold',
    marginTop: hp(Platform?.OS == 'ios' ? '4' : '0'),
    marginLeft: wp('3'),
  },
  icon: {
    marginTop: hp(Platform?.OS == 'ios' ? '4' : '0'),
    marginLeft: wp('3'),
  },
  page: {
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  inputText: {
    backgroundColor: 'transparent',
    marginTop: hp('1%'),
  },
  mainpage: {
    width: wp('80%'),
    alignSelf: 'center',
  },
  updateContainer: {
    width: wp('50%'),
    height: hp('6%'),
    backgroundColor: '#FF7E33',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 7,
    flexDirection: 'row',
  },
  updateInnerView: {
    width: wp('10%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchCenterView: {
    width: wp('30%'),
    height: hp('6%'),
    paddingLeft: wp('4'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateText: {
    fontSize: hp('1.7%'),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
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
