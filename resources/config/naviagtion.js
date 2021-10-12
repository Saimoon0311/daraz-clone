import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/login"
import Signup from '../screens/signup';
import MyTabs from './topbarnaviagtion';
import mainstack from '../navigation/mainstack';
import { useSelector } from 'react-redux';
// import userData from "../redux/reducer/auth"
import Home from "../screens/home"
import Deal from "../screens/deal"
import cate from "../screens/catagery"
import order from "../screens/order"
import setting from "../screens/setting"
import MybottomTabs from './bottomtabnavigaton';
import Details from '../screens/productdetails';
import Cart from '../screens/cart';

// import Home from "../screens/"
const Stack = createNativeStackNavigator();


export default function Navigation() {
    const userData = useSelector((state)=>state.auth.userData)
    console.log ("userdata ", userData)
    return (
        
        <Stack.Navigator
            screenOptions={({
                headerTitleAlign: "center",
                headerShown: false
            })}   
        >
            {/*  */}
           {!! userData && userData.id?
               <Stack.Screen  name="MybottomTabs" component={MybottomTabs} />
           :
           <>      
        <Stack.Screen options={{
            title: 'Sign In',
            headerShown:true,
            headerStyle: {
                backgroundColor: '#FFDDC9',

            },
            headerTintColor: '#512500',

            headerTitleStyle: {
                // fontWeight: 'bold',
                fontSize: 18


            },
        }} name="MyTabs" component={MyTabs} />
        </>
        } 
        <Stack.Screen name="Details" component={Details}  />
        <Stack.Screen name="Cart" component={Cart}  />
           
        </Stack.Navigator>
    );
}