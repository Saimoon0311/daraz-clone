
import React from "react"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Signup from "../screens/signup";
import Login from "../screens/login";
import { style } from "styled-system";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
        
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#E9691D",
                tabBarActiveBackgroundColor: "#E9691D",
                tabBarInactiveTintColor: "black",
                indicatorStyle: {
                    color: "red"
                },
            })}

        >
            <Tab.Screen name="Login"
            
                options={{
                    title: "Login",
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        // : {

                        // }
                    },
                }}
                component={Login} />


    
            <Tab.Screen name="Signup" component={Signup} />
        </Tab.Navigator>
    );
}