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
import {Radio, NativeBaseProvider} from 'native-base';

export default function checkOut({navigation, route}) {
  var itemOrder = route?.params?.screenData;
  const [buttonState, setButtonState] = useState(1);
  const [checked, setChecked] = useState();
  const [Deliverychecked, setDeliverychecked] = useState();
  const [value, setValue] = useState();
  const [text, setText] = useState('');
  const [deliveryMethodValue, setDeliveryMethodValue] = useState(null);
  const [orderdata, setOrderdata] = useState();
  const [paymentMethodValue, setPaymentMethodValue] = useState(null);
  const [userDataLocal, setUserDataLocal] = useState();
  const [dummyState, setDummyState] = useState('Dummy');
  const [productIdArray, setProductIdArray] = useState([]);
  const [shopIdArray] = useState([]);
  const [quantityArray, setQuantityArray] = useState([]);
  const [attributesArray, setAttributesArray] = useState([]);

  const data = route?.params?.screenData;

  const updatValue = (value, attribute) => {
    setDummyState(value);
    var data = userDataLocal;
    data[attribute] = value;
    setUserDataLocal(data);
  };

  useEffect(() => {
    (async () => {
      const userDatas = await getUserData();
      setUserDataLocal(userDatas);
      makeArrays();
      // console.log(64, route?.params?.screenData);
    })();
  }, []);

  const makeArrays = () => {
    makeProductIdArray();
    makeShopIdArray();
    makeQuantityArray();
    makeAttributesArray();
  };

  const makeProductIdArray = () => {
    for (let index = 0; index < data?.length; index++) {
      productIdArray[index] = data[index]?.get_products?.id;
    }
  };
  const makeShopIdArray = () => {
    for (let index = 0; index < data?.length; index++) {
      shopIdArray[index] = data[index]?.get_products?.shop_id;
    }
  };

  const makeQuantityArray = () => {
    for (let index = 0; index < data?.length; index++) {
      quantityArray[index] = data[index]?.quantity;
    }
  };

  const makeAttributesArray = () => {
    for (let index = 0; index < data?.length; index++) {
      attributesArray[index] = data[index]?.attributes;
    }
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
        <Text style={styles.te}>Check Out</Text>
        <Ionicons
          name="cart"
          size={30}
          color="#FFDDC9"
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
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            value={userDataLocal?.username}
            onChangeText={text => {
              updatValue(text, 'username');
            }}
          />

          <TextInput
            label="Address One *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
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
            style={styles.text}
            value={userDataLocal?.address_two}
            selectionColor="#FF7E33"
            onChangeText={text => {
              updatValue(text, 'address_two');
            }}
          />
          <TextInput
            label="City *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            keyboardType="default"
            value={userDataLocal?.city}
            selectionColor="#FF7E33"
            onChangeText={text => {
              updatValue(text, 'city');
            }}
          />
          <TextInput
            label="Country *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            value={userDataLocal?.country}
            selectionColor="#FF7E33"
            onChangeText={text => {
              updatValue(text, 'country');
            }}
          />
          <TextInput
            label="Number *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            keyboardType="number-pad"
            value={userDataLocal?.phone_number}
            selectionColor="#FF7E33"
            onChangeText={text => {
              updatValue(text, 'phone_number');
            }}
          />
          <TextInput
            label="ZipCode *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            keyboardType="numeric"
            value={
              userDataLocal?.zipcode == null
                ? null
                : JSON?.stringify(userDataLocal?.zipcode)
            }
            // value={JSON?.stringify(userDataLocal?.zipcode)}
            selectionColor="#FF7E33"
            onChangeText={text => {
              updatValue(Number(text), 'zipcode');
            }}
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
          <NativeBaseProvider>
            <Radio.Group
              value={deliveryMethodValue}
              onChange={nextValue => {
                setDeliveryMethodValue(nextValue);
              }}
              colorScheme={'orange'}>
              <Radio value="Door Delivery" my={1}>
                <Text style={styles.radioText}>Door Delivery</Text>
              </Radio>
              <View
                style={{
                  ...styles.devider,
                  width: wp('75'),
                  alignSelf: 'center',
                  backgroundColor: '#C8C8C8',
                }}
              />
              <Radio value="Self Pickup" my={1}>
                <Text style={styles.radioText}>Self Pickup</Text>
              </Radio>
            </Radio.Group>
          </NativeBaseProvider>
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
        <View
          style={{
            ...styles.devider,
            width: wp('75'),
            alignSelf: 'center',
            backgroundColor: '#C8C8C8',
          }}
        />
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
          <NativeBaseProvider>
            <Radio.Group
              value={paymentMethodValue}
              onChange={nextValue => {
                console.log(318, nextValue);
                setPaymentMethodValue(nextValue);
              }}
              colorScheme={'orange'}>
              <Radio value="Direct Bank Transfer" my={1}>
                <Text style={styles.radioText}>Direct Bank Transfer</Text>
              </Radio>
              <View
                style={{
                  ...styles.devider,
                  width: wp('75'),
                  alignSelf: 'center',
                  backgroundColor: '#C8C8C8',
                }}
              />
              <Radio value="Cash on Delivery" my={1}>
                <Text style={styles.radioText}>Cash on Delivery</Text>
              </Radio>
              <View
                style={{
                  ...styles.devider,
                  width: wp('75'),
                  alignSelf: 'center',
                  backgroundColor: '#C8C8C8',
                }}
              />
              <Radio value="PayPal" my={1}>
                <Text style={styles.radioText}>PayPal</Text>
              </Radio>
              <View
                style={{
                  ...styles.devider,
                  width: wp('75'),
                  alignSelf: 'center',
                  backgroundColor: '#C8C8C8',
                }}
              />
              <Radio value="Check Payment" my={1}>
                <Text style={styles.radioText}>Check Payment</Text>
              </Radio>
            </Radio.Group>
          </NativeBaseProvider>
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
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />

          <TextInput
            label="Address One *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
          <TextInput
            label="Address Two *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
          <TextInput
            label="City *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            value={userDataLocal?.city}
            selectionColor="#FF7E33"
          />
          <TextInput
            label="State *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
          <TextInput
            label="Number *"
            editable={false}
            underlineColor="gray"
            keyboardType="number-pad"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
          <TextInput
            label="ZipCode *"
            editable={false}
            keyboardType="number-pad"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
        </View>
      </>
    );
  };
  const orderDetailsRenderdata = () => {
    return (
      <>
        <Text style={styles.centerText}>Order Items</Text>
        <View style={{...styles.box}}>{orderDetailsAlldata()}</View>
      </>
    );
  };
  const quantityCalculate = (quantity, prices) => {
    var totlaPrice = quantity * prices;
    return totlaPrice;
  };
  const orderDetailsAlldata = () => {
    return itemOrder?.map(res => {
      var itemQuantity = res?.quantity;
      var itemPrice = res?.get_products?.price;
      var discountedPrice = res?.get_products?.discounted_price;
      return (
        <>
          <View style={{flexDirection: 'row', marginBottom: hp('0.5')}}>
            <Text style={{...styles.subtotalText, fontWeight: 'normal'}}>
              {res?.get_products?.name} x {res?.quantity}{' '}
            </Text>
            <Text style={styles.subtotalPrice}>
              {res?.get_products?.is_discounted == 2 ? (
                <>
                  <Text style={{textDecorationLine: 'line-through'}}>
                    {itemPrice}{' '}
                  </Text>
                  {quantityCalculate(itemQuantity, discountedPrice)}
                </>
              ) : (
                quantityCalculate(itemQuantity, itemPrice)
              )}
            </Text>
          </View>
          <View
            style={{
              ...styles.devider,
              width: wp('80'),
              marginTop: hp('0'),
              marginBottom: hp('1'),
              backgroundColor: '#C8C8C8',
            }}
          />
        </>
      );
    });
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
        {orderDetailsRenderdata()}
        {bottomButton()}
      </ScrollView>
    </View>
  );
}
