import React,{useState} from "react"
import {View,Text,TouchableOpacity,StyleSheet,Image,FlatList,ScrollView} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images_API } from "../../config/url";
import {color} from "../../config/color"
import { styles } from "./style";

export default function Cartdetails({ route, navigation }){
const item = route.params;
const imm = item.get_products.images

   return(
        <View>
             <View style={{ flexDirection: "row", justifyContent: "space-between",backgroundColor:"#FFDDC9",shadowColor:'#000',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 10,
          shadowRadius: 6,  
          elevation: 5,}} >
                <TouchableOpacity onPress={()=>navigation.goBack()} >
                    <Ionicons name="arrow-back-sharp"  size={30} color="#512500" style={styles.icon} />
                </TouchableOpacity>
                <Text style={{textAlign:"center",fontSize:18,color:"#512500",fontWeight:"bold",marginTop:25}} >Product Details</Text>
                {/* <TouchableOpacity onPress={()=>navigation.navigate("Cart")} > */}
                    <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon}  />
                {/* </TouchableOpacity> */}
            </View>
            <ScrollView > 
 <View style={{margin:20}}>

   <FlatList
      data={imm}
      keyExtractor={(item) => item.key}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
          return(

              <Image source={{uri:`${Images_API}/${item.name}`}} style={styles.imm} />
          )
      }}
   />
<View style={styles.box}>
    <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}} >{item.get_products.name}</Text>
    {/* <Text style={{color:"#512500",fontSize:14}}>Category : {item.getchildcategory.name}</Text> */}
    <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}}>Price : ${item.get_products.price}</Text>
    <Text style={{color:"#512500",fontSize:14}}>SKU : {item.get_products.sku}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Quantity : {item.quantity}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Description :</Text>
    <Text style={{marginLeft:"auto",textAlign:"justify",color:"gray"}} > {item.get_products.description} </Text> 
    


</View>
<Text style={{fontSize:14,fontWeight:"bold",color:"#919191",marginTop:20}}> Delivery & Returns</Text>
        <View style={[styles.box,{marginBottom:60}]} >
        <Text style={{color:"#512500",fontSize:12,fontWeight:"bold"}} >Choose Your Location</Text>
        </View>
        
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        </ScrollView>
        {/* <View style={{ position: "absolute", bottom: 80, alignSelf: "center"}} >
        <View style={{ flexDirection: "row", bottom: 0, alignSelf: "center" }} >
          <TouchableOpacity style={{ backgroundColor: "#E9691D", width: wp("85%"), height: hp("7%"), alignItems: "center", justifyContent: "center", borderRadius: 10 }} >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: "white", fontSize: 20,  fontWeight: "bold" }} >Add To Cart</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>  */}
 </View>
    )
}



