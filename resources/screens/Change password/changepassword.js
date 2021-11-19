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
  Platform,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  ADDTOWISHLIST,
  API_BASED_URL,
  CART,
  CARTDELETE,
  Images_API,
  PASSWORDCHNAGE,
  testCART,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {NineCubesLoader, BubblesLoader} from 'react-native-indicator';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {HelperText, TextInput} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

export default function changepassword({navigation}) {
  const [current_password, setCurrent_password] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [userId, setUser_ID] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const passwordchange = async () => {
    setLoadingButton(true);
    let netFlag = 0;
    await NetInfo.fetch('wifi').then(async state => {
      if (state.isConnected) {
        netFlag = 1;
        if (current_password == '') {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Your Currrent Password',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else if (password == '') {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Your New Password',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else if (password_confirmation == '') {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Correct Password',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else if (current_password == (password || password_confirmation)) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter New Password',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else if (password != password_confirmation) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Correct Password',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else {
          passwordChangeRequest();
          // console.log(userId)
        }
      } else {
        setShowAlert(true);
      }
    });
  };

  const passwordChangeRequest = () => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var formdata = new FormData();
    //     formdata.append('current_password', current_password);
    //     formdata.append('password', password);
    //     formdata.append('password_confirmation', password_confirmation);
    formdata.append('current_password', current_password);
    formdata.append('password', password);
    formdata.append('password_confirmation', password_confirmation);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    console.log('108', API_BASED_URL + PASSWORDCHNAGE + '/' + userId);
    console.log('108', API_BASED_URL);
    console.log('110', PASSWORDCHNAGE);

    fetch(`${PASSWORDCHNAGE}/${userId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(109, result);
        setLoadingButton(false);
        setPassword('');
        setCurrent_password('');
        setPassword_confirmation('');
        if (result == 'User Password Change Successful') {
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Password Change Successfully',
            backgroundColor: '#E9691D',
          });
        } else {
          setPassword('');
          setCurrent_password('');
          setPassword_confirmation(''),
            showMessage({
              type: 'danger',
              icon: 'danger',
              message: 'Some Thing Want Wrong',
              backgroundColor: '#E9691D',
            });
        }
      })
      .catch(error => console.log('error', error));
    //     fetch(`${API_BASED_URL}${PASSWORDCHNAGE}/${userId}`, {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         current_password,
    //         password,
    //         password_confirmation,
    //       }),
    //     })
    //       .then(res => res.json)
    //       .then(json => {
    //         console.log(86, json), setLoadingButton(false);
    //       });
  };

  useEffect(() => {
    (async () => {
      const userId = await getUserData();
      const users = userId.id;
      setUser_ID(users);
    })();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#512500',
            fontWeight: 'bold',
            marginTop: hp(Platform?.OS == 'ios' ? '6' : '3'),
            marginLeft: wp('3'),
          }}>
          Carts
        </Text>
        <Ionicons
          name="cart"
          size={30}
          color="#512500"
          style={{
            ...styles.icon,

            marginRight: wp('3'),
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.page}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: wp('8%'),
              color: color.defaultcolor,
              fontWeight: 'bold',
            }}>
            Notice
          </Text>
          <Text style={styles.noticstext}>
            It's a good idea to use a strong password that you're not using
            elsewhere.
          </Text>
        </View>
        <View style={styles.textinputview}>
          <TextInput
            label="Current Password *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%')}]}
            // keyboardType="visible-password"
            value={current_password}
            selectionColor="#FF7E33"
            onChangeText={text => setCurrent_password(text)}
          />
          <TextInput
            label="New Password *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%')}]}
            // keyboardType="visible-password"
            value={password}
            selectionColor="#FF7E33"
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            label="Confirm New Password *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%')}]}
            // keyboardType="visible-password"
            value={password_confirmation}
            selectionColor="#FF7E33"
            onChangeText={text => setPassword_confirmation(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => passwordchange()}
          style={{
            width: wp('60%'),
            height: hp('6%'),
            backgroundColor: '#FF7E33',
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 7,
            flexDirection: 'row',
            // alignItems:'center',
            // justifyContent:'center'
          }}>
          <View
            style={{
              width: wp('10%'),
              height: hp('6%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              style={{marginLeft: wp('3%')}}
              name="lock-closed"
              size={25}
              color={'white'}
            />
          </View>
          <View
            style={{
              width: wp('45%'),
              height: hp('6%'),
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            {loadingButton ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text
                style={{
                  fontSize: hp('1.6%'),
                  color: 'white',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Change Your Password
              </Text>
            )}
          </View>
          {/* <View
            style={{
              width: wp('10%'),
              height: hp('6%'),
              backgroundColor: 'red',
            }}></View> */}
        </TouchableOpacity>
      </ScrollView>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning!"
        message="You are not connected to the internet."
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </View>
  );
}
