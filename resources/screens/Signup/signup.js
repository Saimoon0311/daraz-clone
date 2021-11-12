import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {showMessage} from 'react-native-flash-message';
import action from '../../redux/action';
import {SIGNUP} from '../../config/url';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {color} from '../../config/color';

export default function Signup({navigation}) {
  const [loadingButton, setLoadingButton] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone_number, setPhone_number] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [cshow, setCshow] = useState(false);
  const handleClicks = () => setCshow(!cshow);
  const savedata = async () => {
    setLoadingButton(true);
    let netFlag = 0;
    await NetInfo.fetch('wifi').then(async state => {
      if (state.isConnected) {
        netFlag = 1;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username === null) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Your Name',
          });
          setLoadingButton(false);
        } else if (!email || reg.test(email) === false) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter The correct Email',
          });
          setLoadingButton(false);
        } else if (email === null) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Email',
          }),
            setLoadingButton(false);
        } else if (password === null) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Password',
          }),
            setLoadingButton(false);
        } else if (phone_number === null) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter Youe Number',
          }),
            setLoadingButton(false);
        } else if (password != confirm) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Please Enter The Correct Password',
          }),
            setLoadingButton(false);
        } else if (password.length <= 5) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'The password must be at least 6 characters',
          }),
            setLoadingButton(false);
        } else {
          setLoadingButton(true);
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
                ? (showMessage({
                    type: 'success',
                    icon: 'auto',
                    message: responseData[0].message,
                  }),
                  setLoadingButton(false))
                : (showMessage({
                    type: 'warning',
                    icon: 'auto',
                    message: responseData.email,
                  }),
                  setLoadingButton(false));
              setEmail('');
              setUsername('');
              setPhone_number('');
              setPassword('');
              setConfirm('');
              // console.log('jijijijjijjiji', responseData);
            })
            .done();
        }
      } else {
        setShowAlert(true);
        setLoadingButton(false);
      }
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 28.5,
          paddingRight: 25.5,
          paddingBottom: 100,
        }}>
        <View style={{backgroundColor: 'white'}}>
          <Text style={{marginBottom: 5}}></Text>
          <TextInput
            label="Enter Your Name *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%')}]}
            value={username}
            selectionColor="#FF7E33"
            onChangeText={text => setUsername(text)}
          />
          <Text style={{marginBottom: 5}}></Text>
          <TextInput
            label="Email *"
            style={[styles.te, {width: wp('75%')}]}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            selectionColor="#FF7E33"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={{marginBottom: 5}}></Text>
          <TextInput
            label="Number *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={[styles.te, {width: wp('75%')}]}
            keyboardType="number-pad"
            value={phone_number}
            selectionColor="#FF7E33"
            onChangeText={text => setPhone_number(text)}
          />
          <Text style={{marginBottom: 5}}></Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              label="Password *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('78%')}]}
              secureTextEntry={show ? false : true}
              value={password}
              selectionColor="#FF7E33"
              onChangeText={text => setPassword(text)}
            />
            <Ionicons
              onPress={handleClick}
              color={color.themColorPrimary}
              style={{top: 30}}
              size={25}
              name={show ? 'eye-outline' : 'eye-off-outline'}
            />
          </View>
          <Text style={{marginBottom: 5}}></Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              label="Confirm Password *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('78%')}]}
              secureTextEntry={cshow ? false : true}
              value={confirm}
              selectionColor="#FF7E33"
              onChangeText={text => setConfirm(text)}
            />
            <Ionicons
              onPress={handleClicks}
              color={color.themColorPrimary}
              style={{top: 30}}
              size={25}
              name={cshow ? 'eye-outline' : 'eye-off-outline'}
            />
          </View>
          <Text style={{marginBottom: 20.4}}></Text>
        </View>
        <View>
          {loadingButton ? (
            <OrientationLoadingOverlay
              visible={true}
              color="white"
              indicatorSize="large"
              messageFontSize={24}
              message="Loading..."
            />
          ) : (
            <TouchableOpacity
              onPress={savedata}
              style={{
                width: wp('80%'),
                height: hp('7%'),
                backgroundColor: '#FF7E33',
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 7,
                flexDirection: 'row',
                // alignItems:'center',
                // justifyContent:'center'
              }}>
              <View
                style={{
                  width: wp('15%'),
                  height: hp('7%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  style={{marginLeft: wp('3%')}}
                  name="mail"
                  size={20}
                  color={'white'}
                />
              </View>
              <View
                style={{
                  width: wp('60%'),
                  height: hp('7%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor:'red'
                }}>
                <Text
                  style={{
                    fontSize: hp('2.5%'),
                    color: 'white',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Create Account
                </Text>
              </View>
              <View
                style={{
                  width: wp('10%'),
                  height: hp('7%'),
                }}></View>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={styles.buts}>
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
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.ty}>
          <Text style={{fontSize: 14, textAlign: 'center', color: '#512500'}}>
            Aleardy Have An Account ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ty}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize: 18, textAlign: 'center', color: '#E9691D'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning!"
        message="You are not connected to the internet."
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </ScrollView>
  );
}
