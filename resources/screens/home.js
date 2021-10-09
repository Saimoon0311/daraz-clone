import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GETPRODUCT } from "../config/url";
import {NativeBaseProvider,Box,Center} from "native-base"
import Alldata from "../data/alldata";

export default function Home({navigation}) {
    const detailss = (item)=> {
        navigation.navigate("Details",item)
    }
    return (
        <View style={{ margin: 37 }} >
            <View  >

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 90, shadowColor: '#000',borderBottomWidth:0.2, shadowColor: '#000',paddingBottom:10 }} >
                <Image source={require("../images/Group66.png")} style={{ width: 81, height: 36.5 }} />
                <TouchableOpacity>
                    <Ionicons name="search" size={30} color="#512500" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="cart" size={30} color="#512500" />
                </TouchableOpacity>
            </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:50}} >
                <Text style={styles.te} >
                    Top sellers
                </Text>
                {/* <View> */}
                <NativeBaseProvider>
                   <Alldata detailss={detailss} />
                   </NativeBaseProvider>
                   <View style={styles.see}>
                <TouchableOpacity>
                    <Text style={{color:"#E9691D"}}>See All</Text>
                </TouchableOpacity>
            </View>
                   <Text style={styles.te} >
                   Apparels
                </Text>
                   <NativeBaseProvider>
                   <Alldata/>
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
                   <Alldata/>
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
                   <Alldata/>
                   </NativeBaseProvider>
                   <View style={styles.see}>
                <TouchableOpacity>
                    <Text style={{color:"#E9691D"}}>See All</Text>
                </TouchableOpacity>
            </View>
                {/* </View> */}
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
        borderRadius:12
    }
})