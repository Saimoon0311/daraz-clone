import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { HelperText, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import action from "../redux/action";

export default function Login() {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [state,setState] =useState({
        email :"",
        password :""
    })
    const {email,password} =state
     const updateState =(data) =>setState (()=> ({...state,...data}))
     const loginss =async()=>{
         if (email=="") {
             return(
                 showMessage({
                     type:"danger",
                     icon:"danger",
                     message:"Please enter yor name"
                 })
             )
         } else if(password==""){
             showMessage({
                 type:"danger",
                 icon:"danger",
                 message:"Please enter you password"
             })
         }else{
         try {
             const res = await action.login({
                 email,
                 password

             })
             console.log("res=== ",res)
             showMessage({
                 type:"success",
                 icon:"success",
                 message:"User Login Success"
             })
         } catch (error) {
             console.log("errot",error)
             showMessage(error.message)
         
            }  
         }
     }
    // const onChangeText = text => setText(text);

    // const hasErrors = () => {
    //     return !text.includes('@');
    // };
    return (
        <ScrollView>
            <View style={{ backgroundColor: "white", paddingLeft: 28.5, paddingRight: 27.5, paddingBottom: 100 }}>
                <View style={{ backgroundColor: "white" }}>
                    <Text style={{ marginBottom: 30.4 }}></Text>
                    <TextInput label="Email" style={styles.te}  onChangeText={(email) => updateState({email})} />
                    <Text style={{ marginBottom: 30.4 }}></Text>
                    <TextInput label="Password" style={styles.te} selectionColor="#FF7E33" secureTextEntry={true} onChangeText={(password) => updateState({password})} />
                </View>
                <TouchableOpacity>
                    <Text style={{ paddingTop: 36.5, marginLeft: "auto", color: "#B64400", fontSize: 14, fontWeight: "bold" }} >Forget Your Password?</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={styles.but} onPress={loginss} >
                        <View style={{ marginLeft: 20, justifyContent: "center" }}>
                            <Ionicons name="mail" size={18} color={"white"} />
                        </View>
                        <View style={{ justifyContent: "center", marginLeft: 107 }} >
                            <Text style={{ fontSize: 18, textAlign: "center", color: "white", fontWeight: "bold" }} >Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buts} >
                        <View style={{ marginLeft: 20, justifyContent: "center" }}>
                            <Ionicons name="logo-facebook" size={18} color={"white"} />
                        </View>
                        <View style={{ justifyContent: "center", marginLeft: 42 }} >
                            <Text style={{ fontSize: 18, textAlign: "center", color: "white", fontWeight: "bold" }} >Connect With Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.ty} >
                    <Text style={{ fontSize: 14, textAlign: "center", color: "#512500" }} >Now on Moyen?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ty} >
                    <Text style={{ fontSize: 18, textAlign: "center", color: "#E9691D" }} >Create Account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    te: {
        backgroundColor: "white",
    },
    but: {
        flexDirection: "row",
        marginLeft: 10,
        width: 334,
        backgroundColor: "#FF7E33",
        height: 41,
        marginTop: 30,
        borderRadius: 10
    },
    buts: {
        flexDirection: "row",
        marginLeft: 10,
        width: 334,
        backgroundColor: "#1873EB",
        height: 41,
        marginTop: 30,
        borderRadius: 10
    },
    ty: {
        marginTop: 31
    }
});