/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './resources/config/naviagtion';
import { NavigationContainer } from '@react-navigation/native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './resources/redux/store';
import { getUserData } from './resources/utils/utils';



function App() {
  useEffect(()=>{
    (
      async()=>{
      const userData = await getUserData()
      console.log("user data App.js",userData)
    //   if(!!userData){
    //     saveUserData(userData)
    //   }  
    })
    // ();
      
  },[])
  return (
    <Provider store={store} > 
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    <FlashMessage/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
