/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Component, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  LogBox,
  Linking,
} from 'react-native';
import Navigation from './resources/config/naviagtion';
import {NavigationContainer} from '@react-navigation/native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from 'react-native-flash-message';
import {Provider, useDispatch} from 'react-redux';
import {store, persistor} from './resources/redux/store';
import {getUserData} from './resources/utils/utils';
import {saveUserData} from './resources/redux/action/auth';
import NetInfo from '@react-native-community/netinfo';
import {checkVersionUrl, StripePKey} from './resources/config/url';
import {StripeProvider, initStripe} from '@stripe/stripe-react-native';
import {PersistGate} from 'redux-persist/integration/react';
import AppTwo from './AppTwo';
import DeviceInfo from 'react-native-device-info';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function App({navigation}) {
  const version = DeviceInfo.getVersion();
  const [checkVersionStatus, setCheckVersionStatus] = useState(false);
  const [versionControl, setVersionControl] = useState('');
  var url =
    Platform.OS == 'ios'
      ? 'https://apps.apple.com/pk/app/moyenxpress/id1604623592'
      : 'http://play.google.com/store/apps/details?id=com.ecoders';
  // console.log(45, version);
  var status;
  const checkVersion = () => {
    fetch(checkVersionUrl)
      .then(res => res.json())
      .then(data => {
        setVersionControl(data[0]);
        if (Platform.OS == 'ios') {
          status = data[0].ios_version === version ? false : true;
          setCheckVersionStatus(status);
          // console.log(61, status, checkVersionStatus, data[0].ios_version);
        } else if (Platform.OS == 'android') {
          status = data[0].android_version === version ? false : true;
          setCheckVersionStatus(status);
          // console.log(61, status, checkVersionStatus, data[0].android_version);
        }
      })
      .catch(err => {
        console.log(60, err);
      });
  };
  useEffect(() => {
    checkVersion();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppTwo />
        <AwesomeAlert
          show={checkVersionStatus}
          showProgress={false}
          title="Warning!"
          message={versionControl?.title}
          contentContainerStyle={{width: wp('80%')}}
          closeOnTouchOutside={false}
          titleStyle={{color: 'black'}}
          messageStyle={{color: 'gray'}}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Update"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            Linking.openURL(url);
          }}
        />
      </PersistGate>
    </Provider>
  );
}

export default App;
