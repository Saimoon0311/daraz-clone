
import React,{useState,useEffect} from "react"
import {View,Text,TouchableOpacity,StyleSheet,Image,FlatList,ScrollView,ActivityIndicator} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FlatListPicker from 'react-native-flatlist-picker';
import { color } from "styled-system";
import { ADDTOCART, Images_API } from "../../config/url";
import { showMessage } from "react-native-flash-message";
import { getUserData } from "../../utils/utils";

export default function Details ({ route, navigation }){
  const [user_id,setUser_id] =useState()
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
 ff()
  })
  const ff = async ()=>{
  
    const userId = await getUserData();
    const users = userId.id;
    setUser_id(users)
    console.log("18",user_id)
  }

  const item = route.params;
    const imm = item.images
    const attribute = item.get_attribute_values
    const product_id =item.id

    const cartadd =  ()=>{
      setLoading(true)
      //  await ff()
     console.log(user_id)
       fetch(ADDTOCART, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id,
        user_id
      }) 
    })
    .then((response) => response.json())
    .then((json) => {
       console.log(json)
       ,showMessage({
           type:"success",
           icon:"auto",
           message:"Your Product Has Been Add To Cart",
           backgroundColor:"#E9691D"
         }),
         setLoading(false)

       })
       .done();
  }  
     

    console.log("tyuu======>>>>>>>>>>",item)
    return(
        <View>
             <View  style={styles.header} >
                <TouchableOpacity onPress={()=>navigation.goBack()} >
                    <Ionicons name="arrow-back-sharp"  size={30} color="#512500" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.te} >Details</Text>
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

              <Image source={{uri:`${Images_API}/${item.name}`}} style={styles.imm} />
          )
      }}
   />
<View style={styles.box}>
    <Text style={[styles.tep,{fontWeight:"bold"}]} >{item.name}</Text>
    <Text style={styles.tep}>Category : {item.getchildcategory.name}</Text>
    {item.is_discounted == 2 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                          <Text
                          style={{
                            color: '#512500',
                            fontSize: 18,
                            fontWeight: 'bold'}}
                            >
                            Price :    
                          </Text>
                        <Text
                          style={{
                            color: '#512500',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textDecorationLine: 'line-through',
                          }}>
                            $ {item.price}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {' '}
                          $ {item.discounted_price}
                        </Text>
                      </View>
                    ) : (
                      <View
                      style={{
                        flexDirection: 'row',
                      }}>
                        <Text
                         style={{
                          color: '#512500',
                          fontSize: 18,
                          fontWeight: 'bold'}}
                        > 
                          Prices : 
                           </Text>

                      <Text
                        style={{
                          color: '#512500',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        $ {item.price}
                      </Text>
                      </View>
                    )}
    {/* <Text style={[styles.tep,{fontWeight:"bold"}]}>Rs : {item.price}</Text> */}
    <Text style={styles.tep}>SKU : {item.sku}</Text>
    <Text style={[styles.tep,{fontWeight:"bold"}]}>Description :</Text>
    <Text style={{marginLeft:"auto",textAlign:"justify"}} > {item.description} </Text> 
    


</View>
<Text style={styles.delvery}> Delivery & Returns</Text>
        <View style={[styles.box,{marginBottom:hp("25%")}]} >
        <Text style={[styles.tep,{fontWeight:"bold"}]} >Choose Your Location</Text>
        </View>
        
        </View>
        </ScrollView>
        <View style={{ position: "absolute", bottom: 80, alignSelf: "center"}} >
          {item.stock < 1 ? <Text style={styles.stock}>Out Of Stock</Text>:
          
        <View style={{ flexDirection: "row", bottom: 0, alignSelf: "center" }} >
          <TouchableOpacity style={styles.carttouch} onPress={cartadd}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {loading? <ActivityIndicator size="large" color="white" />:
              <Text style={{ color: "white", fontSize: 20,  fontWeight: "bold" }} >Add To Cart</Text>
              }
            </View>
          </TouchableOpacity>
        </View>
          }

      </View> 
 </View>
    )
}


