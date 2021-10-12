import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList ,ActivityIndicator} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GETPRODUCT, Images_API } from "../config/url";
import { VStack, Box, Divider } from 'native-base';
export default function Alldata(prop,{navigation}){
    // const da = ()=>{
    //     prop.detailss()
    // }
// console.log("hjk====>>>>>>>", GETPRODUCT)
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState();
useEffect(() => {
    fetch(GETPRODUCT)
        .then((response) => response.json())
        .then((json) => setData(json[0]))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
})
return (

            <View>
                 {isLoading ? <ActivityIndicator size={100} color="#512500" style={{ marginTop: 100 }} /> :
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.key}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ScrollView  showsHorizontalScrollIndicator={false} >
                                <TouchableOpacity  onPress={()=>prop.detailss(item)}>
                    <View style={{justifyContent:"center",alignItems:"center",borderRadius:18,backgroundColor:"#F3F5F7",marginRight:10}} >
                     <Image style={{width:172,height:125,borderRadius:20}} source={{uri:`${Images_API}/${item.images[0].name}`}} />
                     <Text></Text>
                     <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}} >{item.name}</Text>
                    <Text></Text>
                    <Text style={{color:"#512500",fontSize:18,fontWeight:"bold"}} >Rs {item.price}</Text>
                    </View>
                    </TouchableOpacity>
                    <Text></Text>
                </ScrollView>
                            )
                        }}
                    />}
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
}
})