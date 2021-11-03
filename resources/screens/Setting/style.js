import { StyleSheet } from "react-native"
import {color} from "../../config/color"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  main:{
backgroundColor:color.defaultBackgroundColor
  },
    icon: {
      margin: 20,
    },
    well:{
        padding:5,
        backgroundColor:"black"
    },
    we:{
        color:"#E9691D",
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center"
    },
    acc:{
        color:"#512500",
        fontSize:16,
        fontWeight:"bold"
    },
    vacc:{
        margin:30
    },
    box:{
        padding:13,
        marginTop:15,
        backgroundColor:"#F3F5F7",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius:10,
        flexDirection:"row",
        // marginBottom:1
    },
    orte:{
        color:"#512500",
        fontSize:16,
        fontWeight:"bold"
    },
    shadow:{
flexDirection:"row",
width:wp("80%"),
    },
    shadows:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        
    },
    buttonstyle:{
        width:wp("20%"),
        alignItems:"center",
        justifyContent:"center"
      }
})