const styles = StyleSheet.create({
  header:{
    flexDirection: "row", 
    justifyContent: "space-between",
    backgroundColor:"#FFDDC9",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 10,
    shadowRadius: 6,  
    elevation: 5,
  },
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
      },
      imm:{
        width:wp("88%"),
        height:hp("40%"),
        marginRight:20,
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 10,
        shadowRadius: 3,
        borderWidth:0.1,
        borderColor:"gray"
      },
      te:{
        textAlign:"center",
        fontSize:18,
        color:"#512500",
        fontWeight:"bold",
        marginTop:25
      },
      tep:{
        color:"#512500",
        fontSize:14,
      },
      carttouch:{
        backgroundColor: "#E9691D", 
        width: wp("85%"),
         height: hp("7%"),
          alignItems: "center",
           justifyContent: "center",
         borderRadius: 10
      },
      delvery:{
        fontSize:14,
        fontWeight:"bold",
        color:"#919191",
        marginTop:20
      },
      stock:{
      color:"red",
      fontSize:30,
      fontWeight:"bold",
      textDecorationLine:"underline"
      }
})




// {"child_category_id": 50, "created_at": "2021-08-20T08:08:22.000000Z", "deleted_at": null, "description": "Test Description", "discounted_percentage": 10, "discounted_price": 585, "featured": 1, "get_attribute_values": [{"attribute": [Object], "attribute_id": 1, "created_at": "2021-08-20T10:03:01.000000Z", "id": 73, "product_id": 105, "updated_at": "2021-08-23T13:08:28.000000Z", "value": [Array]}, {"attribute": [Object], "attribute_id": 7, "created_at": "2021-08-20T13:07:00.000000Z", "id": 88, "product_id": 105, "updated_at": "2021-08-23T10:02:06.000000Z", "value": [Array]}], "get_shop": {"created_at": "2021-08-18T22:39:02.000000Z", "deleted_at": null, "description": "test", "get_vendor": {"address_one": "Nesciunt rerum temp", "address_two": "Nesciunt rerum temp", "city": "Incididunt eos accus", "country": "US", "created_at": "2021-08-18T22:39:02.000000Z", "email": "testvendor@gmail.com", "id": 40, "image": "1629326342-254890.jfif", "password": "$2y$10$fiGodS6VNYikSsLDGOush.4wgAixx51byY6u6ygkA2J81JhtWGxU2", "phone_number": "+1 24265 8979", "status": 1, "updated_at": "2021-08-30T12:45:08.000000Z", "user_role": 2, "username": "test vendor", "zipcode": 123456}, "id": 16, "image": "162984592417.jpg", "name": "TestShop", "status": 1, "updated_at": "2021-08-30T13:20:27.000000Z", "vendor_id": 40}, "getchildcategory": {"created_at": "2021-08-17T15:34:44.000000Z", "id": 50, "name": "Mirrors", "status": 1, "sub_category": {"category": [Object], "category_id": 8, "created_at": "2021-08-17T15:20:48.000000Z", "id": 14, "name": "Home Accessories", "status": 1, "updated_at": "2021-08-17T15:20:48.000000Z"}, "sub_category_id": 14, "updated_at": "2021-08-17T15:34:44.000000Z"}, "has_variations": 1, "id": 105, "images": [{"created_at": "2021-08-20T08:08:22.000000Z", "deleted_at": null, "id": 134, "name": "162947930220.jpg", "product_id": 105, "updated_at": "2021-08-20T08:08:22.000000Z"}, {"created_at": "2021-08-20T08:08:22.000000Z", "deleted_at": null, "id": 135, "name": "16294793028.jfif", "product_id": 105, "updated_at": "2021-08-20T08:08:22.000000Z"}, {"created_at": "2021-08-20T08:08:22.000000Z", "deleted_at": null, "id": 136, "name": "162947930221.jfif", "product_id": 105, "updated_at": "2021-08-20T08:08:22.000000Z"}], "is_discounted": 2, "name": "Orla Gay", "price": 650, "shop_id": 16, "sku": "1688775486", "slug": "orla-gay-16-1629497220-50-209", "status": 1, "stock": 46, "updated_at": "2021-08-27T15:01:06.000000Z"}



// const [itemcolor,setItemcolor] = useState()


// for (let x = 0; x < atttri.length; x++) {
//     // const element = array[x];
//     setAttr[x](atttri[x].value[0])        
// }


// const [attr, setAttr] = useState([item.get_attribute_values[0].value[0]]);

// const [itemcolor,setItemcolor]=useState([].length)
// const [itematt,setItematt] = useState([
//     "k","u","t"
// ])

// all:['a','b','c']
// attribute:{'b':1,'c':2},
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
    // selectedValue={itemcolor}                            color
    selectedValue={attr}
    
    onValueChange={(itemValue, itemIndex) =>{
        // setItemcolor[itemIndex](itemValue)
        for(let i =0; i<all.lenght;i++)
        {
          if(data-att== all[i])
          {
          attribute[''+all[i]+''] = itemValue;
          }
        }
        
        setItemcolor(attribute:{'b':1,'c':2})
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