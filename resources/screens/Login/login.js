import React, {useState} from 'react';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
  StatusBar,
  Linking,
  Image,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import action from '../../redux/action';
import {FORGETPASSWORD, LOGIN} from '../../config/url';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Login({navigation}) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const {email, password} = state;
  const updateState = data => setState(() => ({...state, ...data}));
  const [isShow, setisShow] = useState(false);
  const loginss = async () => {
    setLoadingButton(true);
    let netFlag = 0;
    await NetInfo.fetch('wifi').then(async state => {
      if (state.isConnected) {
        netFlag = 1;
        if (email == '') {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Please enter yor email',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else if (password == '') {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Please enter you password',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else {
          try {
            const res = await action.login(
              {
                email,
                password,
              },
              navigation,
            );
            console.log('res=== 83', res);
            if (res[0].message == 'Email not found') {
              showMessage({
                type: 'danger',
                icon: 'danger',
                message: res[0].message,
                backgroundColor: '#E9691D',
              });
              setLoadingButton(false);
              // console.log('res=== 86 ', res);
            } else if (res[0].message == 'Password is incorrect') {
              showMessage({
                type: 'danger',
                icon: 'danger',
                message: res[0].message,
                backgroundColor: '#E9691D',
              });
              setLoadingButton(false);
              // console.log('res=== 86 ', res);
            } else {
              // showMessage({
              //   type: 'success',
              //   icon: 'success',
              //   message: 'User Login Success',
              // });
              console.log(res);
              setLoadingButton(false);
            }
          } catch (error) {
            // console.log('errot', error);
            setLoadingButton(false);
            showMessage({
              type: 'danger',
              icon: 'danger',
              message: error?.message,
              backgroundColor: '#E9691D',
            });
          }
        }
      } else {
        setShowAlert(true);
        setLoadingButton(false);
      }
    });

    // }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // style={{
      //   width: wp('100'),
      //   height: hp('100'),
      // }}
      contentContainerStyle={{flex: 1}}>
      <StatusBar backgroundColor="#FFDDC9" barStyle="dark-content" />
      <View
        style={{
          backgroundColor: color.primaryBackground,
          paddingLeft: 28.5,
          paddingRight: 27.5,
          paddingBottom: 150,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            // backgroundColor: 'yellow',
          }}>
          <Image
            source={require('../../images/logo.png')}
            style={{
              // alignSelf: 'center',
              width: wp('20'),
              height: hp('8'),
              marginTop: hp('4'),
              // backgroundColor: 'red',
            }}
            resizeMode="contain"
          />
          <Image
            source={require('../../images/Group66.png')}
            style={{
              // alignSelf: 'center',
              width: wp('20'),
              height: hp('8'),
              marginTop: hp('4'),
              // backgroundColor: 'green',
            }}
            resizeMode="contain"
          />
        </View>

        <View style={{backgroundColor: color.primaryBackground}}>
          {/* <Text style={{marginBottom: 15}}></Text> */}
          <TextInput
            label="Email *"
            underlineColor="gray"
            value={email}
            autoCapitalize="none"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%')}]}
            onChangeText={email => updateState({email})}
          />
          <Text style={{marginBottom: 13}}></Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              label="Password *"
              underlineColor="gray"
              value={password}
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('75%')}]}
              selectionColor="#FF7E33"
              secureTextEntry={show ? false : true}
              onChangeText={password => updateState({password})}
            />
            <Ionicons
              onPress={handleClick}
              color={color.themColorPrimary}
              style={{top: 30}}
              size={25}
              name={show ? 'eye-outline' : 'eye-off-outline'}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL(FORGETPASSWORD)}>
          <Text
            style={{
              paddingTop: hp('2'),
              color: '#B64400',
              fontSize: hp('2'),
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View>
          {/* {loadingButton ? (
            <OrientationLoadingOverlay
              visible={true}
              color="white"
              indicatorSize="large"
              messageFontSize={24}
              message="Loading..."
            />
          ) : ( */}
          <TouchableOpacity
            onPress={loginss}
            style={{
              width: wp('65%'),
              height: hp('6%'),
              backgroundColor: '#FF7E33',
              alignSelf: 'center',
              marginTop: 30,
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: wp('15%'),
                height: hp('6%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                style={{marginLeft: wp('3%')}}
                name="log-in"
                size={25}
                color={'white'}
              />
            </View>
            <View
              style={{
                width: wp('35%'),
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
                    fontSize: hp('2.8%'),
                    color: 'white',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Login
                </Text>
              )}
            </View>
            <View
              style={{
                width: wp('15%'),
                height: hp('7%'),
              }}></View>
          </TouchableOpacity>
          {/* )} */}

          {/* <TouchableOpacity style={styles.buts}>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Ionicons name="logo-facebook" size={18} color={'white'} />
            </View>
            <View style={{justifyContent: 'center', marginLeft: wp("12%")}}>
              <Text
                style={{
                  fontSize: hp("2%"),
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Connect With Facebook
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
        <View style={styles.ty}>
          <Text style={{fontSize: 14, textAlign: 'center', color: '#512500'}}>
            New on Moyen?
          </Text>
        </View>
        <TouchableOpacity
          style={styles.ty}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={{fontSize: 18, textAlign: 'center', color: '#E9691D'}}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning!"
        message="You are not connect to the internet."
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
    </ScrollView>
  );
}

// try {
//   const res = await action.login({
//     email,
//     password,
//   });
//   console.log('res=== ', res);
//   showMessage({
//     type: 'success',
//     icon: 'success',
//     message: 'User Login Success',
//   })
// } catch (error) {
//   console.log('errot', error);
//   showMessage(error.message);
// }
