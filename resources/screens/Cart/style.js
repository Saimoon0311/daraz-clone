import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from "../../config/color"

export const styles = StyleSheet.create({
  main:{
backgroundColor:color.defaultBackgroundColor,
// backgroundColor:"red",
flex:1
  },
  icon: {
    margin: 20,
  },
  box: {
    padding: 13,
    margin: 20,
    backgroundColor: '#F3F5F7',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  verticleLine: {
    height: 30,
    width: 1,
    backgroundColor: '#909090',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  ty: {
    marginLeft: 'auto',
    color:"gray",
    fontSize:hp('2%')
  },
  maior: {
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: '#FF7E33',
    alignItems: 'center',
    marginTop: 42,
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
  imm: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: hp('20%'),
  },
  tee: {
    color: '#512500',
    fontSize: 20,
    marginBottom: 10,
  },
  remov: {
    color: '#B64400',
    fontSize: 16,
    fontWeight: 'bold',
    top:13
  },
  buttonstyle:{
    width:wp("20%"),
    alignItems:"center",
    justifyContent:"center"
  }
});