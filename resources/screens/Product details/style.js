import {StyleSheet} from 'react-native';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getPx} from 'styled-system';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.defaultBackgroundColor,
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
  box: {
    padding: 13,
    marginTop: 20,
    backgroundColor: '#F3F5F7',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    borderWidth: 0,
  },
  imm: {
    width: wp('88%'),
    height: hp('40%'),
    marginRight: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 10,
    shadowRadius: 3,
    borderWidth: 0.1,
    borderColor: 'gray',
  },
  te: {
    textAlign: 'center',
    fontSize: 18,
    color: '#512500',
    fontWeight: 'bold',
    marginTop: 25,
  },
  tep: {
    color: '#512500',
    fontSize: 14,
    marginTop: hp('0.5%'),
  },
  carttouch: {
    backgroundColor: '#E9691D',
    width: wp('85%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  delvery: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#919191',
    marginTop: 20,
  },
  stock: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  optionsContainer: {
    width: wp('90%'),
    // height: hp('30%'),
    height: 'auto',
    paddingBottom: hp('5'),
    backgroundColor: '#F3F5F7',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: hp('20'),
    marginTop: hp('2'),
    alignItems: 'center',
    elevation: 5,
  },
  pickerStyle: {
    width: wp('80'),
    height: hp('5'),
    // borderRadius: 10,
    backgroundColor: '#FFDDC9',
  },
  attributeText: {
    color: '#512500',
    fontSize: hp('2'),
    marginTop: hp('2'),
  },
  pickerParentStyle: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: hp('2'),
  },
});
