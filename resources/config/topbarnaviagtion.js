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
<<<<<<< HEAD
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
=======
>>>>>>> 04a43ecae21d5b9d80ee9c8f9dadf7c8537478de
import {languageCheck} from '../config/languageChecker';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
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
          title: `${languageCheck('Login')}`,
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
