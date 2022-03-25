import {StyleSheet, Platform} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.defaultBackgroundColor,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#FFDDC9',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    height: hp(Platform?.OS == 'ios' ? '10' : '9'),
  },

  icon: {
    marginTop: hp(Platform?.OS == 'ios' ? '5' : '2.5'),
    marginLeft: wp('3'),
  },
  faqText: {
    marginLeft: wp('3'),
    color: color.textColorRedCart,
    fontSize: hp('5'),
    marginTop: hp('2'),
  },
});
