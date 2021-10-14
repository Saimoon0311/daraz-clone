import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList ,ActivityIndicator} from "react-native"
import "./alldata"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GETPRODUCT, Images_API } from "../config/url";
import { VStack, Box, Divider } from 'native-base';
export default function Alldata(prop,{navigation}){
    // const da = ()=>{
    //     prop.detailss()
    // }
// console.log("hjk====>>>>>>>", GETPRODUCT)
// const [isLoading, setLoading] = useState(true);
// const [data, setData] = useState();


// useEffect(async () => {
//     // const userId = await getUserData();
//     // const users = userId.id;
//     var requestOptions = {
//       method: 'GET',
//       redirect: 'follow',
//     };

//    await fetch(
//       'https://test-urls.com/elitedesignhub/moyen-express/public/api/get-product',
//       requestOptions,
//     )
//       .then(response => response.json(
//         console.log(28,response)
//       ))
//       .then((ress) => {
//           console.log(31,ress)
//       })
//       .finally((res)=> console.log(30,res))
//       // .then(result => console.log(37,result))
//       .catch(error => console.log(31, error));
//   },[]);


// useEffect(() => {
//     fetch(GETPRODUCT)
//         .then((response) => response.json())
//         .then((json) => setData(json[0]))
//         .catch((error) => console.error(17,error))
//         .finally(() => setLoading(false));
// },[])
return (

            <View>
                 {prop.isLoading ? <ActivityIndicator size={100} color="#512500" style={{ marginTop: 100 }} /> :
                    <FlatList
                        data={prop.data}
                        keyExtractor={(item) => item.key}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ScrollView  showsHorizontalScrollIndicator={false} >
                                    <View style={styles.box} >
                                <TouchableOpacity  onPress={()=>prop.detailss(item)}>
                    {/* <View style={{justifyContent:"center",alignItems:"center",borderRadius:18,backgroundColor:"#F3F5F7",marginRight:10,}} > */}
                     <Image style={styles.im} source={{uri:`${Images_API}/${item.images[0].name}`}} />
                     <Text></Text>
                     <Text style={{color:"#512500",fontSize:14,fontWeight:"bold",textAlign:"center"}} >{item.name}</Text>
                    <Text></Text>
                    <Text style={{color:"#512500",fontSize:18,fontWeight:"bold",textAlign:"center"}} >Rs {item.price}</Text>
                    {/* </View> */}
                    </TouchableOpacity>
                    </View>
                    <Text></Text>
                </ScrollView>
                            )
                        }}
                    />
                    }
                </View>
)
}

const styles = StyleSheet.create({
ic: {
    marginLeft: "auto"
},
te: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#512500",
    marginTop: 14,
    marginBottom: 12,
},
box:{
    // justifyContent:"space-around",
    alignItems:"center",
    borderRadius:18,
    backgroundColor:"#F3F5F7",
    marginRight:10,
    shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 5,
},
im:{
    width:wp("50"),
    height:hp("20"),
    borderRadius:20,
    shadowColor: '#000',
    // width:354,
    // shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 5,
    
}
})