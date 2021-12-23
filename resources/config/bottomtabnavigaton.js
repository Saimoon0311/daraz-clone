import React from 'react';
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

const Tab = createBottomTabNavigator();

function MybottomTabs() {
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
          backgroundColor: '#FFDDC9',
          // paddingTop: hp('-2'),
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" color={color} size={hp('3')} />
          ),
          title: 'Home',
          tabBarLabelStyle: {
            fontSize: 15,
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
          // tabBarActiveTintColor:"yellow",
          // tabBarInactiveTintColor:"green",
          // tabBarActiveIconColor:"blue",
          tabBarIconStyle: {
            color: 'red',
          },
          title: 'Shop',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={cate}
      />
      {/* <BlurView   blurRadius={1} downsampleFactor={10} overlayColor={'rgba(0, 0, 255, .6)'}> */}
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
          title: 'Account',
          tabBarLabelStyle: {
            fontSize: 15,
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
          title: 'Cart',
          tabBarLabelStyle: {
            fontSize: 15,
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
          title: 'Search',
          tabBarLabelStyle: {
            fontSize: 15,
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
