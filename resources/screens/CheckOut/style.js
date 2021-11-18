import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {alignItems} from 'styled-system';
import {color} from '../../config/color';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
    // backgroundColor:"white",

    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFDDC9',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 10,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    margin: 20,
  },
  te: {
    textAlign: 'center',
    fontSize: 18,
    color: '#512500',
    fontWeight: 'bold',
    marginTop: 25,
  },
  box: {
    padding: 13,
    margin: wp('7'),
    marginBottom:hp('1'),
    backgroundColor: 'white',
    //     backgroundColor: '#F3F5F7',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  topMain: {
    flexDirection: 'row',
//     backgroundColor:"yellow",
    justifyContent: 'space-around',
    marginTop: wp('5'),
    width:wp('95'),
    alignSelf:"center",
    marginBottom: wp('3'),
  },
  topButtonInactive: {
    width: wp('22'),
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
    height: hp('5'),
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  topButtonInactiveText: {
    color: 'gray',
    fontSize: hp('1.7'),
  },
  topButtonActive: {
    width: wp('22'),
    backgroundColor: '#FF7E33',
    textAlign: 'center',
    alignItems: 'center',
    height: hp('5'),
    justifyContent: 'center',
    borderRadius: 7,
  },
  topButtonActiveText: {
    color: 'white',
    fontSize: hp('1.7'),
  },
  centerText: {
    marginLeft: wp('8'),
    color: color.defaultcolor,
    marginTop: wp('4'),
  },
  text: {
    //     backgroundColor: '#F3F5F7',
    backgroundColor: 'white',
    height: hp('7'),
    width: wp('75'),
    alignSelf:"center"
    //     marginLeft:wp('4%')
  },
  radioText: {
    marginTop: hp('0.9'),
    color: color.defaultcolor,
  },
  subtotalText:{
   color:color.defaultcolor,
   fontWeight:"bold",
   fontSize:hp(1.8)
  },
  subtotalPrice:{
marginLeft:'auto',
color:color.defaultcolor,
fontWeight:"bold",
fontSize:hp(1.8)
  } ,
   maior: {
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: '#FF7E33',
    alignItems: 'center',
    marginBottom: hp('5'),
    marginTop: hp('5'),
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  or: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
  },
  devider:{
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginTop: hp('1'),
    marginBottom: hp('1'),
  }
});
