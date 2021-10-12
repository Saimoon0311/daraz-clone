
import React,{useState} from "react"
import {View,Text,TouchableOpacity,StyleSheet,Image,FlatList,ScrollView} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FlatListPicker from 'react-native-flatlist-picker';
import { color } from "styled-system";
import { Images_API } from "../config/url";

export default function Details ({ route, navigation }){
    const item = route.params;
    const imm = item.images
    const atttri = item.get_attribute_values
    
   

    // console.log("tyuu======>>>>>>>>>>",atttri)
    return(
        <View>
             <View style={{ flexDirection: "row", justifyContent: "space-between",backgroundColor:"#FFDDC9"}} >
                <TouchableOpacity onPress={()=>navigation.goBack()} >
                    <Ionicons name="arrow-back-sharp"  size={30} color="#512500" style={styles.icon} />
                </TouchableOpacity>
                <Text style={{textAlign:"center",fontSize:18,color:"#512500",fontWeight:"bold",marginTop:25}} >Details</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Cart")} >
                    <Ionicons name="cart" size={30} color="#512500" style={styles.icon}  />
                </TouchableOpacity>
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

              <Image source={{uri:`${Images_API}/${item.name}`}} style={{width:320,height:250,marginRight:20}} />
          )
      }}
   />
<View style={styles.box}>
    <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}} >{item.name}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Category : {item.getchildcategory.name}</Text>
    <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}}>Rs : {item.price}</Text>
    <Text style={{color:"#512500",fontSize:14}}>SKU : {item.sku}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Description :</Text>
    <Text style={{marginLeft:"auto",textAlign:"justify"}} > {item.description} </Text> 
    


</View>
<Text style={{fontSize:14,fontWeight:"bold",color:"#919191",marginTop:20}}> Delivery & Returns</Text>
        <View style={[styles.box,{marginBottom:60}]} >
        <Text style={{color:"#512500",fontSize:12,fontWeight:"bold"}} >Choose Your Location</Text>
        </View>


        </View>
        </ScrollView>
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











// for (let x = 0; x < atttri.length; x++) {
//     // const element = array[x];
//     setAttr[x](atttri[x].value[0])        
// }


// const [attr, setAttr] = useState([item.get_attribute_values[0].value[0]]);

// const [itemcolor,setItemcolor]=useState([].length)
// const [itematt,setItematt] = useState([
//     "k","u","t"
// ])



{/* <FlatList
        data={atttri}
        keyExtractor={(item) => item.key}
        vertical
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
            setAttr[0]("kjs")
                  return(
                      <View     style={styles.container}>
    <Picker
    // selectedValue={itemcolor}
    selectedValue={attr}
    
    onValueChange={(itemValue, itemIndex) =>{
        // setItemcolor[itemIndex](itemValue)
        setAttr[item.key](itemValue)
    }}
    
    >
        <Picker.Item label={item.attribute.name} value={null} />
        {item.value.map(items => (
          <Picker.Item key={items}  label={items} value={items} />
        ))}
    </Picker>
    </View>

);
      }}
    /> */}








// <TouchableOpacity onPress={() => {
//           FlatListPicker.showPickerList()
//           // this.FlatListPicker.hidePickerList()
//         }}
//         >
//         </TouchableOpacity>
//         <FlatListPicker
//         //   ref={ref => { FlatListPicker = ref }}
//           data={ele}
//           containerStyle={styles.container}
//           dropdownStyle={{ width: 180 }}
//           dropdownTextStyle={{ fontSize: 15}}
//           pickedTextStyle={{ color: 'black', fontWeight: 'bold' }}
//           animated="slide"
//           defaultValue={item.get_attribute_values[0].attribute.name}
          
//         //   renderDropdownIcon={() =>
//         // <Picker.Item value={} />
//         // }
//           onValueChange={(value, index) => alert(`Selected ${value}`)}
//         />