import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/home';
import Deal from '../screens/Deal/deal';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
  Platform,
} from 'react-native';
import cate from '../screens/Catergory/catagery';
import Order from '../screens/OrderDetails/OrderDetails';
import setting from '../screens/Setting/setting';
import {color} from '../config/color';
import seacrhScreen from '../screens/SeacrhScreen/seacrScreen';
import Cart from '../screens/Cart/cart';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const Tab = createBottomTabNavigator();

function MybottomTabs() {
  const [dummy, setDummy] = useState(1);

  const translationGetters = {
    en: () => require('../config/Translate/en.json'),
    fr: () => require('../config/Translate/fr.json'),
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
  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange());
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange());
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#512500',
        // tabBarInactiveTintColor: '#512500',
        // tabBarInactiveTintColor: '#E9691D',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarStyle: {
          height: hp(Platform?.OS == 'ios' ? '10%' : '8%'),
          backgroundColor: 'white',
          // paddingTop: hp('-2'),
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" color={color} size={hp('3')} />
          ),
          title: translate('Home'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={Home}
      />

      <Tab.Screen
        name="cate"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="list" color={color} size={hp('3')} />
          ),
          tabBarIconStyle: {
            color: 'red',
          },
          title: translate('Shop'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={cate}
      />
      {/* <Tab.Screen
        name="Deal"
        options={{
          tabBarIcon: () => {
            return <Ionicons name="pricetags" color="#512500" size={25} />;
          },
          title: 'Deal',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
        component={Deal}
      /> */}
      {/* </BlurView> */}
      <Tab.Screen
        name="setting"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="person" color={color} size={hp('3')} />
          ),
          title: translate('Account'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={setting}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="cart" color={color} size={hp('3')} />
          ),
          title: translate('Cart'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={Cart}
      />
      <Tab.Screen
        name="seacrhScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="search" color={color} size={hp('3')} />
          ),
          title: translate('Search'),
          tabBarLabelStyle: {
            fontSize: hp('1.8'),
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={seacrhScreen}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;
