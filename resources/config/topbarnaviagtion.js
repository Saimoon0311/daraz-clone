import React from 'react';
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
          title: 'Create Account',
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
