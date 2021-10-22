import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList,Alert } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ARRIVALS, FEATURED, GETPRODUCT } from "../config/url";
import {NativeBaseProvider,Box,Center} from "native-base"
import Alldata from "../data/alldata";
import NetInfo from "@react-native-community/netinfo";
import Arrivals from "../data/arrivals";

export default function Home({navigation}) {
    const [data,setData]=useState()
    const [arrivals,setArrvals] =useState()
    const [isLoading, setLoading] = useState(true);
    const detailss = (item)=> {
        navigation.navigate("Details",item)
    }
    useEffect(async() => {

        let netFlag     =   0;
        await NetInfo.fetch("wifi").then(async state =>  {
            if (state.isConnected)  {
                netFlag     =   1;
                fetch(FEATURED)
                .then((response) => response.json())
                .then((json) => setData(json[0]) ,console.log(17,data))
                .catch((error) => console.error(27,error))
                .finally(() => setLoading(false));

                fetch(ARRIVALS)
                .then((response) => response.json())
                .then((json) => setArrvals(json[0]) ,console.log(17,data))
                .catch((error) => console.error(33,error))
                .finally(() => setLoading(false));    
            }
        
      else{
        const title = 'Wifi Status';
        const message = 'Warning, Please Check Your Internet Connection...';
        const emptyArrayButtons = [];
        const alertOptions = {
          cancelable: true,
        };
        Alert.alert(title, message, emptyArrayButtons, alertOptions);
    }
        })
    },[])
    return (
        <View style={{ margin: 37 }} >
            <View  >

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: wp("28%"), shadowColor: '#000',borderBottomWidth:0.2, shadowColor: '#000',paddingBottom:10 }} >
                <Image source={require("../images/Group66.png")} style={{ width: 81, height: 36.5 }} />
                <TouchableOpacity>
                    <Ionicons name="search" size={30} color="#512500" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Cart")} >
                    <Ionicons name="cart" size={30} color="#512500" />
                </TouchableOpacity>
            </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:50}} >
                <Text style={styles.te} >
                    Top sellers
                </Text>
                <NativeBaseProvider>
                   <Alldata detailss={detailss} data={data} isLoading={isLoading}  />
                   </NativeBaseProvider>
                   <View style={styles.see}>
                <TouchableOpacity>
                    <Text style={{color:"#E9691D"}}>See All</Text>
                </TouchableOpacity>
            </View>
                   <Text style={styles.te} >
                   New Arrivals
                </Text>
                   <NativeBaseProvider>
                   <Arrivals detailss={detailss} arrivals={arrivals} isLoading={isLoading}/>
                   </NativeBaseProvider>
                   <View style={styles.see}>
                <TouchableOpacity>
                    <Text style={{color:"#E9691D"}}>See All</Text>
                </TouchableOpacity>
            </View>
                   <Text style={styles.te} >
                    Top sellers
                </Text>
                   <NativeBaseProvider>
                   <Alldata detailss={detailss} data={data} isLoading={isLoading}/>
                   </NativeBaseProvider>
                   <View style={styles.see}>
                <TouchableOpacity>
                    <Text style={{color:"#E9691D"}}>See All</Text>
                </TouchableOpacity>
            </View>
                   <Text style={styles.te} >
                    Top sellers
                </Text>
                   <NativeBaseProvider>
                   <Alldata detailss={detailss} data={data} isLoading={isLoading}/>
                   </NativeBaseProvider>
                   <View style={styles.see}>
                <TouchableOpacity>
                    <Text style={{color:"#E9691D"}}>See All</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
    see:{
        marginTop:13,
        backgroundColor:"#F3F5F7",
        marginLeft:"auto",
        marginRight:22,
        width:63,
        height:23,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:12,
        borderWidth:0.1,
        
    },
})