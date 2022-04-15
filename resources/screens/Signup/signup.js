import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {HelperText, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {showMessage} from 'react-native-flash-message';
import action from '../../redux/action';
import {SIGNUP} from '../../config/url';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {color} from '../../config/color';
import {useDispatch} from 'react-redux';
import {Platform} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export default function Signup({navigation}) {
  const [dummy, setDummy] = useState(1);

  const translationGetters = {
    en: () => require('../../config/Translate/en.json'),
    fr: () => require('../../config/Translate/fr.json'),
  };
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  const setI18nConfig = async () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

    translate.cache.clear();

    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
  };
  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => setDummy(dummy + 1))
      .catch(error => {
        console.error(error);
      });
  };
  const [loadingButton, setLoadingButton] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [cshow, setCshow] = useState(false);
  const [appUrl, setAppUrl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const handleClicks = () => setCshow(!cshow);
  const dispatch = useDispatch();
  const savedata = async () => {
    setLoadingButton(true);
    let netFlag = 0;
    var res;
    await NetInfo.fetch('wifi').then(async state => {
      if (state.isConnected) {
        netFlag = 1;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (
          username == null &&
          username == '' &&
          password == null &&
          password == '' &&
          phone_number == null &&
          phone_number == ''
        ) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Complete all feilds',
            backgroundColor: '#E9691D',
          });
          setLoadingButton(false);
        } else if (!email || reg.test(email) === false) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter The Correct Email',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else if (password != confirm) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter The Correct Password',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else if (password.length <= 5) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'The password must be at least 6 characters',
            backgroundColor: '#E9691D',
          }),
            setLoadingButton(false);
        } else {
          setLoadingButton(true);
          fetch(SIGNUP, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
              phone_number,
            }),
          })
            .then(response => response.json())
            .then(async responseData => {
              console.log(119, responseData);

              const prop = responseData?.email ? 'email' : 'phone_number';
              if (responseData[0]?.message == 'User Created Successfully') {
                showMessage({
                  type: 'success',
                  icon: 'auto',
                  message: responseData[0]?.message,
                  backgroundColor: '#E9691D',
                });
                setLoadingButton(false);
                res = await action.login(
                  {
                    email,
                    password,
                  },
                  navigation,
                  dispatch,
                );
                setTimeout(() => {
                  navigation.goBack();
                }, 1500);
              } else if (responseData?.email) {
                showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: responseData?.email[0],
                  backgroundColor: '#E9691D',
                });
                setLoadingButton(false);
              } else if (responseData?.phone_number) {
                showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: responseData?.phone_number[0],
                  backgroundColor: '#E9691D',
                });
                setLoadingButton(false);
              } else {
                showMessage({
                  type: 'warning',
                  icon: 'auto',
                  message: translate('Something went wrong.'),
                  backgroundColor: '#E9691D',
                });
                setLoadingButton(false);
              }
            })
            .catch(err => {
              console.log(165, err);
              showMessage({
                type: 'warning',
                icon: 'auto',
                message: translate('Something went wrong.'),
                backgroundColor: '#E9691D',
              });
              setLoadingButton(false);
            });
        }
      } else {
        setShowAlert(true);
        setLoadingButton(false);
      }
    });
  };
  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange());

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange());
    };
  }, []);
  // const appViewPage = () => {
  //   {
  //     appUrl && (
  //       <Modal
  //         animationType="slide"
  //         onRequestClose={() => {
  //           setIsVisible(false);
  //         }}
  //         visible={isVisible}>
  //         <WebView
  //           style={{height: hp('50'), width: wp('100')}}
  //           source={{uri: appUrl}}
  //           javaScriptEnabled={true}
  //           domStorageEnabled={true}
  //           startInLoadingState={false}
  //           // style={{marginTop: 20}}
  //         />
  //       </Modal>
  //     );
  //   }
  // };
  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: color.primaryBackground,
          paddingLeft: 28.5,
          paddingRight: 25.5,
          paddingBottom: 100,
        }}>
        <View
          style={{
            backgroundColor: color.primaryBackground,
          }}>
          <TextInput
            label={translate('Enter Your Name*')}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%'), marginTop: hp('5')}]}
            value={username}
            selectionColor="#FF7E33"
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            label={translate('Email *')}
            style={[styles.te, {width: wp('75%')}]}
            underlineColor="gray"
            autoCapitalize="none"
            theme={{colors: {primary: color.themColorPrimary}}}
            selectionColor="#FF7E33"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label={translate('Number')}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%')}]}
            keyboardType="number-pad"
            value={phone_number}
            selectionColor="#FF7E33"
            onChangeText={text => setPhone_number(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <TextInput
              label={translate('Password *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('75%')}]}
              secureTextEntry={show ? false : true}
              value={password}
              selectionColor="#FF7E33"
              onChangeText={text => setPassword(text)}
            />
            <Ionicons
              onPress={handleClick}
              color={color.themColorPrimary}
              style={{top: 30}}
              size={25}
              name={show ? 'eye-outline' : 'eye-off-outline'}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              label={translate('Confirm Password *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('75%')}]}
              secureTextEntry={cshow ? false : true}
              value={confirm}
              selectionColor="#FF7E33"
              onChangeText={text => setConfirm(text)}
            />
            <Ionicons
              onPress={handleClicks}
              color={color.themColorPrimary}
              style={{top: 30}}
              size={25}
              name={cshow ? 'eye-outline' : 'eye-off-outline'}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => savedata()}
            style={styles.createAccountButton}>
            <View style={styles.innerView}>
              <Ionicons
                style={{marginLeft: wp('3%')}}
                name="create"
                size={25}
                color={'white'}
              />
            </View>
            <View style={styles.createAccountView}>
              {loadingButton ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.createAccountText}>
                  {translate('Create Account')}
                </Text>
              )}
            </View>
            <View
              style={{
                width: wp('10%'),
                height: hp('7%'),
              }}></View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.buts}>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Ionicons name="logo-facebook" size={18} color={'white'} />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 35}}>
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
        <View style={{...styles.ty, marginTop: hp('3')}}>
          <View style={styles.ty}>
            <Text style={{fontSize: 14, textAlign: 'center', color: '#512500'}}>
              {translate('Already Have An Account ?')}
            </Text>
          </View>

          <TouchableOpacity
            style={{...styles.ty, marginTop: hp('0')}}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: 18, textAlign: 'center', color: '#E9691D'}}>
              {translate('Login')}
            </Text>
          </TouchableOpacity>
        </View>
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
            <Text style={styles.bottomText}>{translate('PrivacyPolicy')}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      {/* {appViewPage()} */}
    </ScrollView>
  );
}
