import {StyleSheet} from "react-native"
import {color} from "../../config/color"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  main:{
backgroundColor:color.defaultBackgroundColor
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp('36%'),
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    
  },
  ic: {
    marginLeft: 'auto',
  },
  te: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.defaultcolor,
    marginTop: 9,
    marginBottom: 12,
  },
  see: {
    marginTop: 13,
    backgroundColor: '#F3F5F7',
    marginLeft: 'auto',
    marginRight: 22,
    width: 63,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.1,
  },
  searchBarWrap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('80%'),
  },
  item: {
    backgroundColor: '#716f25',
    padding: 20,
    marginTop: 4,
    marginHorizontal: 4,
  },
  whiteText: {
    color: 'red',
  },
  hidess: {
    display: 'none',
  },
  show: {
    backgroundColor: 'red',
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: wp('63%'),
    borderColor: color.defaultcolor,
    borderWidth: 1,
    height: hp('5.7%'),
    paddingLeft: 10,
    color:color.defaultcolor
  },
});