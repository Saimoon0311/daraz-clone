import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/home"
import Deal from "../screens/deal";
import {View,Text,FlatList,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,Image,Linking} from 'react-native';
import cate from "../screens/catagery";
import Order from "../screens/order";
import setting from "../screens/setting";

const Tab = createBottomTabNavigator();





function MybottomTabs() {
    return (
      <Tab.Navigator 
      
      
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard:true,
          tabBarActiveTintColor:"#512500",
          tabBarInactiveTintColor:"#919191",
          swipeEnabled:true,
          animationEnabled:true,
          tabBarActiveBackgroundColor:"#FFDDC9",
          tabBarInactiveBackgroundColor:"#FFDDC9",
          tabBarIcon:{
              
          }
        })}
  
      >
        <Tab.Screen name="Home" 
        options={{ tabBarIcon: () => ( <Ionicons name="home" color="#512500"
        size={20} /> )
         ,title:"Home",
         tabBarLabelStyle:{
            fontSize:15,
          fontWeight:"bold"
                 },
         }}   component={Home}  />
  
  
        <Tab.Screen name="cate" options={{ tabBarIcon: () => (<Ionicons name="list" color="#512500" size={30}  /> )
         ,title:"Category",
         tabBarLabelStyle:{
            fontSize:15,
          fontWeight:"bold"
                 },
         }}    component={cate}/>
  {/* <BlurView   blurRadius={1} downsampleFactor={10} overlayColor={'rgba(0, 0, 255, .6)'}> */}
               <Tab.Screen name="Deal" options={{ tabBarIcon: () => {return(
                     <Ionicons name="pricetags" color="#512500"
                     size={25}  />
                      )} 
                ,title:"Deal",
                tabBarLabelStyle:{
         fontSize:15,
         fontWeight:"bold"
                },
         
         }}    component={Deal} />
  {/* </BlurView> */}
        <Tab.Screen name="setting" options={{ tabBarIcon: () => ( <Ionicons name="settings-sharp" color="#512500"
        size={25}  /> )
         ,title:"Setting",
         tabBarLabelStyle:{
            fontSize:15,
          fontWeight:"bold"
                 },
         }}    component={setting} />
      </Tab.Navigator>
    );
  }
  export default MybottomTabs