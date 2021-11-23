import {Platform, StyleSheet} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getPx} from 'styled-system';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFDDC9',
    // backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    height: hp(Platform?.OS == 'ios' ? '10' : '9'),
  },
  icon: {
    // margin: 20,
    marginTop: hp(Platform?.OS == 'ios' ? '5' : '2'),
    marginLeft: wp('3'),
    // marginLeft: wp(Platform?.OS == 'ios' ? '3' : '3'),
  },
  box: {
    padding: 13,
    marginTop: 20,
    backgroundColor: '#F3F5F7',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    borderWidth: 0,
  },
  imm: {
    width: wp('88%'),
    height: hp('40%'),
    marginRight: 20,
    marginLeft: 3,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    borderWidth: 0.1,
    borderColor: 'gray',
  },
  te: {
    textAlign: 'center',
    fontSize: 18,
    color: '#512500',
    fontWeight: 'bold',
    marginTop: hp(Platform?.OS == 'ios' ? '6' : '3'),
  },
  tep: {
    color: '#512500',
    fontSize: 14,
    marginTop: hp('0.5%'),
  },
  carttouch: {
    backgroundColor: '#E9691D',
    width: wp('60%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    
  },
  buttonParent: {
    width: wp('75%'),
    height: hp('7%'),
    // backgroundColor: 'red',
    alignSelf: 'center',
    backgroundColor: '#E0998A',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: hp(Platform?.OS == 'ios' ? '3' : '0'),
  },
  delvery: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#919191',
    marginTop: 20,
  },
  stock: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  pickerStyle: {
    width: wp('80'),
    height: hp(Platform?.OS == 'ios' ? '20' : '7'),
    // height: hp('2'),
    color: '#512500',
    backgroundColor: Platform?.OS == 'ios' ? 'transparent' : '#FFDDC9',
    // alignItems: 'center',
    // padding: 0,
    alignSelf: 'center',
    // opacity: 0.5,
    overflow: 'hidden',
  },
  pickerParentStyle: {
    width: wp('80'),
    height: hp(Platform?.OS == 'ios' ? '20' : '7'),
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: hp(Platform?.OS == 'ios' ? '-5' : '2'),
    // backgroundColor: '#FFDDC9',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#512500',
  },
  attributeText: {
    color: '#512500',
    fontSize: hp('2'),
    marginTop: hp('2'),
  },

  favButton: {
    width: wp('15'),
    height: hp('7'),
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentTextContainer: {
    width: wp('88%'),
    height: hp('5%'),
    alignSelf: 'center',
    // backgroundColor: 'green',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomImageScroller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp('2'),
    marginTop: hp('3%'),
    // backgroundColor: 'red',
  },
  sliderText: {
    fontSize: hp('2%'),
    color: color.themColorPrimary,
  },
  bottomimages: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
  },
  imagss: {
    width: wp('27%'),
    height: hp('15%'),
    borderRadius: 10,
  },
});
