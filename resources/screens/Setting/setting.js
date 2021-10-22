import React,{useEffect,useState} from "react"
import {View,Text,Alert,Button,StyleSheet,TouchableOpacity,ScrollView} from "react-native"
import { useSelector } from 'react-redux';
import actions from '../../redux/action';
import {getUserData} from '../../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { showMessage } from "react-native-flash-message";

export default function setting ({navigation})  {
    const [names,setNames] =useState()
    const [users,setUsers] =useState()
    const user = async ()=>{

        const userId = await getUserData()
        const name = JSON.stringify(userId.username)
        setNames(name)
        setUsers(userId)
    }

    useEffect(()=>{
      user()
    },[])
    console.log(20,users)
    const onLogoutAlert = () => {
        Alert.alert(
            'Warning ! ',
            'Are you sure, yout want to logout from this device ! ',
            [{ text: 'Yes', onPress: logout }, { text: 'No', }],
            { cancelable: true }
        )
    }
    const logout = () => {
        
        setTimeout(() => {
            actions.logout()
           showMessage({
            type:"success",
            icon:"auto",
            message:"Your are successfully logout!",
            backgroundColor:"#E9691D"
           })
        }, 10);

    }
    return(
        <View>
  <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFDDC9',
        }}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#FFDDC9"
            style={styles.icon}
          />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#512500',
            fontWeight: 'bold',
            marginTop: 25,
          }}>
          My Account
        </Text>
        <TouchableOpacity  onPress={()=>navigation.navigate("Cart")}>
          <Ionicons
            name="cart"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
<View style={styles.well} >
<Text style={styles.we} >Welcome</Text>
<Text style={[styles.we,{color:"white",textDecorationLine:"underline"}]}>{names}</Text>
</View>
<ScrollView contentContainerStyle={{paddingBottom:hp("20%")}} >
<View style={styles.vacc} >
<Text style={styles.acc} >My Moyen Account</Text>
<View style={styles.box}>
<TouchableOpacity style={styles.shadow} >
 <Ionicons name="albums-outline" size={20} style={{marginRight:20}}/>
<Text style={styles.orte} >Orders</Text>
</TouchableOpacity>
</View>
<View style={styles.box}>
<TouchableOpacity style={styles.shadow} >
 <Ionicons name="document-text-outline"  size={20} style={{marginRight:20}}/>
<Text style={styles.orte} >Ratings & Reviews</Text>
</TouchableOpacity>
</View>
<View style={styles.box}>
<TouchableOpacity style={styles.shadow} >
 <Ionicons name="heart-outline"  size={20} style={{marginRight:20}}/>
<Text style={styles.orte} >Saved Items</Text>
</TouchableOpacity>
</View>
<View style={styles.box}>
<TouchableOpacity style={styles.shadow} >
 <Ionicons name="eye-outline"  size={20} style={{marginRight:20}}/>
<Text style={styles.orte} >Recently Viewed</Text>
</TouchableOpacity>
</View>
<Text></Text>
<Text  style={styles.acc}  >My Settings</Text>
<View style={styles.box}>
<TouchableOpacity style={styles.shadow} onPress={()=>navigation.navigate("Userdeatils")} >
<Text style={styles.orte} >Details</Text>
</TouchableOpacity>
</View>
<View style={styles.box}>
<TouchableOpacity style={styles.shadow} >
<Text style={styles.orte} >Address Book</Text>
</TouchableOpacity>
</View>
<View style={styles.box}>
<TouchableOpacity style={styles.shadow} >
<Text style={styles.orte} >Change Password</Text>
</TouchableOpacity>
</View>
<Text></Text>
<TouchableOpacity onPress={onLogoutAlert} style={[styles.shadows]}>
    <Text  style={[styles.orte,{fontSize:30,textDecorationLine:'underline'}]} >LogOut</Text>
    <Ionicons name="log-out-outline" color="#512500"  size={40}/>
</TouchableOpacity>
</View>
</ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    icon: {
      margin: 20,
    },
    well:{
        padding:10,
        backgroundColor:"black"
    },
    we:{
        color:"#E9691D",
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center"
    },
    acc:{
        color:"#512500",
        fontSize:16,
        fontWeight:"bold"
    },
    vacc:{
        margin:30
    },
    box:{
        padding:13,
        marginTop:15,
        backgroundColor:"#F3F5F7",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius:10,
        flexDirection:"row",
        // marginBottom:1
    },
    orte:{
        color:"#512500",
        fontSize:16,
        fontWeight:"bold"
    },
    shadow:{
flexDirection:"row",
width:wp("80%"),
    },
    shadows:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        
    }
})


    // {/* <Text>{users.username}</Text>
    // <Text>
    //     <Button title="log out" onPress={onLogoutAlert} />
    // </Text> */}