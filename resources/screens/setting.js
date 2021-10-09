import React from "react"
import {View,Text,Alert,Button} from "react-native"
import { useSelector } from 'react-redux';
import actions from '../redux/action';

export default function setting (){
    const onLogoutAlert = () => {
        Alert.alert(
            'Logout',
            'Are you sure, yout want to logout from this device',
            [{ text: 'Yes', onPress: logout }, { text: 'No', }],
            { cancelable: true }
        )
    }
    const logout = () => {
        
        setTimeout(() => {
            actions.logout()
            
        }, 2000);

    }
    return(
        <View>
            <Text>
                <Button title="log out" onPress={onLogoutAlert} />
            </Text>
        </View>
    )
}