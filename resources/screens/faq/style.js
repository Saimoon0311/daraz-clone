import {StyleSheet, Platform} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: color.defaultBackgroundColor,
  },

  header: {
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
  privacyPolicyText: {
    // marginLeft: wp('3'),
    color: color.defaultcolor,
    fontSize: hp('3'),
    marginTop: hp('2'),
  },
  faqText: {
    marginLeft: wp('3'),
    color: color.textColorRedCart,
    fontSize: hp('5'),
    marginTop: hp('2'),
  },
  AccordionHeaderContainer: {
    height: hp('8'),
    marginTop: hp('1'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('2'),
    alignSelf: 'center',
    backgroundColor: 'white',
    width: wp('95'),
    // borderWidth: 0.5,
    borderRadius: 10,
    // marginBottom: hp('1'),
  },
  AccordionHeaderTitle: {
    fontSize: hp('2.3'),
    color: color.bottomNavColor,
    fontWeight: 'normal',
    // backgroundColor: 'yellow',
  },
});
