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
  icon: {
    // margin: 20,
    marginTop: hp(Platform?.OS == 'ios' ? '5' : '3'),
    marginLeft: wp('3'),
  },
  page: {
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  te: {
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
  },
});
