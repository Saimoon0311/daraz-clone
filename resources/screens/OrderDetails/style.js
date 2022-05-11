import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../config/color';

export const styles = StyleSheet.create({
  buttonstyle: {
    width: wp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.textColorRedCart,
  },
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
    margin: wp('5%'),
  },
  noticstext: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginTop: hp('1%'),
    color: 'gray',
  },
  // te: {
  //   backgroundColor: color.defaultBackgroundColor,
  //   //     marginLeft:wp('4%'),
  //   marginTop: hp('1%'),
  // },
  textinputview: {
    alignItems: 'center',
  },

  scrollViewStyle: {
    alignSelf: 'center',
    width: wp('100'),
    // backgroundColor: 'red',
    // marginTop: hp('4'),
  },
  noDataContainer: {
    width: wp('80%'),
    height: hp('30'),
    alignSelf: 'center',
    backgroundColor: '#FFDDC9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('15'),
    borderRadius: hp('2'),
  },

  parentCardStyle: {
    width: wp('90'),
    // height: hp('15'),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: hp('4'),
    borderRadius: hp('2'),
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    paddingBottom: hp('2'),
  },
  childCardStyle: {
    width: wp('90%'),
    height: hp('30'),
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    marginBottom: hp('2'),
    marginTop: hp('2'),
    borderRadius: hp('3'),
  },
  parentCardIconHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: wp('83'),
    marginTop: hp('1'),
    // paddingTop: hp('0.5'),
    // paddingBottom: hp('0.7'),
  },
  parentCarddTextStyle: {
    fontSize: hp('1.8'),
    color: '#512500',
    // marginLeft: wp('3%'),
    // marginTop: hp('1.8'),
  },
  parentCardRow: {
    width: wp('75'),
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    // marginTop: hp('1.8'),
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignSelf: 'center',
    borderBottomWidth: hp('0.2'),
    borderBottomColor: '#C8C8C8',
    paddingBottom: hp('0.7'),
    // marginTop: hp('1.5'),
  },
  parentCardTopTag: {
    width: wp('30%'),
    borderRadius: hp('0.8'),
    backgroundColor: '#512500',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2'),
    marginLeft: wp('3'),
    padding: 5,
    marginBottom: hp('2'),
  },
  parentCardTopTagText: {
    fontSize: hp('1.5'),
    color: 'white',
  },
  iconStyle: {
    marginBottom: hp('0.8'),
  },
  viewForTextWidth: {
    // backgroundColor: 'red',
    width: wp('35'),
    // flexDirection: 'row',
    // alignItems: 'flex-end',
  },
  noTextstyle: {
    fontSize: hp('2.5'),
    color: '#512500',
    textAlign: 'center',
    marginTop: hp('3'),
  },
  cancelViewContainer: {
    backgroundColor: color.themColorPrimary,
    marginTop: hp('2'),
    textAlign: 'center',
    // width: wp('30'),
    // height: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: wp('2'),
    padding: 6,
  },
  returnViewContainer: {
    backgroundColor: color.themColorPrimary,
    marginTop: hp('2'),
    textAlign: 'center',
    // width: wp('30'),
    // height: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 'auto',
    marginLeft: wp('3'),
    padding: 6,
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.5'),
  },
});
