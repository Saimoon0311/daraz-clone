import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  CART,
  CARTDELEtE,
  Images_API,
  testCART,
  USERDATA,
  USERPROFILEUPDATE,
} from '../../config/url';
import {getUserData, setItem,setUserData} from '../../utils/utils';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {HelperText, TextInput} from 'react-native-paper';
import {FormControl} from 'native-base';
import {KeyboardAwareScrollView} from 
'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Setting from '../Setting/setting';




export default function Userdeatils({navigation}) {
  const [userdataemail, setUserdataemail] = useState();
  // const [isLoading,setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [userDataLocal, setUserDataLocal] = useState();
  const [dummyState, setDummyState] = useState('Dummy');
  const [showAlert, setShowAlert] = useState(false);
  
  const getUserAllData = async () => {
    const userDatas = await getUserData();
    const users = userId.id;
    // console.log(31, userDatas);
    // console.log(286,users)
    //  fetch(`${USERDATA}/${users}`)
    //     .then((response) => response.json())
    //     .then( (json) =>  setUserdata(json),
    //      )
    //     .catch((error) => console.error(33,error))
    //       .finally(() => setLoading(false));
  };
  const ff=async()=>{
    const userDatas = await getUserData();
    console.log(99,userDatas)
  }
  const updatValue = (value, attribute) => {
    setDummyState(value);
    var data = userDataLocal;
    data[attribute] = value;
    setUserDataLocal(data);
  };
  const profileUpdate = () => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var data = JSON.stringify(
      userDataLocal
    )


    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };

    fetch(
      `${USERPROFILEUPDATE}/${userDataLocal?.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result?.message=="Profile Updated Successfully"){
          showMessage({
            type:"success",
            icon:"success",
            message:"Profile Updated Successfully"
          })
          console.log(106,result?.data)
          setLoadingButton(false)
          setUserData(result?.data)


          //  ff()
          
        }else{
          setShowAlert(true)
          setLoadingButton(false)
        }
        
      })
      .catch(error => {
        console.log('111', error),
        setShowAlert(false)
      });

    // fetch(USERPROFILEUPDATE,{
    //   method: 'PUT',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userData
    //   }),
    //  })
    //  .then((res)=>res.json())
    //  .then(json => {
    //    console.log(json)
    //  })
  };
  const ValidateProfileUpdate = () => {
    setLoadingButton(true)
    if (
      userDataLocal?.username !== '' &&
      userDataLocal?.phone_number !== '' &&
      userDataLocal?.city !== '' &&
      userDataLocal?.address_one !== '' &&
      userDataLocal?.address_two !== '' &&
      userDataLocal?.email !== '' &&
      userDataLocal?.zipcode !== '' &&
      userDataLocal?.country !== ''
    ) {
      profileUpdate();
    } else {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'This field can not be empty',
      }),
      setLoadingButton(false)
    }
  };
  useEffect(() => {
    (async () => {
      const userDatas = await getUserData();
      // setUserdataemail(userDatas.email)
      // getUserAllData()
      setUserDataLocal(userDatas);
      // console.log(44, userDatas);
      // console.log(52, userData);
    })();
  }, []);
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFDDC9',
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 10,
          shadowRadius: 6,
          elevation: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#512500',
            fontWeight: 'bold',
            marginTop: 25,
          }}>
          User Profile
        </Text>
        <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon} />
      </View>

      <ScrollView>
        <View style={styles.mainpage}>
          <View style={styles.page}>
            <Text
              style={{
                // textAlign: 'Left',
                fontSize: wp('6%'),
                color: color.defaultcolor,
                fontWeight: 'bold',
              }}>
              Account Details
            </Text>
          </View>
          <View style={styles.inputContainers}>
            <TextInput
              label="Username *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="default"
              value={userDataLocal?.username}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'username');
              }}
            />
            <TextInput
              label="Phone Number *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="number-pad"
              value={userDataLocal?.phone_number}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'phone_number');
              }}
            />
            <TextInput
              label="City *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="default"
              value={userDataLocal?.city}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'city');
              }}
            />
            <TextInput
              label="Address One *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="default"
              value={userDataLocal?.address_one}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'address_one');
              }}
            />
            <TextInput
              label="Address Two *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="default"
              value={userDataLocal?.address_two}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'address_two');
              }}
            />
            <TextInput
              label="Email address *"
              underlineColor="gray"
              editable={false}
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="email-address"
              value={userDataLocal?.email}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'email');
              }}
            />
            <TextInput
            
              label="Zip Code *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="numeric"
              value={JSON?.stringify(userDataLocal?.zipcode)}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(Number(text), 'zipcode');
              }}
            />
            <TextInput
              label="Country *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              value={userDataLocal?.country}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'country');
              }}
            />

            <TouchableOpacity
              onPress={() => ValidateProfileUpdate()}
              style={{
                width: wp('50%'),
                height: hp('6%'),
                backgroundColor: '#FF7E33',
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 7,
                flexDirection: 'row',
                // marginBottom: hp('100%'),
                // alignItems:'center',
                // justifyContent:'center'
              }}>
              <View
                style={{
                  width: wp('10%'),
                  height: hp('6%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  style={{marginLeft: wp('3%')}}
                  name="checkmark-circle-sharp"
                  size={20}
                  color={'white'}
                />
              </View>
              <View
                style={{
                  width: wp('30%'),
                  height: hp('6%'),
                  paddingLeft: wp('4'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor:'red'
                }}>
                {loadingButton ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text
                    style={{
                      fontSize: hp('2%'),
                      color: 'white',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    Update Profile
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: wp('10%'),
                  height: hp('6%'),
                }}></View>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </ScrollView>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning!"
        message="Some thing want wrong."
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
    </View>
  );
}

// {/* {isLoading?<ActivityIndicator size={100} color="#512500" />:
// <Text>name</Text> */}
// {/* // <Text>{userdata[0].username}</Text> */}
