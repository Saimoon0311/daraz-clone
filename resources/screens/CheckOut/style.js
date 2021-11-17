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
  topMain:{
flexDirection:"row",
backgroundColor:"yellow",
justifyContent:"space-around",
margin:wp('3')
  },
  topButtonInactive:{
  width:wp('25'),
  backgroundColor:"red",
  textAlign:"center",
  alignItems:"center",
  height:hp('5'),
  justifyContent:"center",
  borderRadius:5                                                                                  
  },
  topButtonInactiveText:{
   
  },
    topButtonActive:{
  width:wp('25'),
  backgroundColor:"#FF7E33",
  textAlign:"center",
  alignItems:"center",
  height:hp('5'),
  justifyContent:"center",
  borderRadius:5                                                                                  
  },
  topButtonActiveText:{
color:"white"
  }
})