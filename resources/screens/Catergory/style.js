import {Platform, StyleSheet} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  mains: {
    backgroundColor: color.defaultBackgroundColor,
    flex: 1,
    // backgroundColor:"red",
  },
  appbarStyle: {
    backgroundColor: '#FFDDC9',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    height: hp(Platform?.OS == 'ios' ? '16' : '14'),
  },
  searchbar: {
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: 'white',
    borderRadius: 17,
    paddingLeft: 15,
    color: '#512500',
  },
  search: {
    width: wp('80%'),
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 17,
    marginLeft: wp('2%'),
    marginTop: hp(Platform?.OS == 'ios' ? '2' : '0'),
  },
  head: {
    textAlign: 'center',
    // marginBottom: 10,
    marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),

    fontWeight: '400',
    fontSize: 18,
    color: '#512500',
    marginTop: hp(Platform?.OS == 'ios' ? '4.5' : '1'),
  },
  body: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sidebox: {
    borderColor: '#512500',
    borderWidth: 1,
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
    width: wp('30%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    backgroundColor: 'white',
  },
  inside: {
    borderColor: '#512500',
    borderWidth: 1,
    marginBottom: hp('2%'),
    padding: 10,
    width: wp('60%'),
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  multibox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  main: {
    marginLeft: 10,
    // backgroundColor: 'red',
  },
  img: {
    width: wp('10%'),
    height: hp('10%'),
  },
  itss: {
    borderWidth: 1,
    borderColor: '#512500',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 9,
    backgroundColor: 'white',
    // backgroundColor: 'red',
    height: hp('8%'),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insidetext: {
    color: '#512500',
    textAlign: 'center',
    fontSize: hp('1.5'),
  },
  cattext: {
    color: '#512500',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sideboxactive: {
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
    width: wp('30%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    backgroundColor: '#FFDDC9',
  },
  but: {
    flexDirection: 'row',
    borderColor: '#512500',
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // textAlign: 'center',
    borderRadius: 10,
    left: 8,
  },
  sideboxs: {
    backgroundColor: 'red',
  },
});
