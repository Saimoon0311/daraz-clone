import { Center } from "native-base";
import React from "react"
import {View,Text,StyleSheet,TextInput ,TouchableOpacity} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { alignContent } from "styled-system";

export default function cate (){
    return(
        <View>
            <View style={styles.appbarStyle}>
                <Text style={{textAlign:"center",marginBottom:10,fontWeight:"400",fontSize:18}}>Category</Text>
            
                <View style={{justifyContent:"space-around",flexDirection:"row"}}>
               <TouchableOpacity>
               <Ionicons size={37.5} name="chevron-back-outline"/>
               </TouchableOpacity> 
                <View style={styles.search}>
                <TextInput placeholder="Search" placeholderTextColor="#512500" style={styles.searchbar}/>    
                <TouchableOpacity onPress={()=>alert('ssdf')}>
                <Ionicons name="search" size={20}/>
               </TouchableOpacity> 
               
                </View>
                <TouchableOpacity>
                <Ionicons size={37.5} name="cart"/>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appbarStyle:{
        backgroundColor:"#FFDDC9",
        paddingBottom:10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 10,
        shadowRadius: 6,  
        elevation: 5,
    },
    searchbar:{
        width:wp("55%"),

        height:hp("5%"),
        backgroundColor:"white"
        ,
        borderRadius:17,
        paddingLeft:15,
    },
    search:{
        width:wp("65%"),
        backgroundColor:"white",
        alignItems:"center",
        flexDirection:"row",
        borderRadius:17,
    }
})