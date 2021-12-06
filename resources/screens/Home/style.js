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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp('36%'),
    borderBottomWidth: 0.5,
    // height:hp(''),
    paddingBottom: 10,
    paddingTop: 10,
    // backgroundColor: 'yellow',

    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 3},
    // shadowOpacity: 0.4,
    // // shadowRadius: 2,
    // elevation: 5,
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
    marginTop: hp('2'),
    backgroundColor: '#F3F5F7',
    marginLeft: 'auto',
    marginRight: 22,
    width: wp('20'),
    height: hp('4.5'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.2,
  },
  searchBarWrap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('80%'),
    marginBottom: hp('1'),
    marginTop: hp('1'),
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
    height: hp('5%'),
    paddingLeft: 10,
    color: color.defaultcolor,
    fontSize: hp('2'),
    // top: 0,
    paddingBottom: hp('1'),
    // color:"red"
  },
});
