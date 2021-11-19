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
  const [Deliverychecked, setDeliverychecked] = useState();
  const [value, setValue] = useState();
  const [text, setText] = useState('');

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
        <Text style={styles.te}>Check Out</Text>
        <Ionicons
          name="cart"
          size={30}
          color="#512500"
          style={{
            ...styles.icon,

            marginRight: wp('3'),
          }}
        />
      </View>
    );
  };
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
            value={text}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            onChangeText={e => setText(e)}
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
          <TouchableOpacity onPress={() => setDeliverychecked('Door Delivery')}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="Door Delivery"
                color={color.themColorPrimary}
                status={
                  Deliverychecked === 'Door Delivery' ? 'checked' : 'unchecked'
                }
              />
              <Text style={styles.radioText}>Door Delivery</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              ...styles.devider,
              width: wp('75'),
              alignSelf: 'center',
              backgroundColor: '#C8C8C8',
            }}
          />
          <TouchableOpacity onPress={() => setDeliverychecked('Self Pickup')}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                color={color.themColorPrimary}
                value="Self Pickup"
                status={
                  Deliverychecked == 'Self Pickup' ? 'checked' : 'unchecked'
                }
              />
              <Text style={styles.radioText}>Self Pickup</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const totalPriceCard = () => {
    return (
      <View style={{...styles.box, paddingTop: hp('2.5')}}>
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
        <View style={styles.devider} />
        <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
          <Text style={{...styles.subtotalText, color: color.themColorPrimary}}>
            Sub Total
          </Text>
          <Text
            style={{...styles.subtotalPrice, color: color.themColorPrimary}}>
            125
          </Text>
        </View>
      </View>
    );
  };
  const renderScreen = () => {
    if (buttonState == 1) {
      return (
        <View>
          {accountDetails()}
          {deliveryMethod()}
        </View>
      );
    } else if (buttonState == 2) {
      return <View>{paymentMethod()}</View>;
    } else if (buttonState == 3) {
      return (
        <View>
          {accountDetailsSummy()}
          {deliveryMethod()}
          {paymentMethod()}
        </View>
      );
    }
  };
  const paymentMethod = () => {
    return (
      <>
        <Text style={styles.centerText}>Select Payment Method</Text>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => setChecked('Direct Bank Transfer')}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="Direct Bank Transfer"
                color={color.themColorPrimary}
                status={
                  checked === 'Direct Bank Transfer' ? 'checked' : 'unchecked'
                }
              />
              <Text style={styles.radioText}>Direct Bank Transfer</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              ...styles.devider,
              width: wp('75'),
              alignSelf: 'center',
              backgroundColor: '#C8C8C8',
            }}
          />
          <TouchableOpacity onPress={() => setChecked('Cash on Delivery')}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                color={color.themColorPrimary}
                value="Cash on Delivery"
                status={checked == 'Cash on Delivery' ? 'checked' : 'unchecked'}
              />
              <Text style={styles.radioText}>Cash on Delivery</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              ...styles.devider,
              width: wp('75'),
              alignSelf: 'center',
              backgroundColor: '#C8C8C8',
            }}
          />
          <TouchableOpacity onPress={() => setChecked('PayPal')}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                color={color.themColorPrimary}
                value="PayPal"
                status={checked == 'PayPal' ? 'checked' : 'unchecked'}
              />
              <Text style={styles.radioText}>PayPal</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              ...styles.devider,
              width: wp('75'),
              alignSelf: 'center',
              backgroundColor: '#C8C8C8',
            }}
          />
          <TouchableOpacity onPress={() => setChecked('Check Payment')}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                color={color.themColorPrimary}
                value="Check Payment"
                status={checked == 'Check Payment' ? 'checked' : 'unchecked'}
              />
              <Text style={styles.radioText}>Check Payment</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const accountDetailsSummy = () => {
    return (
      <>
        <Text style={styles.centerText}>Account Details</Text>
        <View style={{...styles.box, paddingBottom: 30}}>
          <TextInput
            label="Full Name *"
            underlineColor="gray"
            editable={false}
            value={text}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            // onChangeText={e => setText(e)}
          />
          <TextInput
            label="Email *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Address One *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Address Two *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Region *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="State *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="Number *"
            editable={false}
            underlineColor="gray"
            keyboardType="number-pad"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          />
          <TextInput
            label="ZipCode *"
            editable={false}
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
  const bottomButton = () => {
    return (
      <>
        {totalPriceCard()}
        <TouchableOpacity style={styles.maior}>
          <Text style={styles.or}>Proceed to payment</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.main}>
      {header()}
      {topButton()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderScreen()}
        {bottomButton()}
      </ScrollView>
    </View>
  );
}
