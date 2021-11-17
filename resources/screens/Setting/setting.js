import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import actions from '../../redux/action';
import {getUserData} from '../../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {showMessage} from 'react-native-flash-message';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from "@react-navigation/native"


export default function setting({navigation}) {
  const [names, setNames] = useState();
  const [users, setUsers] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [dummy,setDummy] = useState("")
  
  const isFocused = useIsFocused()
  // if(route?.params==screenUpdatess){
  //  setDummy("a")
  //  console.log(47,"update")
  // } else{
  //   console.log("no update")
  // }
  const user = async () => {
    const userId = await getUserData();
    const name = JSON.stringify(userId.username);
   
    setNames(name);
    setUsers(userId);
  };

  useEffect(() => {
    user();
    if (isFocused) {
      user()
    }else{
      console.log(58,"screen is not Focused")
    }
  }, [isFocused]);
  const onLogoutAlert = () => {
    setShowAlert(true);
  };
  const logout = () => {
    setTimeout(() => {
      actions.logout();
      showMessage({
        type: 'success',
        icon: 'auto',
        message: 'Your are successfully logout!',
        backgroundColor: '#E9691D',
      });
    }, 10);
  };
  var stringName = names;
  stringName = stringName?.replace(/^"|"$/g, '');
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="#94725f" />
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
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={30} color="#512500" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.well}>
        <Text style={styles.we}>Welcome</Text>
        <Text style={[styles.we, {color: 'white'}]}>{stringName}</Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: hp('20%')}}>
        <View style={styles.vacc}>
          <Text style={styles.acc}>My Moyen Account</Text>
          <View style={styles.box}>
            <TouchableOpacity style={styles.shadow}
             onPress={() => navigation.navigate('Userdeatils')}
            >
              <Ionicons
                name="person-circle-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>My Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.shadow}
            onPress={()=>navigation.navigate('checkOut')}
            >
              <Ionicons
                name="albums-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>Orders</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.shadow}>
              <Ionicons
                name="document-text-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>Ratings & Reviews</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('subcatdetails', {
                  screenData: 'wishlist',
                  isWishlist: true,
                })
              }
              style={styles.shadow}>
              <Ionicons
                name="heart-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>Saved Items</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.shadow}>
              <Ionicons
                name="eye-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>Recently Viewed</Text>
            </TouchableOpacity>
          </View>
         
          <Text style={{...styles.acc, marginTop: hp('2%')}}>My Settings</Text>
          {/* <View style={styles.box}>
            <TouchableOpacity
              style={styles.shadow}
              onPress={() => navigation.navigate('Userdeatils')}>
              <Text style={styles.orte}>Details</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.box}>
            <TouchableOpacity style={styles.shadow}>
            <Ionicons
                name="book-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>Address Book</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.shadow} onPress={()=>navigation.navigate('changepassword')}>
            <Ionicons
                name="keypad-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.shadow} onPress={onLogoutAlert}>
              <Ionicons
                name="log-out-outline"
                size={20}
                style={{marginRight: 20}}
                color="gray"
              />
              <Text style={styles.orte}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning!"
        message="Are you sure, yout want to logout from this device."
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Yes"
        cancelText="No"
        confirmButtonStyle={styles.buttonstyle}
        cancelButtonStyle={styles.buttonstyle}
        cancelButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonColor={color.textColorRedCart}
        cancelButtonColor={color.textColorRedCart}
        onConfirmPressed={() => {
          logout();
          setShowAlert(false);
        }}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
    </View>
  );
}
