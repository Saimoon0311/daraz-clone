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
import Order from '../screens/Order/order';
import setting from '../screens/Setting/setting';
import {color} from '../config/color';

const Tab = createBottomTabNavigator();

function MybottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#E9691D',
        tabBarInactiveTintColor: '#512500',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarActiveBackgroundColor: '#FFDDC9',
        tabBarInactiveBackgroundColor: '#FFDDC9',
        tabBarStyle: {
          height: hp(Platform?.OS == 'ios' ? '10%' : '8%'),
          backgroundColor: '#FFDDC9',
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" color={color} size={20} />
          ),
          title: 'Home',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: hp('1%'),
          },
        }}
        component={Home}
      />

      <Tab.Screen
        name="cate"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="list" color={color} size={30} />
          ),
          // tabBarActiveTintColor:"yellow",
          // tabBarInactiveTintColor:"green",
          // tabBarActiveIconColor:"blue",
          tabBarIconStyle: {
            color: 'red',
          },
          title: 'Category',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: hp('1%'),
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
            <Ionicons name="settings-sharp" color={color} size={25} />
          ),
          title: 'Setting',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: hp('1%'),
          },
        }}
        component={setting}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;
