import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/login';
import Signup from '../screens/Signup/signup';
import MyTabs from './topbarnaviagtion';
import mainstack from '../navigation/mainstack';
import {useSelector} from 'react-redux';
import MybottomTabs from './bottomtabnavigaton';
import Details from '../screens/Product details/productdetails';
import Cart from '../screens/Cart/cart';
import Cartdetails from '../screens/Cardetails/cartdeatils';
import Arrivals from '../data/arrivals';
import Userdeatils from '../screens/Userdetails/userdetails';
import subcatdetails from '../screens/Sub Cat Product details/subcat';
import changepassword from '../screens/Change password/changepassword';
import checkOut from '../screens/CheckOut/checkout';
import OrderDetails from '../screens/OrderDetails/OrderDetails';
import Home from '../screens/Home/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnBoardScreen/OnboardingScreen';
import Faq from '../screens/faq/Faq';
import PrivacyPolicy from '../screens/privacyPolicy/PrivacyPolicy';

// import Home from "../screens/"
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  const userData = useSelector(state => state.auth.userData);
  const [isLoggedIn, setIsLoggedIn] = useState();
  // console.log('26', userData);

  useEffect(() => {
    (async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
      await checkStatus();
    })();
  }, []);

  const checkStatus = async () => {
    if (Object.keys(userData).length === 0) {
      // console.log(29);
      setIsLoggedIn(false);
    } else if (Object.keys(userData).length > 0) {
      // console.log(29);
      setIsLoggedIn(true);
    }
  };

  return (
    isAppFirstLaunched != null && (
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {/* {!!userData && userData.id ? (
        <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
      ) : (
        <>
          <Stack.Screen
            options={{
              title: 'Sign In',
              headerShown: true,
              headerStyle: {
                backgroundColor: '#FFDDC9',
              },
              headerTintColor: '#512500',

              headerTitleStyle: {
                fontSize: 18,
              },
            }}
            name="MyTabs"
            component={MyTabs}
          />
        </>
      )} */}

        {/* <Stack.Screen name="Home" component={Home} /> */}
        {/* <Stack.Screen
        options={{
          title: 'Sign In',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFDDC9',
          },
          headerTintColor: '#512500',
          headerTitleStyle: {
            fontSize: 18,
          },
        }}
        name="MyTabs"
        component={MyTabs}
      /> */}
        {isAppFirstLaunched && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicy} />
        <Stack.Screen name="FaqScreen" component={Faq} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Cartdetails" component={Cartdetails} />
        <Stack.Screen name="Userdeatils" component={Userdeatils} />
        <Stack.Screen name="subcatdetails" component={subcatdetails} />
        <Stack.Screen name="changepassword" component={changepassword} />
        <Stack.Screen name="checkOut" component={checkOut} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen
          options={{
            title: 'Login / Register',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#FFDDC9',
            },
            headerTintColor: '#512500',
            headerTitleStyle: {
              fontSize: 18,
            },
          }}
          name="MyTabs"
          component={MyTabs}
        />
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    )
  );
}
