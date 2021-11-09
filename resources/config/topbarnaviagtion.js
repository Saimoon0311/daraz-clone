
import React from "react"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Signup from "../screens/Signup/signup";
import Login from "../screens/Login/login";
import { style } from "styled-system";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from "../config/color"

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
        
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#E9691D",
                tabBarActiveBackgroundColor: "#E9691D",
                tabBarInactiveTintColor: "black",
                tabBarIndicatorStyle:{
                 backgroundColor:"#E9691D"
                },
            })}

        >
            <Tab.Screen name="Login"
            
                options={{
                    // title: "Login",
                    // headerShown:true,
                    headerStyle: {
                        backgroundColor: '#FFDDC9',
                    },
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        // : {

                        // }
                    },
                }}
                component={Login} />


    
            <Tab.Screen name="Signup" options={{
                    title: "Create Account",
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        // : {

                        // }
                    },
                }} component={Signup} />
        </Tab.Navigator>
    );
}