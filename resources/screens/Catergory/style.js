import {StyleSheet} from "react-native"
import {color} from "../../config/color"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  mains:{
backgroundColor:color.defaultBackgroundColor,
flex:1,
// backgroundColor:"red",

  },
  appbarStyle: {
    backgroundColor: '#FFDDC9',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 10,
    shadowRadius: 6,
    elevation: 5,
  },
  searchbar: {
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: 'white',
    borderRadius: 17,
    paddingLeft: 15,
  },
  search: {
    width: wp('80%'),
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 17,
    marginLeft:wp('2%')
  },
  head: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '400',
    fontSize: 18,
    color: '#512500',
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
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    backgroundColor:"white"
  },
  inside: {
    borderColor: '#512500',
    borderWidth: 1,
    marginBottom: hp('2%'),
    padding: 10,
    width: wp('60%'),
    borderRadius: 10,
  },
  multibox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  main: {
    marginLeft: 10,
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
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    height:hp('8%'),
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center"
  },
  insidetext: {
    color: '#512500',
    textAlign: 'center',
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
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
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
  sideboxs:{
    backgroundColor:"red"
  }
});

