import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../config/color';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
    // backgroundColor:"red",
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
    elevation: 21,
    height: hp(Platform?.OS == 'ios' ? '10' : '7'),
    alignItems: 'center',
  },
  // te: {
  //   textAlign: 'center',
  //   fontSize: hp('2'),
  //   color: '#512500',
  //   fontWeight: 'bold',
  //   marginTop: hp(Platform?.OS == 'ios' ? '6' : '0'),
  //   marginLeft: wp('3'),
  // },
  icon: {
    marginTop: hp(Platform?.OS == 'ios' ? '4' : '0'),
    marginLeft: wp('3'),
  },
  page: {
    margin: wp('5%'),
  },
  noticstext: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginTop: hp('1%'),
    color: 'gray',
  },
  te: {
    backgroundColor: color.defaultBackgroundColor,
    //     marginLeft:wp('4%'),
    marginTop: hp('1%'),
  },
  textinputview: {
    alignItems: 'center',
  },
});
