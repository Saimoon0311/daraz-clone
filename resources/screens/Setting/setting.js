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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {languageCheck} from '../../config/languageChecker';

export default function setting({navigation}) {
  const [names, setNames] = useState();
  const [users, setUsers] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [showWhatsApp, setWhatsApp] = useState(false);
  const [dummy, setDummy] = useState(1);
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
    const name = JSON.stringify(userId.username);
    setNames(name);
    setUsers(userId);
  };
  const checkStatus = async () => {
    setDummy(dummy + 1);
    const user = await getUserData();
    if (user == null) {
      setIsLoggedIn(false);
    } else if (user !== null) {
      setIsLoggedIn(true);
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
      <View style={{...styles.well, padding: hp('0.2')}}>
        <Text style={{...styles.we}}>{languageCheck('Welcome')}</Text>
        <Text
          style={{
            ...styles.we,
            color: 'white',
            marginTop: hp('0.3'),
            fontWeight: '500',
            letterSpacing: 1,
            fontFamily: Platform.OS == 'ios' ? 'Iowan Old Style' : 'notoserif',
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
          <Text style={styles.loginText}>
            {languageCheck('Login')}/{languageCheck('Signup')}
          </Text>
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
          height: Platform.OS == 'ios' ? hp('10') : hp('7'),
        }}>
        <TouchableOpacity
          onPress={() => onWhatAppAlert()}
          style={styles.questionMarkContainer}>
          <Ionicons
            name="ios-logo-whatsapp"
            size={hp('3')}
            style={{
              marginTop: hp(Platform?.OS == 'ios' ? '4' : '0'),
              marginLeft: wp('3'),
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
            marginTop: hp(Platform?.OS == 'ios' ? '6' : '0'),
            textAlignVertical: 'center',
          }}>
          {languageCheck('My Account')}
        </Text>
        <View
          style={{
            marginTop: hp(Platform?.OS == 'ios' ? '4' : '0'),
            alignSelf: 'center',
          }}>
          <HomeCartIcon isLoggedIn={isLoggedIn} navigations={navigationProps} />
        </View>
      </View>
      {isLoggedIn ? welcomeContainer() : loginContainer()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: hp('30%'),
        }}>
        <Text
          style={{
            ...styles.acc,
            marginTop: hp('3'),
            marginLeft: wp(Platform?.OS == 'ios' ? '-32' : '-36'),
          }}>
          {languageCheck('My Moyen Account')}
        </Text>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('Userdeatils')
              : showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: languageCheck('Kindly login first'),
                  backgroundColor: '#E9691D',
                });
          }}>
          <Ionicons
            name="person-circle-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>{languageCheck('My Profile')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('OrderDetails')
              : showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: languageCheck('Kindly login first'),
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
          <Text style={styles.orte}>{languageCheck('Orders')}</Text>
        </TouchableOpacity>
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
                  message: languageCheck('Kindly login first'),
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
          <Text style={styles.orte}>{languageCheck('Saved Items')}</Text>
        </TouchableOpacity>

        <Text
          style={{
            ...styles.acc,
            marginTop: hp('3'),
            marginBottom: hp('1'),
            marginLeft: wp(Platform?.OS == 'ios' ? '-48' : '-53'),
          }}>
          {languageCheck('My Settings')}
        </Text>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => {
            // isLoggedIn
            // ?
            navigation.navigate('languageChange');
            // : showMessage({
            //     type: 'warning',
            //     icon: 'auto',
            //     message: languageCheck('Kindly login first'),
            //     backgroundColor: '#E9691D',
            //   });
          }}>
          <MaterialIcons
            name="language"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>{languageCheck('Language/Currency')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shadow}
          onPress={() => {
            isLoggedIn
              ? navigation.navigate('changepassword')
              : showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: languageCheck('Kindly login first'),
                  backgroundColor: '#E9691D',
                });
          }}>
          <Ionicons
            name="keypad-outline"
            size={20}
            style={{marginRight: 20}}
            color="gray"
          />
          <Text style={styles.orte}>{languageCheck('Change Password')}</Text>
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity style={styles.shadow} onPress={onLogoutAlert}>
            <Ionicons
              name="log-out-outline"
              size={20}
              style={{marginRight: 20}}
              color="gray"
            />
            <Text style={styles.orte}>{languageCheck('Logout')}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={languageCheck('Warning!')}
        message={languageCheck(
          'Are you sure, yout want to logout from this device',
        )}
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        titleStyle={{color: 'black'}}
        messageStyle={{textAlign: 'center'}}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText={languageCheck('Yes')}
        cancelText={languageCheck('No')}
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
        title={languageCheck('Contact With Admin')}
        titleStyle={{color: 'black', fontWeight: 'bold'}}
        message={languageCheck('Help For user To Contact Super Admin')}
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={false}
        messageStyle={{textAlign: 'center'}}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Whatsapp"
        cancelText={languageCheck('No')}
        cancelButtonStyle={styles.buttonstyleCancelWhatapp}
        cancelButtonTextStyle={{fontSize: hp('1.9')}}
        confirmButtonTextStyle={{fontSize: hp('1.9')}}
        confirmButtonStyle={styles.buttonstyleWhatapp}
        onConfirmPressed={() => {
          setWhatsApp(false);
          whatAppPhone();
        }}
        onCancelPressed={() => {
          setWhatsApp(false);
        }}
      />
    </View>
  );
}
