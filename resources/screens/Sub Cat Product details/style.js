import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { alignItems } from "styled-system";
import {color} from "../../config/color"

export const styles = StyleSheet.create({
  main:{
backgroundColor:color.defaultBackgroundColor,
flex:1,
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
  loader: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  body: {
    marginTop: hp('3%'),
    marginLeft:wp('1%')
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#F3F5F7',
    // marginRight: wp('3%'),
    shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  im: {
    width: wp('41'),
    height: hp('15'),
    borderRadius: 30,
    // shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 18,
    // elevation: 5,
  },
  icons: {
    marginTop: 'auto',
    marginLeft: 5,
    width: wp('9%'),
  },
  text: {
    color: '#512500',
    fontSize: 16,
    paddingTop:hp('2%'),
    paddingLeft:wp('2%')
  },
  cart: {
    backgroundColor: '#EEB08B',
    alignContent: 'center',
    alignItems: 'center',
    width: wp('30%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 15,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
  carttext: {
    color: '#B64400',
    fontWeight: 'bold',
  },
  stock: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    bottom: 10,
    marginTop:hp('5%')
  },
  fea: {
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#b64400',
    color: 'white',
    width: wp('15%'),
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 10,
  },
});