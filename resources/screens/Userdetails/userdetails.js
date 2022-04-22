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
  Platform,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  CARTDELETE,
  GETALLCURRENCY,
  Images_API,
  SETCURRENCYVALUE,
  testCART,
  USERDATA,
  USERPROFILEUPDATE,
} from '../../config/url';
import {getUserData, setItem, setUserData} from '../../utils/utils';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {HelperText, TextInput} from 'react-native-paper';
import {FormControl} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import Setting from '../Setting/setting';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export default function Userdeatils({navigation}) {
  const c = console.log.bind(console);
  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();
  const [dummy, setDummy] = useState(1);

  const translationGetters = {
    en: () => require('../../config/Translate/en.json'),
    fr: () => require('../../config/Translate/fr.json'),
  };
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );
  const setI18nConfig = async () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

    translate.cache.clear();

    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
  };
  const handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => setDummy(dummy + 1))
      .catch(error => {
        console.error(error);
      });
  };

  const [userdataemail, setUserdataemail] = useState();
  // const [isLoading,setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [userDataLocal, setUserDataLocal] = useState();
  const [dummyState, setDummyState] = useState('Dummy');
  const [showAlert, setShowAlert] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [currencyDefaultValue, setCurrencyDefaulValue] = useState({});
  const [pickerCurrency, setPickerCurrency] = useState({});

  const getUserAllData = async () => {
    const userDatas = await getUserData();
    const users = userId.id;
  };
  const ff = async () => {
    const userDatas = await getUserData();
  };
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

    var data = JSON.stringify(userDataLocal);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };

    fetch(`${USERPROFILEUPDATE}/${userDataLocal?.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.message == 'Profile Updated Successfully') {
          showMessage({
            type: 'success',
            icon: 'success',
            message: translate('Profile Updated Successfully'),
            backgroundColor: '#E9691D',
          });
          setLoadingButton(false);
          setUserData(result?.data);
        } else {
          setShowAlert(true);
          setLoadingButton(false);
        }
      })
      .catch(error => {
        setShowAlert(false);
      });
  };
  const ValidateProfileUpdate = () => {
    setLoadingButton(true);
    if (
      userDataLocal?.username !== '' &&
      userDataLocal?.username !== null &&
      userDataLocal?.phone_number !== '' &&
      userDataLocal?.phone_number !== null &&
      userDataLocal?.city !== '' &&
      userDataLocal?.city !== null &&
      userDataLocal?.address_one !== '' &&
      userDataLocal?.address_one !== null &&
      userDataLocal?.address_two !== '' &&
      userDataLocal?.address_two !== null &&
      userDataLocal?.email !== '' &&
      userDataLocal?.email !== null &&
      userDataLocal?.zipcode !== '' &&
      userDataLocal?.zipcode !== null &&
      userDataLocal?.country !== '' &&
      userDataLocal?.country !== null
    ) {
      profileUpdate();
    } else {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: translate('This field can not be empty'),
        backgroundColor: '#E9691D',
      }),
        setLoadingButton(false);
    }
  };
  const getAllCurrency = () => {
    fetch(GETALLCURRENCY)
      .then(res => res.json())
      .then(json => {
        setCurrency(json);
      })
      .catch(e => console.log(e));
  };
  const updateCurrencyValue = e => {
    console.log(177, e);
    if (e.id != null) {
      var url = SETCURRENCYVALUE + userDataLocal.id + '/' + e.id;
      fetch(url, {
        method: 'POST',
        redirect: 'follow',
      })
        .then(res => res.json())
        .then(async json => {
          if (json.message == 'Updated Successfully') {
            console.log(180, json);
            setUserData(json?.data);
            setCurrencyDefaulValue(json.data.currency);
            showMessage({
              type: 'success',
              icon: 'success',
              message: 'Currency updated successfully',
              backgroundColor: '#FF7E33',
            });
          } else {
            console.log('kjabdjkabjfkadblkjb');
          }
        });
    }
  };
  useEffect(() => {
    (async () => {
      RNLocalize.addEventListener('change', handleLocalizationChange());
      const userDatas = await getUserData();
      setUserDataLocal(userDatas);
      console.log(197, userDatas);
      setCurrencyDefaulValue(userDatas.currency);
      console.log(199, currencyDefaultValue);
      getAllCurrency();
    })();
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange());
    };
  }, []);

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFDDC9',
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 3},
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
          height: hp(Platform?.OS == 'ios' ? '10' : '9'),
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={35}
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
            marginTop: hp(Platform?.OS == 'ios' ? '5.5' : '3.5'),
          }}>
          {translate('User Profile')}
        </Text>
        <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('20')}}>
        <View style={styles.mainpage}>
          <View style={styles.page}>
            <Text
              style={{
                fontSize: wp('6%'),
                color: color.defaultcolor,
                fontWeight: 'bold',
              }}>
              {translate('Account Details')}
            </Text>
          </View>
          <View style={styles.inputContainers}>
            <TextInput
              label={translate('Username *')}
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
              label={translate('Phone Number *')}
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
              label={translate('City *')}
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
              label={translate('Address One *')}
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
              label={translate('Address Two *')}
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
              label={translate('Email address *')}
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
              label={translate('Zip Code *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              keyboardType="numeric"
              value={userDataLocal?.zipcode}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'zipcode');
              }}
            />

            <TextInput
              label={translate('Country *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={[styles.te, {width: wp('80%')}]}
              value={userDataLocal?.country}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'country');
              }}
            />
            {currency.length > 0 && (
              <Picker
                mode="dialog"
                selectedValue={pickerCurrency}
                onValueChange={e => {
                  setPickerCurrency(e);
                  setTimeout(() => {
                    updateCurrencyValue(e);
                  }, 1000);
                }}
                collapsable={true}
                style={styles.pickerStyle}>
                <Picker.Item
                  key={currencyDefaultValue?.id}
                  value={currencyDefaultValue}
                  label={currencyDefaultValue?.code}
                />
                {currency?.map(res => {
                  return (
                    currencyDefaultValue?.code != res.code && (
                      <Picker.Item
                        key={res?.id}
                        value={res}
                        label={res?.code}
                      />
                    )
                  );
                })}
              </Picker>
            )}

            <TouchableOpacity
              onPress={() => ValidateProfileUpdate()}
              style={styles.updateContainer}>
              <View style={styles.updateInnerView}>
                <Ionicons
                  style={{marginLeft: wp('3%')}}
                  name="checkmark-circle-sharp"
                  size={20}
                  color={'white'}
                />
              </View>
              <View style={styles.touchCenterView}>
                {loadingButton ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.updateText}>
                    {translate('Update Profile')}
                  </Text>
                )}
              </View>
              <View
                style={{
                  width: wp('10%'),
                  height: hp('6%'),
                }}></View>
            </TouchableOpacity>
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
