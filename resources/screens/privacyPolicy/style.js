import {StyleSheet, Platform} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
    // backgroundColor: 'red',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFDDC9',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    height: hp(Platform?.OS == 'ios' ? '10' : '8'),
  },

  icon: {
    // margin: 20,
    marginTop: hp(Platform?.OS == 'ios' ? '5' : '2'),
    marginLeft: wp('3'),
    // marginLeft: wp(Platform?.OS == 'ios' ? '3' : '3'),
  },
  privacyPolicyText: {
    marginLeft: wp('3'),
    color: color.defaultcolor,
    fontSize: hp('3'),
    marginTop: hp('2'),
  },
  subtitleText: {
    marginLeft: wp('3'),
    color: color.textColorRedCart,
    fontWeight: 'bold',
    fontSize: hp('2'),
    marginTop: hp('1.5'),
  },
});
