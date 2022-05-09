import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Signup from '../screens/Signup/signup';
import Login from '../screens/Login/login';
import {style} from 'styled-system';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const [dummy, setDummy] = useState(1);

  const translationGetters = {
    en: () => require('../config/Translate/en.json'),
    fr: () => require('../config/Translate/fr.json'),
  };
  const languageCheck = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  const setI18nConfig = async () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

    languageCheck.cache.clear();

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
  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange());
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange());
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarActiveTintColor: 'red',
        tabBarActiveTintColor: '#512500',
        // tabBarActiveBackgroundColor: 'red',
        tabBarActiveBackgroundColor: '#E9691D',
        tabBarInactiveTintColor: '#512500',
        upperCaseLabel: false,
        tabBarStyle: {
          backgroundColor: color.primaryTabBackground,
        },
        tabBarIndicatorStyle: {
          // backgroundColor: 'red',
          backgroundColor: '#512500',
        },
      })}>
      <Tab.Screen
        name="Login"
        options={{
          title: languageCheck('Login'),
          headerStyle: {
            backgroundColor: 'red',
            // color: 'black',
            // backgroundColor: '#FFDDC9',
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: hp('2'),
          },
        }}
        component={Login}
      />

      <Tab.Screen
        name="Signup"
        options={{
          title: languageCheck('Create Account'),
          tabBarLabelStyle: {
            // backgroundColor: 'blue',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: hp('2'),
          },
        }}
        component={Signup}
      />
    </Tab.Navigator>
  );
}
