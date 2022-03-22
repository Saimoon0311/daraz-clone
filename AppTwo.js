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

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    // margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDDC9',
    flex: 1,
  },
});

function AppTwo({navigation}) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const time = () => {
    if (Platform?.OS == 'android') {
      return 2000;
    } else {
      return 2000;
    }
  };

  const initializeStripe = () => {
    initStripe({
      publishableKey: StripePKey,
      // merchantIdentifier: 'merchant.identifier',
    });
  };

  useEffect(async () => {
    (async () => {
      initializeStripe();
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      LogBox.ignoreAllLogs(true);
      const userData = await getUserData();
      if (!!userData) {
        saveUserData(userData, dispatch);
      }
    })();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);
  {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('./resources/images/Component2.png')}
            style={{width: 150, height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );

    return (
      // <Provider store={store}>
      //   <PersistGate loading={null} persistor={persistor}>
      <>
        {isVisible === true ? (
          Splash_Screen
        ) : (
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        )}
        <FlashMessage position="top" />
      </>
      //   </PersistGate>
      // </Provider>
    );
  }
}

export default AppTwo;
