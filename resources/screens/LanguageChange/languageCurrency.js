import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {showMessage} from 'react-native-flash-message';
import {color} from '../../config/color';
import {styles} from './style';
import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';
import {GETALLCURRENCY, SETCURRENCYVALUE} from '../../config/url';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import {getUserData, setItem, setUserData} from '../../utils/utils';
import {BubblesLoader} from 'react-native-indicator';
import LocalizedStrings from 'react-native-localization';
import {languageCheck} from '../../config/languageChecker';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../redux/type';

export default function languageChange({navigation}) {
  const dispatch = useDispatch();
  const {languageType} = useSelector(state => state.languageType);
  const c = console.log.bind(console);
  c(34, languageType);
  const [dummy, setDummy] = useState(1);
  const [currency, setCurrency] = useState([]);
  const [pickerCurrency, setPickerCurrency] = useState({});
  const [currencyDefaultValue, setCurrencyDefaulValue] = useState({});
  const [loadingPicker, setLoadingPicker] = useState(true);
  const [userDataLocal, setUserDataLocal] = useState();
  const [pickerLanguage, setPickerLanguage] = useState();

  const updateCurrencyValue = e => {
    // console.log(177, e);
    if (e.id != null) {
      var url = SETCURRENCYVALUE + userDataLocal.id + '/' + e.id;
      fetch(url, {
        method: 'POST',
        redirect: 'follow',
      })
        .then(res => res.json())
        .then(async json => {
          if (json.message == 'Updated Successfully') {
            // console.log(180, json);
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
  const getAllCurrency = () => {
    fetch(GETALLCURRENCY)
      .then(res => res.json())
      .then(json => {
        setCurrency(json);
        setLoadingPicker(false);
      })
      .catch(e => console.log(e));
  };
  const updateLanguageValue = e => {
    var en = {
      code: 'en',
      label: 'English',
    };
    var fr = {
      code: 'fr',
      label: 'French',
    };
    var selectedValue = e == 'fr' ? fr : en;
    dispatch({
      type: types.CHANGELANGUAGE,
      payload: selectedValue,
    });
  };
  useEffect(() => {
    (async () => {
      const userDatas = await getUserData();
      setUserDataLocal(userDatas);
      setCurrencyDefaulValue(userDatas.currency);
      getAllCurrency();
    })();
  }, []);
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="#94725f" />
      <View style={styles.headerMainView}>
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
          {languageCheck('Language/Currency')}
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
                fontSize: wp('5'),
                color: color.defaultcolor,
                fontWeight: 'bold',
              }}>
              {languageCheck('LanguageChange')}
            </Text>
          </View>
          <View style={styles.inputContainers}>
            {!loadingPicker ? (
              <Picker
                mode="dialog"
                onValueChange={e => {
                  //   setPickerCurrency(e);
                  setTimeout(() => {
                    updateLanguageValue(e);
                  }, 1000);
                }}
                collapsable={true}
                style={styles.pickerStyle}>
                <Picker.Item
                  key={languageType?.code}
                  value={languageType?.code}
                  label={languageType?.label}
                />
                <Picker.Item
                  key={languageType?.code == 'en' ? 'fr' : 'en'}
                  value={languageType?.code == 'en' ? 'fr' : 'en'}
                  label={languageType?.code == 'en' ? 'French' : 'English'}
                />
              </Picker>
            ) : (
              <View style={{alignSelf: 'center', marginTop: hp('2')}}>
                <BubblesLoader size={50} color="#512500" dotRadius={10} />
              </View>
            )}
          </View>
          <View style={styles.page}>
            <Text
              style={{
                fontSize: wp('5'),
                color: color.defaultcolor,
                fontWeight: 'bold',
              }}>
              {languageCheck('Currency Change')}
            </Text>
          </View>
          <View style={styles.inputContainers}>
            {!loadingPicker ? (
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
            ) : (
              <View style={{alignSelf: 'center', marginTop: hp('2')}}>
                <BubblesLoader size={50} color="#512500" dotRadius={10} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
