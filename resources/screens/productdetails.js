
import React from "react"
import {View,Text,TouchableOpacity,StyleSheet,Image,FlatList,ScrollView} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FlatListPicker from 'react-native-flatlist-picker';
import { color } from "styled-system";

export default function Details ({ route, navigation }){
    const dataPicker = [
        { value: item.get_attribute_values[0].value, key: 'key1' },
        { value: 'Value 2', key: 'key2' },
        { value: 'Value 3', key: 'key3' },
        { value: 'Value 4', key: 'key4' }
      ]
    //   const datapickerss = JSON.parse(item.get_attribute_values[0].value)
    const item = route.params;
    const imm = item.images
    return(
        <View>
             <View style={{ flexDirection: "row", justifyContent: "space-between",backgroundColor:"#FFDDC9"}} >
                <TouchableOpacity onPress={()=>navigation.goBack()} >
                    <Ionicons name="arrow-back-sharp"  size={30} color="#512500" style={styles.icon} />
                </TouchableOpacity>
                <Text style={{textAlign:"center",fontSize:18,color:"#512500",fontWeight:"bold",marginTop:20}} >Details</Text>
                <TouchableOpacity>
                    <Ionicons name="cart" size={30} color="#512500" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} > 
 <View style={{margin:20}}>

   <FlatList
      data={imm}
      keyExtractor={(item) => item.key}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
          return(

              <Image source={{uri:`https://test-urls.com/elitedesignhub/moyen-express/public/storage/public/products/${item.name}`}} style={{width:320,height:250,marginRight:20}} />
          )
      }}
   />
<View style={styles.box}>
    <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}} >{item.name}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Category : {item.getchildcategory.name}</Text>
    <Text style={{color:"#512500",fontSize:14,fontWeight:"bold"}}>Rs : {item.price}</Text>
    <Text style={{color:"#512500",fontSize:14}}>SKU : {item.sku}</Text>
    <Text style={{color:"#512500",fontSize:14}}>Description : {item.description}</Text>
    {/* <Picker>
        <Picker.Item label={item.get_attribute_values[0].attribute.name} />
        <FlatList
        
        />
    </Picker> */}
<TouchableOpacity onPress={() => {
          FlatListPicker.showPickerList()
          // this.FlatListPicker.hidePickerList()
        }}
        >
        </TouchableOpacity>
        <FlatListPicker
        //   ref={ref => { FlatListPicker = ref }}
          data={item.get_attribute_values[0].value}
          containerStyle={styles.container}
          dropdownStyle={{ width: 180 }}
          dropdownTextStyle={{ fontSize: 15}}
          pickedTextStyle={{ color: 'black', fontWeight: 'bold' }}
          animated="slide"
          defaultValue={item.get_attribute_values[0].attribute.name}
        //   renderDropdownIcon={() => }
          onValueChange={(value, index) => alert(`Selected ${value}`)}
        />

</View>
<Text style={{fontSize:14,fontWeight:"bold",color:"#919191",marginTop:20}}> Delivery & Returns</Text>
        <View style={styles.box} >
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
        borderRadius:10
    },
    container: {
        borderWidth: 0,
        borderBottomWidth:1,
        borderColor: '#CECECE',
        width: 250,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 5,
      }
})