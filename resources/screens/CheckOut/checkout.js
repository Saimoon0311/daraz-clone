import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ADDTOCART,
  ADDTOWISHLIST,
  API_BASED_URL,
  Images_API,
  SUBCATPRODUCTDATA,
} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import {color} from '../../config/color';
import {styles} from './style';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
  BubblesLoader,
} from 'react-native-indicator';
import AwesomeAlert from 'react-native-awesome-alerts';


export default function checkOut ({navigation}){

const header = () =>{
return(

<View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>Check out</Text>
          <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon} />
      </View>
)
}
return(
<View style={styles.main}>
{header()}
      <View>
       <View style={styles.topMain} >
        <TouchableOpacity style={styles.topButtonActive} >
         <Text style={styles.topButtonActiveText} >Delivary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButtonInactive}>
         <Text style={styles.topButtonInactiveText}>Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButtonInactive}>
         <Text style={styles.topButtonInactiveText}>Sumary</Text>
        </TouchableOpacity>
       </View>
       <View style={styles.box}>
       </View>
      </View>
</View>
)
}