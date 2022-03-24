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
  Platform,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../redux/action';
import {getUserData} from '../../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {showMessage} from 'react-native-flash-message';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from '@react-navigation/native';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';

export default function setting({navigation}) {
  const [names, setNames] = useState();
  const [users, setUsers] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [showWhatsApp, setWhatsApp] = useState(false);
  const [dummy, setDummy] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [islogout, setIslogout] = useState();

  const onWhatAppAlert = () => {
    setWhatsApp(true);
  };
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const isFocused = useIsFocused();

  const [mobileNumber, setMobileNumber] = useState('+14707758326');
  const whatAppPhone = () => {
    Linking.openURL(`whatsapp://send?text=hello&phone=${mobileNumber}`);
  };

  const user = async () => {
    const userId = await getUserData();
    // const name = 'bdfndbf';
    const name = JSON.stringify(userId.username);

    setNames(name);
    setUsers(userId);
  };
  const checkStatus = async () => {
    const user = await getUserData();
    // console.log(236, user);
    if (user == null) {
      // console.log(240);
      setIsLoggedIn(false);
      // await datacallss(false);
    } else if (user !== null) {
      // console.log(244);
      setIsLoggedIn(true);

      // await datacallss(true);
    }
  };

  useEffect(() => {
    (async () => {
      await checkStatus();
      if (isFocused) {
        await checkStatus();
        user();
      } else {
        console.log('Screen is not focused');
      }
      // await datacallss();
    })();
  }, [isFocused]);
  const onLogoutAlert = () => {
    setShowAlert(true);
  };
  const dispatch = useDispatch();
  const logout = () => {
    setTimeout(() => {
      actions.logout(dispatch);
      setIsLoggedIn(false);
      setIslogout(true);
      // showMessage({
      //   type: 'success',
      //   icon: 'auto',
      //   message: 'Your are successfully logout!',
      //   backgroundColor: '#E9691D',
      // });
    }, 10);
  };

  var stringName = names;
  stringName = stringName?.replace(/^"|"$/g, '');

  const welcomeContainer = () => {
    return (
      <View style={styles.well}>
        <Text style={{...styles.we}}>Welcome</Text>
        <Text
          style={{
            ...styles.we,
            color: 'white',
            // marginLeft: wp('4%'),
            marginTop: hp('1%'),
          }}>
          {stringName}
        </Text>
      </View>
    );
  };
  const loginContainer = () => {
    return (
      <View style={styles.well}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyTabs')}
          style={styles.loginContainer}>
          <Text style={styles.loginText}>Login/Signup</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="#94725f" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFDDC9',
          height: hp('10%'),
        }}>
        <TouchableOpacity
          onPress={() => onWhatAppAlert()}
          style={styles.questionMarkContainer}>
          <Ionicons
            name="ios-logo-whatsapp"
            size={30}
            style={{
              // margin: 20,
              marginTop: hp(Platform?.OS == 'ios' ? '4' : '0'),
              marginLeft: wp('3'),
              // marginLeft: wp(Platform?.OS == 'ios' ? '3' : '3'),
            }}
            color={color.bottomNavColor}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#512500',
            fontWeight: 'bold',
            marginTop: hp(Platform?.OS == 'ios' ? '5.5%' : '3.5%'),
          }}>
          My Account
        </Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons
            name="cart"
            size={35}
            color="#512500"
            style={{
              ...styles.icon,
              marginTop: hp(Platform?.OS == 'ios' ? '4.5' : '3'),
            }}
          />
        </TouchableOpacity> */}
        <View
          style={{
            marginTop: hp(Platform?.OS == 'ios' ? '4.5' : '3'),
          }}>
          <HomeCartIcon
            // islogout={islogout == true ? true : false}
            isLoggedIn={isLoggedIn}
            navigations={navigationProps}
          />
        </View>
      </View>
      {isLoggedIn ? welcomeContainer() : loginContainer()}
      {/* {loginContainer()} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: hp('30%'),
        }}>
        {/* <View style={styles.vacc}> */}
        <Text
          style={{
            ...styles.acc,
            marginTop: hp('3'),
            marginLeft: wp(Platform?.OS == 'ios' ? '-36' : '-36'),
          }}>
          My Moyen Account
        </Text>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('Userdeatils')
              : showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: 'Kindly login first',
                  backgroundColor: '#E9691D',
                });
          }}>
          <Ionicons
            name="person-circle-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('OrderDetails')
              : showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: 'Kindly login first',
                  backgroundColor: '#E9691D',
                });
          }}
          style={styles.shadow}>
          <Ionicons
            name="albums-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>Orders</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.shadow}>
          <Ionicons
            name="document-text-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>Ratings & Reviews</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('subcatdetails', {
                  screenData: 'wishlist',
                  isWishlist: true,
                })
              : showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: 'Kindly login first',
                  backgroundColor: '#E9691D',
                });
          }}
          style={styles.shadow}>
          <Ionicons
            name="heart-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>Saved Items</Text>
        </TouchableOpacity>
        {/* </View> */}
        {/* <TouchableOpacity style={styles.shadow}>
          <Ionicons
            name="eye-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>Recently Viewed</Text>
        </TouchableOpacity> */}

        <Text
          style={{
            ...styles.acc,
            marginTop: hp('3'),
            marginBottom: hp('1'),
            // marginRight: wp('60'),
            // marginRight: wp(Platform?.OS == 'ios' ? '0' : '0'),
            marginLeft: wp(Platform?.OS == 'ios' ? '-43' : '-53'),
          }}>
          My Settings
        </Text>

        {/* <TouchableOpacity style={styles.shadow}>
          <Ionicons
            name="book-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>Address Book</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('changepassword')
              : showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: 'Kindly login first',
                  backgroundColor: '#E9691D',
                });
          }}>
          <Ionicons
            name="keypad-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>Change Password</Text>
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity style={styles.shadow} onPress={onLogoutAlert}>
            <Ionicons
              name="log-out-outline"
              size={20}
              style={{marginRight: 20}}
              color="gray"
            />
            <Text style={styles.orte}>Logout</Text>
          </TouchableOpacity>
        )}
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
          setShowAlert(false);
          setTimeout(() => {
            logout();
          }, 1000);
        }}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
      <AwesomeAlert
        show={showWhatsApp}
        showProgress={false}
        title="Contact With Admin"
        titleStyle={{color: 'black', fontWeight: 'bold'}}
        message="Help For user To Contact Super Admin"
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        // showConfirmButton={true}
        // confirmText="Yes"
        cancelText="Whatsapp"
        cancelButtonStyle={styles.buttonstyleWhatapp}
        cancelButtonTextStyle={{fontSize: hp('1.9')}}
        // confirmButtonTextStyle={{fontSize: hp('2.2%')}}

        // onConfirmPressed={() => {
        //   setWhatsApp(false);
        //   setTimeout(() => {
        //     // logout();
        //   }, 1000);
        // }}
        onCancelPressed={() => {
          setWhatsApp(false);
          whatAppPhone();
        }}
      />
    </View>
  );
}
