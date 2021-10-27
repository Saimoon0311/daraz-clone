import React, {useState} from 'react';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import NetInfo from "@react-native-community/netinfo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import action from '../../redux/action';
import {LOGIN} from '../../config/url';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
export default function Login() {
  const[loadingButton,setLoadingButton] =useState(false)
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const {email, password} = state;
  const updateState = data => setState(() => ({...state, ...data}));
  const [isShow, setisShow] = useState(false);
  const loginss = async () => {
    setLoadingButton(true)
    let netFlag     =   0;
    await NetInfo.fetch("wifi").then(async state =>  {
      if (state.isConnected)  {
          netFlag     =   1;
          if (email == '') {
            showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Please enter yor email',
              }) ,setLoadingButton(false)
              
            } else if (password == '') {
              showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Please enter you password',
              }),setLoadingButton(false)
            }
             else {
              try {
              const  res  = await action.login({
                  email,
                  password,
                })
                console.log('res=== 83', res);
                if(res[0].message=="Email not found"){
                  showMessage({
                    type:"danger",
                    icon:"danger",
                    message:res[0].message
                  })
                  setLoadingButton(false)
                     console.log('res=== 86 ', res);
                } else if(res[0].message=="Password is incorrect"){
                  showMessage({
                    type:"danger",
                    icon:"danger",
                    message:res[0].message
                  })
                  setLoadingButton(false)
                   console.log('res=== 86 ', res);
              }
                else{
      
                  showMessage({
                    type: 'success',
                    icon: 'success',
                    message: 'User Login Success',
                  });
                setLoadingButton(false)
                }
                }
            catch (error) {
              console.log('errot', error);
              showMessage(error.message);
            }
            
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
      });
    
      // }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 28.5,
          paddingRight: 27.5,
          paddingBottom: 100,
        }}>
        <View style={{backgroundColor: 'white'}}>
          <Text style={{marginBottom: 30.4}}></Text>
          <TextInput
            label="Email"
            style={styles.te}
            onChangeText={email => updateState({email})}
          />
          <Text style={{marginBottom: 30.4}}></Text>
          <TextInput
            label="Password"
            style={styles.te}
            selectionColor="#FF7E33"
            secureTextEntry={true}
            onChangeText={password => updateState({password})}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={{
              paddingTop: 36.5,
              color: '#B64400',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Forget Your Password?
          </Text>
        </TouchableOpacity>
        <View>
              {loadingButton?  <OrientationLoadingOverlay
          visible={true}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="Loading..."
          />:
          <TouchableOpacity style={styles.but} onPress={loginss}>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Ionicons name="mail" size={18} color={'white'} />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 90}}>
              <Text
                style={{
                  fontSize: hp("2%"),
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
              
            </View>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.buts}>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Ionicons name="logo-facebook" size={18} color={'white'} />
            </View>
            <View style={{justifyContent: 'center', marginLeft: wp("12%")}}>
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
            Now on Moyen?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ty}>
          <Text style={{fontSize: 18, textAlign: 'center', color: '#E9691D'}}>
            Create Account
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
    width: wp('80%'),
    backgroundColor: '#FF7E33',
    height: hp('6%'),
    marginTop: 30,
    borderRadius: 10,
  },
  buts: {
    flexDirection: 'row',
    marginLeft: 10,
    width: wp('80%'),
    backgroundColor: '#1873EB',
    height: hp('6%'),
    marginTop: 30,
    borderRadius: 10,
  },
  ty: {
    marginTop: 31,
  },
  input:{
    flexDirection:"row"
  },
  indicator:{
    marginTop:35
  }
});

// try {
//   const res = await action.login({
//     email,
//     password,
//   });
//   console.log('res=== ', res);
//   showMessage({
//     type: 'success',
//     icon: 'success',
//     message: 'User Login Success',
//   })
// } catch (error) {
//   console.log('errot', error);
//   showMessage(error.message);
// }
