import React, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NetInfo from "@react-native-community/netinfo";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {showMessage} from 'react-native-flash-message';
import action from '../../redux/action';
import {SIGNUP} from '../../config/url';

export default function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone_number, setPhone_number] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const savedata = async () => {
    let netFlag     =   0;
    await NetInfo.fetch("wifi").then( async state =>  {
        if (state.isConnected)  {
            netFlag     =   1;
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (username === null) {
              showMessage({
                type: 'warning',
                icon: 'warning',
                message: 'Please Enter Your Name',
              });
            } else if (!email || reg.test(email) === false) {
              showMessage({
                type: 'warning',
                icon: 'warning',
                message: 'Please Enter The correct Email',
              });
            } else if (email === null) {
              Alert.alert('Warning!', 'Please Enter Email');
            } else if (password === null) {
              Alert.alert('Warning!', 'Please Enter Password');
            } else if (phone_number === null) {
              Alert.alert('Warning!', 'Please Enter Your Number');
            } else if (password != confirm) {
              Alert.alert('Warning!', 'Please Enter The Correct Password');
            } else if (password.length <= 5) {
              Alert.alert('Warning!', 'The password must be at least 6 characters');
            } else {
        
              fetch(SIGNUP, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username,
                  email,
                  password,
                  phone_number,
                }),
              })
                // console.log("res=== ",res)
                .then(response => response.json())
                .then(responseData => {
                  responseData[0]
                    ? showMessage({
                        type: 'success',
                        icon: 'auto',
                        message: responseData[0].message,
                      })
                    : showMessage({
                        type: 'warning',
                        icon: 'auto',
                        message: responseData.email,
                      });
                  setEmail('');
                  setUsername('');
                  setPhone_number('');
                  setPassword('');
                  setConfirm('');
                  console.log('jijijijjijjiji', responseData);
                })
                .done();
            }
      
          }
      
      
          else{
            const title = 'Wifi Status';
            const message = 'Warning, Please Check Your Internet Connection...';
            const emptyArrayButtons = [];
            const alertOptions = {
              cancelable: true,
            };
            Alert.alert(title, message, emptyArrayButtons, alertOptions);
        }
      
      
      })





   
  };
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 28.5,
          paddingRight: 27.5,
          paddingBottom: 100,
        }}>
        <View style={{backgroundColor: 'white'}}>
          <Text style={{marginBottom: 20.4}}></Text>
          <TextInput
            label="Enter You Name Name*"
            style={styles.te}
            value={username}
            selectionColor="#FF7E33"
            onChangeText={text => setUsername(text)}
          />
          <Text style={{marginBottom: 20.4}}></Text>
          <TextInput
            label="Email*"
            style={styles.te}
            selectionColor="#FF7E33"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={{marginBottom: 20.4}}></Text>
          <TextInput
            label="Number*"
            style={styles.te}
            keyboardType="number-pad"
            value={phone_number}
            selectionColor="#FF7E33"
            onChangeText={text => setPhone_number(text)}
          />
          <Text style={{marginBottom: 20.4}}></Text>
          <TextInput
            label="Password*"
            style={styles.te}
            secureTextEntry={true}
            value={password}
            selectionColor="#FF7E33"
            onChangeText={text => setPassword(text)}
          />
          <Text style={{marginBottom: 20.4}}></Text>
          <TextInput
            label="Confirm Password*"
            style={styles.te}
            secureTextEntry={true}
            value={confirm}
            selectionColor="#FF7E33"
            onChangeText={text => setConfirm(text)}
          />
          <Text style={{marginBottom: 20.4}}></Text>
        </View>
        <View>
          <TouchableOpacity style={styles.but} onPress={savedata}>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Ionicons name="mail" size={18} color={'white'} />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 60}}>
              <Text
                style={{
                  fontSize: hp("2%"),
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Create Account
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buts}>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Ionicons name="logo-facebook" size={18} color={'white'} />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 35}}>
              <Text
                style={{
                  fontSize: hp("2%"),
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Connect With Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.ty}>
          <Text style={{fontSize: 14, textAlign: 'center', color: '#512500'}}>
            Aleardy Have An Account ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ty}>
          <Text style={{fontSize: 18, textAlign: 'center', color: '#E9691D'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  te: {
    backgroundColor: 'white',
  },
  but: {
    flexDirection: 'row',
    marginLeft: 10,
    width: wp('80%') ,
    backgroundColor: '#FF7E33',
    height:hp("6%"),
    marginTop: 30,
    borderRadius: 10,
  },
  buts: {
    flexDirection: 'row',
    marginLeft: 10,
    width: wp('80%') ,
    backgroundColor: '#1873EB',
    height:hp("6%"),
    marginTop: 30,
    borderRadius: 10,
  },
  ty: {
    marginTop: 31,
  },
});
