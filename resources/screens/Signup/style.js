import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../config/color';

export const styles = StyleSheet.create({
  te: {
    backgroundColor: color.primaryBackground,
    marginLeft: wp('4%'),
  },
  but: {
    flexDirection: 'row',
    marginLeft: 10,
    width: wp('80%'),
    backgroundColor: '#FF7E33',
    height: hp('6%'),
    marginTop: 30,
    borderRadius: 10,
  },
  buts: {
    flexDirection: 'row',
    marginLeft: 10,
    width: wp('80%'),
    backgroundColor: '#1873EB',
    height: hp('6%'),
    marginTop: 30,
    borderRadius: 10,
  },
  ty: {
    marginTop: 31,
  },
  indicator: {
    marginTop: 35,
  },
  faqContainer: {
    // marginTop: hp('3.5'),
  },
  privacyContainer: {
    marginTop: hp('0.1'),
  },
  bottomText: {
    fontSize: hp('1.7'),

    textAlign: 'center',
    color: '#E9691D',
    textDecorationLine: 'underline',
  },
  bottomView: {
    position: 'absolute',
    width: wp('100'),
    bottom: Platform.OS == 'ios' ? hp('-3') : hp('0'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  createAccountButton: {
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor: '#FF7E33',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 7,
    flexDirection: 'row',
  },
  innerView: {
    width: wp('15%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountView: {
    width: wp('35%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    fontSize: hp('2%'),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
