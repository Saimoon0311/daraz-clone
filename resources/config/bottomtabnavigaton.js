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
import {languageCheck} from '../config/languageChecker';
import {useSelector} from 'react-redux';
import {TourGuideZoneByPosition} from 'rn-tourguide';

const Tab = createBottomTabNavigator();

function MybottomTabs() {
  const iconProps = {size: 40, color: '#888'};

  const [dummy, setDummy] = useState(1);
  const {languageType} = useSelector(state => state.languageType);
  useEffect(() => {
    setDummy(1);
  }, [languageType]);
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
          title: languageCheck('Home'),
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
          title: languageCheck('Shop'),
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
            <>
              <TourGuideZoneByPosition
                zone={3}
                text={'You can change Language and currency from your setting.'}
                shape={'rectangle_and_keep'}
                isTourGuide
                bottom={Platform.OS == 'ios' ? hp('-3') : hp('-6')}
                width={wp('8')}
                height={hp('7')}
                left={Platform.OS == 'ios' ? wp('6') : wp('6')}
                // iconProps
                // borderRadius={16}
              />
              <Ionicons
                {...iconProps}
                name="person"
                color={color}
                size={hp('3')}
              />
            </>
          ),
          title: languageCheck('Account'),
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
          title: languageCheck('Cart'),
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
          title: languageCheck('Search'),
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
