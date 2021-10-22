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

export default function Userdeatils({navigation}){

const [userdata,setUserdata] = useState();
  const [isLoading,setLoading] = useState(true);
  useEffect( async () => {
   const userId = await getUserData();
    const users = userId.id;
    console.log(286,users)
 fetch(`${USERDATA}/${users}`)
    .then((response) => response.json())
    .then( (json) =>  setUserdata(json), console.log(17,userdata))
    .catch((error) => console.error(33,error))
      .finally(() => setLoading(false));
      console.log(17,userdata)
  },[])
  console.log(454545,userdata)
return(
<View>
{isLoading?<ActivityIndicator size={100} color="#512500" style={styles.loader} />:
<Text>{userdata[0].username}</Text>
}
</View>
)}


const styles = StyleSheet.create({
loader:{
justifyContent:"center",
alignContent:"center",
alignItems:"center",
textAlign:"center",
alignSelf:"center",
marginTop:100
}
})