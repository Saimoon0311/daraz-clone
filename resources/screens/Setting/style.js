import {StyleSheet} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
  },
  icon: {
    // margin: 20,
    marginRight: wp('5'),
  },
  well: {
    padding: hp('0.8'),
    backgroundColor: '#CFA891',
  },
  we: {
    // color:"#E9691D",
    color: '#512500',
    fontSize: hp('2'),
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  acc: {
    color: '#512500',
    fontSize: hp('2.5'),
    fontWeight: 'bold',
    // backgroundColor: 'red',
  },
  vacc: {
    margin: 30,
  },
  box: {
    padding: 13,
    marginTop: 15,
    // backgroundColor: 'red',
    backgroundColor: '#F3F5F7',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
    width: wp('80%'),

    // marginBottom:1
  },
  orte: {
    color: '#512500',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shadow: {
    flexDirection: 'row',
    width: wp('80%'),
    padding: 13,
    marginTop: 15,
    // backgroundColor: 'red',
    backgroundColor: '#F3F5F7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  shadows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonstyle: {
    width: wp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.textColorRedCart,
  },
  buttonstyleWhatapp: {
    width: wp('30'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.whatAppColor,
    // backgroundColor: color.defaultcolor,
  },
  buttonstyleCancelWhatapp: {
    width: wp('15'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.whatAppColor,
    // backgroundColor: color.defaultcolor,
  },
  loginContainer: {
    alignSelf: 'center',
    width: wp('40'),
    height: hp('5'),
    backgroundColor: '#512500',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginText: {color: 'white', fontSize: hp('2'), textAlign: 'center'},
  questionMarkContainer: {
    justifyContent: 'center',
    marginLeft: wp('3'),
  },
});
