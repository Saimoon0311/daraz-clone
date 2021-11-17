import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ADDTOCART,
  ADDTOWISHLIST,
  API_BASED_URL,
  Images_API,
  SUBCATPRODUCTDATA,
} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {getUserData} from '../../utils/utils';
import {color} from '../../config/color';
import {styles} from './style';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
  BubblesLoader,
} from 'react-native-indicator';
import AwesomeAlert from 'react-native-awesome-alerts';
import {HelperText, TextInput, RadioButton} from 'react-native-paper';
import {Radio} from 'native-base';

export default function checkOut({navigation}) {
  const [buttonState, setButtonState] = useState(1);
  const [checked, setChecked] = useState();
  const [value, setValue] = useState();

  const topButton = () => {
    return (
      <View style={styles.topMain}>
        <TouchableOpacity
          onPress={() => updateButtonState(1)}
          style={
            buttonState == 1 ? styles.topButtonActive : styles.topButtonInactive
          }>
          <Text
            style={
              buttonState == 1
                ? styles.topButtonActiveText
                : styles.topButtonInactiveText
            }>
            Delivery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateButtonState(2)}
          style={
            buttonState == 2 ? styles.topButtonActive : styles.topButtonInactive
          }>
          <Text
            style={
              buttonState == 2
                ? styles.topButtonActiveText
                : styles.topButtonInactiveText
            }>
            Payment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateButtonState(3)}
          style={
            buttonState == 3 ? styles.topButtonActive : styles.topButtonInactive
          }>
          <Text
            style={
              buttonState == 3
                ? styles.topButtonActiveText
                : styles.topButtonInactiveText
            }>
            Summary
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const header = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={30}
            color="#512500"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.te}>Check out</Text>
        <Ionicons name="cart" size={30} color="#FFDDC9" style={styles.icon} />
      </View>
    );
  };
  const updateButtonState = e => {
    setButtonState(e);
  };
  const accountDetails = () => {
    return (
      <>
        <Text style={styles.centerText}>Account Details</Text>
        <View style={{...styles.box, paddingBottom: 30}}>
          <TextInput
            label="Full Name *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Email *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Address One *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Address Two *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Region *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="State *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Number *"
            underlineColor="gray"
            keyboardType="number-pad"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="ZipCode *"
            keyboardType="number-pad"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
        </View>
      </>
    );
  };
  const deliveryMethod = () => {
    return (
      <>
        <Text style={styles.centerText}>Select Delivery Method</Text>
        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              value="Cash on Delivery"
              color={color.themColorPrimary}
              status={checked === 'Cash on Delivery' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Cash on Delivery')}
            />
            <Text style={styles.radioText}>Cash on Delivery</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              color={color.themColorPrimary}
              value="Card Payment"
              status={checked == 'Card Payment' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Card Payment')}
            />
            <Text style={styles.radioText}>Card Payment</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              value="EasyPaisa"
              color={color.themColorPrimary}
              status={checked == 'EasyPaisa' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('EasyPaisa')}
            />
            <Text style={styles.radioText}>EasyPaisa</Text>
          </View>
        </View>
      </>
    );
  };
  const totalPriceCard = () =>{
return(
  <View style={{...styles.box,paddingTop:hp('2.5')}}>
            <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
              <Text style={styles.subtotalText}>Sub Total</Text>
              <Text style={styles.subtotalPrice}>125</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
              <Text style={styles.subtotalText}>Sub Total</Text>
              <Text style={styles.subtotalPrice}>125</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
              <Text style={styles.subtotalText}>Sub Total</Text>
              <Text style={styles.subtotalPrice}>125</Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'black',
                marginTop: hp('1'),
                marginBottom:hp('1')
              }}
            />
                        <View style={{flexDirection: 'row',marginBottom:hp('1')}}>
              <Text style={{...styles.subtotalText,color:color.themColorPrimary}}>Sub Total</Text>
              <Text style={{...styles.subtotalPrice,color:color.themColorPrimary}}>125</Text>
            </View>
          </View>
)
  }
  return (
    <View style={styles.main}>
      {header()}
      {topButton()}
      <ScrollView>
        <View>
          {accountDetails()}
          {deliveryMethod()}
          {totalPriceCard()}
        </View>
      </ScrollView>
    </View>
  );
}
