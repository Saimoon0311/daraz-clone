import {StyleSheet} from 'react-native';
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
 icon: {
    margin: 20,
  },
  page:{
margin:wp('5%'),
  },
  noticstext:{
    fontSize:wp('4%'),
    textAlign:"center",
    marginTop:hp('1%'),
    color:"gray"
  },
   te: {
    backgroundColor: color.defaultBackgroundColor,
//     marginLeft:wp('4%'),
   marginTop:hp('1%')
  },
  textinputview:{
alignItems:"center"

  }
});
