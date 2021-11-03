import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {CART, CARTDELEtE, Images_API, testCART, USERDATA} from '../../config/url';
import { getUserData } from '../../utils/utils';
import {color} from "../../config/color"


export default function Userdeatils({navigation}){

const [userdata,setUserdata] = useState();
  const [isLoading,setLoading] = useState(true);
  const getData = async ()=>{
    const userId = await getUserData();
    const users = userId.id;
    console.log(286,users)
 fetch(`${USERDATA}/${users}`)
    .then((response) => response.json())
    .then( (json) =>  setUserdata(json), console.log(17,userdata))
    .catch((error) => console.error(33,error))
      .finally(() => setLoading(false));
      console.log(17,userdata)
  }
    useEffect( () => {
    (async()=>{
      getData()
    })
  },[])
  console.log(454545,userdata)
return(
<View style={styles.main} >
{isLoading?<ActivityIndicator size={100} color="#512500" style={styles.loader} />:
<Text>{userdata[0].username}</Text>
}
</View>
)}


const styles = StyleSheet.create({
  main:{
backgroundColor:color.defaultBackgroundColor
  },
loader:{
justifyContent:"center",
alignContent:"center",
alignItems:"center",
textAlign:"center",
alignSelf:"center",
marginTop:100
}
})