import React, {useState, useEffect} from 'react';
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
  Platform,
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
import {useDispatch} from 'react-redux';
import {languageCheck} from '../../config/languageChecker';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const [state, setState] = useState({
    email: '',
    password: '',
    // email: 'shaheer031123@gmail.com',
    // password: '123654789',
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
              dispatch,
            );
            if (res[0].message == 'Email not found') {
              showMessage({
                type: 'danger',
                icon: 'danger',
                message: res[0].message,
                backgroundColor: '#E9691D',
              });
              setLoadingButton(false);
            } else if (res[0].message == 'Password is incorrect') {
              showMessage({
                type: 'danger',
                icon: 'danger',
                message: res[0].message,
                backgroundColor: '#E9691D',
              });
              setLoadingButton(false);
            } else {
              setLoadingButton(false);
            }
          } catch (error) {
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
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
          }}>
          <Image
            source={require('../../images/logo1.png')}
            style={{
              width: wp('20'),
              height: hp('8'),
              marginTop: hp('4'),
            }}
            resizeMode="contain"
          />
          <Image
            source={require('../../images/Group66.png')}
            style={{
              width: wp('20'),
              height: hp('8'),
              marginTop: hp('4'),
            }}
            resizeMode="contain"
          />
        </View>

        <View style={{backgroundColor: color.primaryBackground}}>
          <TextInput
            label={languageCheck('Email *')}
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
              label={languageCheck('Password *')}
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
          <Text style={styles.forgotPasswordText}>
            {languageCheck('Forgot password?')}
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={loginss} style={styles.loginContainer}>
            <View style={styles.loginIconView}>
              <Ionicons
                style={{marginLeft: wp('3%')}}
                name="log-in"
                size={25}
                color={'white'}
              />
            </View>
            <View style={styles.loginTextView}>
              {loadingButton ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>
                  {languageCheck('Login')}
                </Text>
              )}
            </View>
            <View
              style={{
                width: wp('15%'),
                height: hp('7%'),
              }}></View>
          </TouchableOpacity>
        </View>
        <View style={{...styles.ty, marginTop: hp('5')}}>
          <Text
            style={{
              fontSize: hp('1.6'),
              textAlign: 'center',
              color: '#512500',
            }}>
            {languageCheck('New on Moyen?')}
          </Text>
        </View>
        <TouchableOpacity
          style={{...styles.ty, marginTop: hp('0')}}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={{fontSize: 18, textAlign: 'center', color: '#E9691D'}}>
            {languageCheck('Create Account')}
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.faqContainer}
            onPress={() => navigation.navigate('FaqScreen')}>
            <Text style={styles.bottomText}>FAQ</Text>
          </TouchableOpacity>
          <Text style={{...styles.bottomText, textDecorationLine: 'none'}}>
            {' '}
            /{' '}
          </Text>
          <TouchableOpacity
            style={styles.privacyContainer}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
            <Text style={styles.bottomText}>
              {languageCheck('PrivacyPolicy')}
            </Text>
          </TouchableOpacity>
        </View>
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
