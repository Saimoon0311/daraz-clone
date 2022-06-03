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
  touchContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: hp('0.5'),
    backgroundColor: 'white',
    marginBottom: hp('1.5'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: wp('46'),
    marginLeft: wp('1'),
    marginRight: wp('1'),
  },
  imageStyle: {
    width: wp('30'),
    height: hp('7'),
    marginTop: hp('1'),
    borderRadius: 10,
  },
  innerText: {
    color: '#512500',
    textAlign: 'center',
    fontSize: hp('1.8'),
    paddingBottom: hp('1'),
    paddingTop: hp('1'),
  },
});
