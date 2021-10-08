import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/login"
import Signup from '../screens/signup';
import MyTabs from './topbarnaviagtion';
import mainstack from '../navigation/mainstack';
import { useSelector } from 'react-redux';
// import userData from "../redux/reducer/auth"
// import Home from "../screens/"
const Stack = createNativeStackNavigator();


export default function Navigation() {
    const userData = useSelector((state)=>state.auth.userData)
    console.log ("userdata ", userData)
    return (
        
        <Stack.Navigator
            screenOptions={({
                headerTitleAlign: "center",
                // headerShown: false
            })}   
        >
            {/*  */}
           {!! userData && userData.id? mainstack(Stack):      
        <Stack.Screen options={{
            title: 'Sign In',
            headerStyle: {
                backgroundColor: '#FFDDC9',

            },
            headerTintColor: '#512500',

            headerTitleStyle: {
                // fontWeight: 'bold',
                fontSize: 18


            },
        }} name="MyTabs" component={MyTabs} />
        
        } 
           
        </Stack.Navigator>
    );
}