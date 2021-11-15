import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../config/color';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
  },
  loader: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  icon: {
    margin: 20,
  },
  page: {
    marginTop: hp('5%'),
    marginBottom:hp('2%')
  },
  te: {
    backgroundColor: color.defaultBackgroundColor,
    //     marginLeft:wp('4%'),
    marginTop: hp('1%'),
  },
  mainpage: {
//     flex: 1,
    width:wp("80%"),
    alignSelf:"center"
//     height:hp('200%')
  },
  inputContainers: {
//     backgroundColor:"green"
  },
});
