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
  // console.log(41,route?.params?.screenData)
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
  // console.log(53,itemOrder?.get_products)
  console.log(53, itemOrder[0]?.get_products);

  // setOrderdata(itemOrder)
  // console.log(55,orderdata)
  const updatValue = (value, attribute) => {
    setDummyState(value);
    var data = userDataLocal;
    data[attribute] = value;
    setUserDataLocal(data);
    console.log(55, userDataLocal);
  };

  useEffect(() => {
    (async () => {
      const userDatas = await getUserData();
      setUserDataLocal(userDatas);
    })();
  }, []);

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
            // value={text}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            value={userDataLocal?.username}
            // onChangeText={e => setText(e)}
            onChangeText={text => {
              updatValue(text, 'username');
            }}
          />
          {/* <TextInput
            label="Email *"
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          /> */}
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
            //             onChangeText={email => updateState({email})}
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
            //             onChangeText={email => updateState({email})}
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
            //             onChangeText={email => updateState({email})}
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
            //             onChangeText={email => updateState({email})}
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
            //             onChangeText={email => updateState({email})}
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
          {/* <TouchableOpacity onPress={() => setDeliverychecked('Door Delivery')}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="Door Delivery"
                uncheckedColor={color.themColorPrimary}
                color={color.themColorPrimary}
                onPress={() => setDeliverychecked('Door Delivery')}
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
                onPress={() => setDeliverychecked('Self Pickup')}
                color={color.themColorPrimary}
                value="Self Pickup"
                uncheckedColor={color.themColorPrimary}
                status={
                  Deliverychecked == 'Self Pickup' ? 'checked' : 'unchecked'
                }
              />
              <Text style={styles.radioText}>Self Pickup</Text>
            </View>
          </TouchableOpacity> */}
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
            {/* <View
              style={{
                ...styles.devider,
                width: wp('75'),
                alignSelf: 'center',
                backgroundColor: '#C8C8C8',
              }}
            />
            <Radio value="Check Payment" my={1}>
              <Text style={styles.radioText}>Check Payment</Text>
            </Radio> */}
          </NativeBaseProvider>
          {/* <TouchableOpacity onPress={() => setChecked('Direct Bank Transfer')}>
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
          </TouchableOpacity> */}
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
            // onChangeText={e => setText(e)}
          />
          {/* <TextInput
            label="Email *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            //             onChangeText={email => updateState({email})}
          /> */}
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
            label="City *"
            editable={false}
            underlineColor="gray"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            value={userDataLocal?.city}
            selectionColor="#FF7E33"
            onChangeText={text => {
              updatValue(text, 'city');
            }}
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
    // console.log(603,totlaPrice);
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
            {/* {console.log(628,res?.get_products?.id)} */}
            {console.log(629,res?.get_products?.shop_id)}
            {console.log(630,res?.product_id)}

          </View>
          <View
            style={{
              ...styles.devider,
              width: wp('80'),
              marginTop: hp('0'),
              marginBottom: hp('1'),
              // alignSelf: 'center',
              backgroundColor: '#C8C8C8',
            }}
          />
        </>
      );

      // <Text  style={styles.subtotalText} >{res?.get_products?.name}</Text>;
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

        {/* <Text style={styles.centerText}>Account Details</Text>
 <View style={{...styles.box, paddingBottom: 30}} >
   <View>
     {console.log(617,orderdata?.get_products)}
   <Text style={{color:"black"}} > {itemOrder?.get_products?.name} </Text>
 </View>
 </View> */}
        {orderDetailsRenderdata()}
        {bottomButton()}
      </ScrollView>
    </View>
  );
}

// [{"attributes": ["Black", "30"], "created_at": "2021-11-19T10:49:12.000000Z", "get_products": {"child_category_id": 20, "created_at": "2021-08-20T13:23:52.000000Z", "deleted_at": null, "description": "testtest123testqwerty123", "discounted_percentage": 25, "discounted_price": 1499, "featured": 1, "has_variations": 1,
// "id": 111, "images": [Array], "is_discounted": 2, "name": "Casual Wear", "price":
// 1999, "reviews": [Array], "shop_id": 16,
// "sku": "1627607833", "slug": "casual-wear-16-1634762451-20-612", "status": 1, "stock": 185, "updated_at": "2021-11-19T10:25:49.000000Z"}, "id": 412, "is_wishlisted": true, "product_id": 111, "quantity": 1, "updated_at": "2021-11-19T10:49:12.000000Z", "user_id": 130, "user_ip": null}]

// 41 [{"attributes": ["Black", "30"], "created_at": "2021-11-19T10:49:12.000000Z", "get_products": {"child_category_id": 20, "created_at": "2021-08-20T13:23:52.000000Z", "deleted_at": null, "description": "testtest123testqwerty123", "discounted_percentage": 25, "discounted_price": 1499, "featured": 1, "has_variations": 1,
// "id": 111, "images": [Array], "is_discounted": 2, "name": "Casual Wear", "price":
// 1999, "reviews": [Array], "shop_id": 16,
// "sku": "1627607833", "slug": "casual-wear-16-1634762451-20-612", "status": 1, "stock": 185, "updated_at": "2021-11-19T10:25:49.000000Z"}, "id": 412, "is_wishlisted": true, "product_id": 111, "quantity": 1, "updated_at": "2021-11-19T10:49:12.000000Z", "user_id": 130, "user_ip": null}, {"attributes": ["Yellow", "Medium"], "created_at": "2021-11-22T11:07:10.000000Z", "get_products": {"child_category_id": 50, "created_at": "2021-08-20T08:08:22.000000Z", "deleted_at": null, "description": "Test Description", "discounted_percentage": 10, "discounted_price": 585, "featured": 1, "has_variations": 1, "id": 105, "images": [Array], "is_discounted": 2, "name": "Orla Gay", "price": 650, "reviews": [Array], "shop_id": 16, "sku": "1688775486", "slug": "orla-gay-16-1629497220-50-209", "status": 1, "stock": 43, "updated_at":
// "2021-11-18T08:40:36.000000Z"}, "id": 416, "product_id": 105, "quantity": 1, "updated_at": "2021-11-22T11:07:10.000000Z", "user_id": 130, "user_ip": null}]













// 53 {"child_category_id": 70, "created_at": "2021-08-20T13:26:47.000000Z", "deleted_at": null, "description": "Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
// a type specimen book.a", "discounted_percentage": 5, "discounted_price": 664, "featured": 1, "has_variations": 1, "id": 112, "images": [{"created_at": "2021-08-20T13:26:47.000000Z", "deleted_at": null, "id": 147, "name": "162949840720.jpg", "product_id": 112, "updated_at": "2021-08-20T13:26:47.000000Z"}, {"created_at": "2021-08-20T13:26:47.000000Z", "deleted_at": null, "id": 148, "name": "16294984073.jpg", "product_id": 112, "updated_at": "2021-08-20T13:26:47.000000Z"}], "is_discounted": 2, "name": "Blue Tshirt", "price": 699, "reviews": [], "shop_id": 16, "sku": "1623784777", "slug": "blue-tshirt-16-1629758854-70-117", "status": 1, "stock": 195, "updated_at": "2021-11-16T18:24:14.000000Z"}