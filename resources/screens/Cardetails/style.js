import { StyleSheet } from "react-native"
import {color} from "../../config/color"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  main:{
backgroundColor:color.defaultBackgroundColor
  },
    icon:{
        margin:20
    },
    box:{
        padding:13,
        marginTop:20,
        backgroundColor:"#F3F5F7",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius:10,
    },
    container: {
        borderWidth: 0,
      },
      imm:{
        width:wp("90%"),
        height:hp("40%"),
        marginRight:20,
        borderRadius:20
      }
})