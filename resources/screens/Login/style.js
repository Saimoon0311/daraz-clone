import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from "../../config/color"

export const styles = StyleSheet.create({
  te: {
    backgroundColor: 'white',
    marginLeft:wp('4%')
  },
  but: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent:"center",
    width: wp('80%'),
    backgroundColor: '#FF7E33',
    height: hp('6%'),
    marginTop: 30,
    borderRadius: 10,
  },
  buts: {
    flexDirection: 'row',
    marginLeft: 10,
    width: wp('80%'),
    backgroundColor: '#1873EB',
    height: hp('6%'),
    marginTop: 30,
    borderRadius: 10,
  },
  ty: {
    marginTop: 31,
  },
  input:{
    flexDirection:"row"
  },
  indicator:{
    marginTop:35
  }
});