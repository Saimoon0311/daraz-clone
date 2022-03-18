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
  Platform,
  Modal,
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
  ORDERPLACE,
  SUBCATPRODUCTDATA,
  StripePKey,
  GETCLIENTSECRET,
  SENDINTENTANDORDERDATA,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';

export default function checkOut({navigation, route}) {
  var itemOrder = route?.params?.screenData;
  var itemTotalPrice = route?.params?.totalPrice;
  var total = itemTotalPrice;
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
  const [note, setNote] = useState('');
  const [objectArray, setObjectArray] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [stripeData, setStripeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [accessToken, setAccessToken] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  //ADD localhost address of your server
  const API_URL =
    Platform?.OS == 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

  const {
    confirmPayment,
    initPaymentSheet,
    presentPaymentSheet,
    retrievePaymentIntent,
    retrieveSetupIntent,
  } = useStripe();

  useEffect(() => {
    (async () => {
      const userDatas = await getUserData();
      setUserDataLocal(userDatas);
      makeArrays();
    })();
  }, []);

  const startPaymentProcess = async () => {
    await fetchClientSecret();
  };

  const startPayPalProcedureOne = () => {
    console.log(108);
    // let currency = '100';
    // currency.replace(' USD', '');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Basic QVNuek5NUXY5a3ktS0cyd0Z2QkV3N2pmYVNhRXBRMVRiWGxWbHpaTzltWEFiaWtmS0tmZ0ZkcmtCOVRXcV90WldrN19YVmd1U2o3blBaQXY6RUM1VkhhTE1CMEpMS1MybXRjR3E2dG44RDd5Nmc1LS05WXlIUDZ0eVVvRDNRZnlKbUZmdHNhQ1laX1pGY3YwZ2pENHVjQU9oWS11My1od0s=',
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded.toString(),
      redirect: 'follow',
    };

    fetch('https://api.sandbox.paypal.com/v1/oauth2/token', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(160, result);
        setAccessToken(result.access_token);

        startPayPalProcedureTwo();
      })
      .catch(error => {
        console.log(163, error);
        setIsLoading(false);
      });
  };

  const startPayPalProcedureTwo = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    myHeaders.append('Content-Type', 'application/json');

    let amount = itemTotalPrice;
    var raw = JSON.stringify({
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: 'USD',
            details: {
              subtotal: amount,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0',
            },
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.sandbox.paypal.com/v1/payments/payment', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(252, result);
        const {id, links} = result;
        const approvalUrl = links.find(data => data.rel == 'approval_url');

        setIsLoading(false);
        setPaymentId(id);
        setApprovalUrl(approvalUrl.href);
        if (result.state == 'created') {
          setIsVisible(true);
        }
      })
      .catch(error => {
        console.log(253, error);
        setIsLoading(false);
      });
  };

  const _onNavigationStateChange = webViewState => {
    console.log(208, webViewState);
    if (webViewState.url.includes('https://example.com/')) {
      var url = webViewState.url;
      var paymentId = /paymentId=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
      var PayerID = /PayerID=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)

      console.log(228, url);
      console.log(229, paymentId);
      console.log(230, PayerID);
      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payer_id: PayerID},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then(response => {
          console.log(224, response);
          if (response.status == 200) {
            hitOrderPlaceApi();
          }
        })
        .catch(err => {
          console.log(227, err);
        });
    }
  };

  const fetchClientSecret = async () => {
    var amountToSend = itemTotalPrice * 100;

    ///////////////
    await fetch(GETCLIENTSECRET, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountToSend,
      }),
    })
      .then(response => response?.json())
      .then(res => {
        setClientSecret(res?.client_secret);
        setStripeData(res);
        initPaymentScreenStripe(res?.client_secret);
      })
      .catch(err => {
        setIsLoading(false);
        showMessage({
          type: 'warning',
          icon: 'warning',
          message: 'Error while fetching client data.',
          backgroundColor: '#E9691D',
        });
        // console.log(122, err);
      });
  };

  const initPaymentScreenStripe = async data => {
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: data,
      merchantDisplayName: 'MoyenXpress',
      primaryButtonColor: color.themColorPrimary,
      customerId: userDataLocal?.id,
    });
    if (error) {
      setIsLoading(false);
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Error while fetching client data.',
        backgroundColor: '#E9691D',
      });
      // console.log(119, error);
    } else {
      validateHitOrderPlaceApi('stripe', data);
    }
  };

  const handlePayment = async data => {
    const {error} = await presentPaymentSheet({
      clientSecret: data,
    });

    if (error) {
      // console.log(156, error);
      setIsLoading(false);
    } else {
      const {paymentIntent, error} = await retrievePaymentIntent(data);
      if (paymentIntent) {
        hitOrderPlaceApi(paymentIntent);
      }
    }
  };

  const data = route?.params?.screenData;

  const updatValue = (value, attribute) => {
    setDummyState(value);
    var data = userDataLocal;
    data[attribute] = value;
    setUserDataLocal(data);
  };

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

  const header = text => {
    var t = text;
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
        <Text style={styles.te}>{t}</Text>
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
            Summary
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
            Payment
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const updateButtonState = e => {
    setButtonState(e);
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
        {/* <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
          <Text style={styles.subtotalText}>Sub Total</Text>
          <Text style={styles.subtotalPrice}>125</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
          <Text style={styles.subtotalText}>Sub Total</Text>
          <Text style={styles.subtotalPrice}>125</Text>
        </View> */}
        <View style={{flexDirection: 'row', marginBottom: hp('1')}}>
          <Text style={styles.subtotalText}>Sub Total</Text>
          <Text style={styles.subtotalPrice}>$ {itemTotalPrice}</Text>
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
            Total
          </Text>
          <Text
            style={{...styles.subtotalPrice, color: color.themColorPrimary}}>
            $ {itemTotalPrice}
          </Text>
        </View>
      </View>
    );
  };
  const accountDetails = () => {
    return (
      <>
        <ScrollView>
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
              label="Address *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              value={userDataLocal?.address_one}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'address_one');
              }}
            />
            {/* <TextInput
              label="Address Two *"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              value={userDataLocal?.address_two}
              selectionColor="#FF7E33"
              onChangeText={text => {
                updatValue(text, 'address_two');
              }}
            /> */}
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
              maxLength={7}
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
            <TextInput
              label="Note"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              value={note}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setNote(text);
              }}
            />
          </View>
        </ScrollView>
      </>
    );
  };
  const renderScreen = () => {
    if (buttonState == 1) {
      return (
        <View>
          {/* {topButton()} */}
          {accountDetails()}
          {/* {deliveryMethod()} */}
          {orderDetailsRenderdata()}
          {bottomButton()}
        </View>
      );
    } else if (buttonState == 2) {
      return (
        <View>
          {/* {topButton()} */}
          {accountDetailsSummy()}
          {/* {deliveryMethod()} */}
          {/* {paymentMethod()} */}
          {orderDetailsRenderdata()}
          {bottomButton()}
        </View>
      );
    } else if (buttonState == 3) {
      return (
        <View>
          {/* {topButton()} */}
          {paymentMethod()}
          {/* {paymentMethodValue == 'Stripe Payment' && (
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => startPaymentProcess()}>
              <Text style={styles.or}>Continue Stripe</Text>

            </TouchableOpacity>
          )} */}
          {bottomButton()}
        </View>
      );
    } else if (buttonState == 4) {
      return <>{orderCompleteScreen()}</>;
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
                setPaymentMethodValue(nextValue);
              }}
              colorScheme={'orange'}>
              {/* <Radio value="Direct Bank Transfer" my={1}>
                <Text style={styles.radioText}>Direct Bank Transfer</Text>
              </Radio>
              <View
                style={{
                  ...styles.devider,
                  width: wp('75'),
                  alignSelf: 'center',
                  backgroundColor: '#C8C8C8',
                }}
              /> */}
              {/* {paymentMethodValue== 'Direct Bank Transfer'?
            cardDetails():
            null  
            } */}
              {/* <Radio value="Cash on Delivery" my={1}>
                <Text style={styles.radioText}>Cash on Delivery</Text>
              </Radio> */}
              {/* <View
                style={{
                  ...styles.devider,
                  width: wp('75'),
                  alignSelf: 'center',
                  backgroundColor: '#C8C8C8',
                }}
              /> */}
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
              <Radio value="Stripe Payment" my={1}>
                <Text style={styles.radioText}>Stripe Payment</Text>
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
            value={userDataLocal?.username}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />

          <TextInput
            label="Address *"
            editable={false}
            underlineColor="gray"
            value={userDataLocal?.address_one}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
          {/* <TextInput
            label="Address Two *"
            editable={false}
            underlineColor="gray"
            value={userDataLocal?.address_two}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          /> */}
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
            value={userDataLocal?.country}
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
            value={userDataLocal?.phone_number}
          />
          <TextInput
            label="ZipCode *"
            editable={false}
            keyboardType="number-pad"
            underlineColor="gray"
            value={
              userDataLocal?.zipcode == null
                ? null
                : JSON?.stringify(userDataLocal?.zipcode)
            }
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
          <TextInput
            label="Note"
            underlineColor="gray"
            editable={false}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            value={note}
            selectionColor="#FF7E33"
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
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp('0.5'),
              width: wp('79.5'),
            }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.subtotalText,
                fontWeight: 'normal',
                width: wp('39'),
                fontSize: hp('2'),
              }}>
              {res?.get_products?.name} x {res?.quantity}{' '}
            </Text>
            <View style={{width: wp('10')}}></View>
            <View style={{...styles.subtotalPrice, width: wp('37')}}>
              <Text style={{...styles.subtotalPrice}} numberOfLines={1}>
                {res?.get_products?.is_discounted == 2 ? (
                  <>
                    <Text style={{textDecorationLine: 'line-through'}}>
                      $ {itemPrice}{' '}
                    </Text>
                    $ {quantityCalculate(itemQuantity, discountedPrice)}
                  </>
                ) : (
                  <Text>$ {quantityCalculate(itemQuantity, itemPrice)}</Text>
                )}
              </Text>
            </View>
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
        <TouchableOpacity
          style={styles.maior}
          onPress={() => {
            // setIsLoading(true);

            processTopPayment();
          }}>
          {isLoading ? (
            <ActivityIndicator
              animating={isLoading}
              size={'small'}
              color={'white'}
            />
          ) : (
            <Text style={styles.or}>Proceed</Text>
          )}
        </TouchableOpacity>
      </>
    );
  };
  const processTopPayment = () => {
    if (buttonState == 1) {
      setButtonState(2);
    } else if (buttonState == 2) {
      setButtonState(3);
    } else if (buttonState == 3) {
      setIsLoading(true);
      if (paymentMethodValue == 'Stripe Payment') {
        startPaymentProcess();
      } else if (paymentMethodValue == 'PayPal') {
        validateHitOrderPlaceApi('PayPal');
      } else {
        validateHitOrderPlaceApi();
      }
    }
  };

  const validateHitOrderPlaceApi = (stringValue, data) => {
    if (
      // deliveryMethodValue !== null &&
      paymentMethodValue !== null &&
      userDataLocal?.username !== '' &&
      userDataLocal?.username !== null &&
      userDataLocal?.phone_number !== '' &&
      userDataLocal?.phone_number !== null &&
      userDataLocal?.city !== '' &&
      userDataLocal?.city !== null &&
      userDataLocal?.address_one !== '' &&
      userDataLocal?.address_one !== null &&
      // userDataLocal?.address_two !== '' &&
      // userDataLocal?.address_two !== null &&
      userDataLocal?.zipcode !== '' &&
      userDataLocal?.zipcode !== null &&
      userDataLocal?.country !== '' &&
      userDataLocal?.country !== null
    ) {
      if (stringValue == 'stripe') {
        handlePayment(data);
      } else if (stringValue == 'PayPal') {
        startPayPalProcedureOne();
      } else {
        hitOrderPlaceApi();
      }
    } else {
      setIsLoading(false);
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Please enter all delivery information',
        backgroundColor: '#E9691D',
      });
    }
  };

  const hitOrderPlaceApi = async paymentIntentdata => {
    // console.log(753, paymentIntentdata);
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      total: total,
      product_id: productIdArray,
      shop_id: shopIdArray,
      quantity: quantityArray,
      shipping_fullname: userDataLocal?.username,
      shipping_address: userDataLocal?.address_one,
      shipping_city: userDataLocal?.city,
      shipping_state: userDataLocal?.country,
      shipping_zipcode: userDataLocal?.zipcode,
      shipping_phone: userDataLocal?.phone_number,
      notes: note,
      attributes: attributesArray,
      payment_method: paymentMethodValue,
    });

    // console.log(773, raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${ORDERPLACE}/${userDataLocal?.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(785, result);
        if (
          result?.message == 'Checkout Completed' &&
          paymentMethodValue == 'Stripe Payment'
        ) {
          setIsLoading(false);
          sendPaymentIntentData(result, paymentIntentdata);
        } else {
          setIsLoading(false);

          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Your order has been sucessfully placed.',
            backgroundColor: '#E9691D',
          });
          setButtonState(4);
        }
      })
      .catch(error => {
        setIsLoading(false);

        // console.log('780', error);
      });
  };
  const sendPaymentIntentData = async (result, paymentIntentdata) => {
    // console.log(793, paymentIntentdata);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      orderNumber: result?.order?.order_number,
      orderId: result?.order?.id,
      stripeId: paymentIntentdata?.id,
    });
    // console.log(801, raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(
      SENDINTENTANDORDERDATA,
      // 'https://test-urls.com/elitedesignhub/moyen-express/public/api/stripe-form/aftersubmit',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result?.success == true) {
          setIsLoading(false);

          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Your order has been sucessfully placed.',
            backgroundColor: '#E9691D',
          });
          setButtonState(4);
        } else {
          setIsLoading(false);

          showMessage({
            type: 'warning',
            icon: 'warning',
            message: 'Something went wrong.',
            backgroundColor: '#E9691D',
          });
        }
      })
      .catch(error => {
        setIsLoading(false);

        showMessage({
          type: 'warning',
          icon: 'warning',
          message: 'Something went wrong.',
          backgroundColor: '#E9691D',
        });
        // console.log('841', error);
      });
  };
  const orderCompleteScreen = () => {
    return (
      <>
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: hp('5')}}>
            {/* <Ionicons
              name="checkmark-circle-outline"
              size={hp('30')}
              color={color.themColorPrimary}
            /> */}
            <Image
              source={require('../../images/9812.png')}
              style={{width: wp('60'), height: hp('30'), marginBottom: hp('2')}}
            />
            <Text style={{color: color.themColorPrimary, fontSize: hp('3')}}>
              Success
            </Text>
            {/* <View style={styles.box}>
              <View style={styles.parentCardIconHolder}>
                <AntDesign
                  name="shoppingcart"
                  color={color.themColorPrimary}
                  size={hp('3')}
                  style={styles.iconStyle}
                />
                <View style={styles.parentCardRow}>
                  <Text style={styles.parentCarddTextStyle}>Order ID:</Text>
                  <Text style={styles.parentCarddTextStyle}>444455545</Text>
                </View>
              </View>
              <View style={styles.parentCardIconHolder}>
                <AntDesign
                  name="shoppingcart"
                  color={color.themColorPrimary}
                  size={hp('3')}
                  style={styles.iconStyle}
                />
                <View style={styles.parentCardRow}>
                  <Text style={styles.parentCarddTextStyle}>Order ID:</Text>
                  <Text style={styles.parentCarddTextStyle}>444455545</Text>
                </View>
              </View>
              <View style={styles.parentCardIconHolder}>
                <AntDesign
                  name="shoppingcart"
                  color={color.themColorPrimary}
                  size={hp('3')}
                  style={styles.iconStyle}
                />
                <View style={styles.parentCardRow}>
                  <Text style={styles.parentCarddTextStyle}>Status:</Text>
                  <Text style={styles.parentCarddTextStyle}>pending</Text>
                </View>
              </View>
              <View style={styles.parentCardIconHolder}>
                <AntDesign
                  name="shoppingcart"
                  color={color.themColorPrimary}
                  size={hp('3')}
                  style={styles.iconStyle}
                />
                <View style={styles.parentCardRow}>
                  <Text style={styles.parentCarddTextStyle}>Date:</Text>
                  <Text style={styles.parentCarddTextStyle}>11-2-2021</Text>
                </View>
              </View>
              <View style={styles.parentCardIconHolder}>
                <AntDesign
                  name="shoppingcart"
                  color={color.themColorPrimary}
                  size={hp('3')}
                  style={styles.iconStyle}
                />
                <View style={styles.parentCardRow}>
                  <Text style={styles.parentCarddTextStyle}>Total:</Text>
                  <Text style={styles.parentCarddTextStyle}>$1254</Text>
                </View>
              </View>
              <View style={styles.parentCardIconHolder}>
                <AntDesign
                  name="shoppingcart"
                  color={color.themColorPrimary}
                  size={hp('3')}
                  style={styles.iconStyle}
                />
                <View style={styles.parentCardRow}>
                  <Text style={styles.parentCarddTextStyle}>
                    Payment method:
                  </Text>
                  <Text style={styles.parentCarddTextStyle}>
                    Cash on delivery
                  </Text>
                </View>
              </View>
            </View> */}
            <TouchableOpacity
              style={styles.maior}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.or}>Back To Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  };
  return (
    <StripeProvider
      publishableKey={StripePKey}
      // merchantIdentifier="merchant.identifier"
    >
      <View style={styles.main}>
        {header('Check Out')}
        {buttonState == 4 ? null : topButton()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* {cardDetails()} */}
          {renderScreen()}
          {/* {bottomButton()} */}
          {/* {orderCompleteScreen()} */}
        </ScrollView>
      </View>
      {approvalUrl && (
        <Modal
          animationType="slide"
          onRequestClose={() => {
            setIsVisible(false);
          }}
          visible={isVisible}>
          <WebView
            style={{height: hp('50'), width: wp('100')}}
            source={{uri: approvalUrl}}
            onNavigationStateChange={_onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            style={{marginTop: 20}}
          />
        </Modal>
      )}
    </StripeProvider>
  );
}
