import {StyleSheet, Platform} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
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
    height: hp(Platform?.OS == 'ios' ? '10' : '9'),
  },
  icon: {
    // margin: 20,
    marginTop: hp(Platform?.OS == 'ios' ? '5' : '2.5'),
    marginLeft: wp('3'),
    // marginLeft: wp(Platform?.OS == 'ios' ? '3' : '3'),
  },
  box: {
    padding: 13,
    backgroundColor: '#F3F5F7',
    // backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    // marginTop:hp('10')
  },
  container: {
    borderWidth: 0,
  },
  imm: {
    width: wp('90%'),
    height: hp('40%'),
    marginRight: 20,
    borderRadius: 20,
  },

  te: {
    textAlign: 'center',
    fontSize: 18,
    color: '#512500',
    fontWeight: 'bold',
    marginTop: hp(Platform?.OS == 'ios' ? '6' : '3.2'),
    marginLeft: wp('3'),
  },
  tep: {
    color: '#512500',
    fontSize: 14,
    marginTop: hp('0.5%'),
  },
  optionsContainer: {
    width: wp('90%'),
    // height: hp('30%'),
    height: 'auto',
    paddingBottom: hp('5'),
    backgroundColor: '#F3F5F7',
    borderRadius: 10,
    alignSelf: 'center',
    // marginBottom: hp('20'),
    marginTop: hp('2'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },

  pickerParentStyle: {
    width: wp('80'),
    height: hp(Platform?.OS == 'ios' ? '15' : '7'),
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: hp(Platform?.OS == 'ios' ? '-3' : '2'),
    // backgroundColor: '#FFDDC9',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#512500',
  },

  pickerStyle: {
    width: wp('80'),
    height: hp(Platform?.OS == 'ios' ? '7' : '7'),
    // height: hp('2'),
    color: '#512500',
    backgroundColor: Platform?.OS == 'ios' ? '#FFDDC9' : '#FFDDC9',
    // alignItems: 'center',
    // padding: 0,
    alignSelf: 'center',
    // opacity: 0.5,
    overflow: 'hidden',
    // textAlign:"center",
    paddingLeft: wp('2'),
    textAlignVertical: 'center',
    fontSize: hp('2'),
    fontWeight: 'bold',
    borderRadius: 10,
    paddingTop: Platform.OS == 'ios' ? hp('2.3') : hp('0'),
  },
});
