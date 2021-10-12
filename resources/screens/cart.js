import React,{useState,useEffect} from "react"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,Image} from "react-native"
import { showMessage } from "react-native-flash-message"
import { CART, Images_API } from "../config/url"
import { getUserData } from "../utils/utils"


export default function Cart ({navigation}){
                const [cart,setCart]=useState()
              useEffect( async ()=>{
               const userId = await getUserData()
              const users = userId.id
               let result = await fetch(`${CART}/${users}`,{
    method:"POST",
    headers:{
      Accept :"application/json",
      "Content-Type" :"application/json",
    },
//     body:JSON.stringify(item)
  })
  .then((response) => response.json())
  .then(async (json)=>{ await
setCart(json)
   console.log(cart)
  })
  
//   console.log("--=0-904895",json)
//   .catch((error) => console.error(error))
              },[])
   return(
<View>
<View style={{ flexDirection: "row", justifyContent: "space-between",backgroundColor:"#FFDDC9"}} >
                <TouchableOpacity onPress={()=>navigation.goBack()} >
                    <Ionicons name="arrow-back-sharp"  size={30} color="#512500" style={styles.icon} />
                </TouchableOpacity>
                <Text style={{textAlign:"center",fontSize:18,color:"#512500",fontWeight:"bold",marginTop:25}} >Carts</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Cart")} >
                    <Ionicons name="cart" size={30} color="#512500" style={styles.icon}  />
                </TouchableOpacity>
            </View>
            <View style={{margin:37}}>


          <FlatList
           data={cart}
           keyExtractor={(item) => item.key}
           showsVerticalScrollIndicator={false}
           renderItem={({ item }) => {
             return (
      <View > 
<View style={styles.box}>
    {/* <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}} >{item.name}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Category : {item.getchildcategory.name}</Text>
    <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}}>Rs : {item.price}</Text>
    <Text style={{color:"#512500",fontSize:14}}>SKU : {item.sku}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Description :</Text>
    <Text style={{marginLeft:"auto",textAlign:"justify"}} > {item.description} </Text> 
     */}
{/* <Image source={{uri:`${Images_API}/${item.images[0].name}`}} style={{width:100,height:100}} /> */}

</View>
</View>

             )}}
          
          />
                      </View>
</View>
   )
}


const styles = StyleSheet.create({
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
        borderBottomWidth:1,
        // borderColor: '#CECECE',
        // // width: 250,
        // // height: 50,
        // alignSelf: 'center',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // flexDirection: 'row',
        // marginTop: 30,
        // padding: 5,
      }
})

