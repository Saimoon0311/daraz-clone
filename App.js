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
import {StripePKey} from './resources/config/url';
import {StripeProvider, initStripe} from '@stripe/stripe-react-native';
import {PersistGate} from 'redux-persist/integration/react';
import AppTwo from './AppTwo';

function App({navigation}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppTwo />
      </PersistGate>
    </Provider>
  );
}

export default App;
