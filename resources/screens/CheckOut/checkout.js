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
  Linking,
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
  GETCLIENTSECRET,
  SENDINTENTANDORDERDATA,
  shippingDetailsApi,
  StripePKeyUrl,
  // StripePKey,
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
import {HelperText, TextInput, Checkbox, RadioButton} from 'react-native-paper';
import {HStack, Radio, NativeBaseProvider} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {textAlign, textColor} from 'styled-system';
import {set} from 'immer/dist/internal';
import * as Animatable from 'react-native-animatable';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export default function checkOut({navigation, route}) {
  const [dummy, setDummy] = useState(1);

  const isCarousel = React.useRef(null);
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
  const [showWhatsApp, setWhatsApp] = useState(false);

  const [accessToken, setAccessToken] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stateBounce, setStateBounce] = useState('');

  const [shippingFullName, setShippingFullName] = useState('');
  const [shippinggAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingZipCode, setShippingZipCode] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');

  const [billingFullName, setBillingFullName] = useState('');
  const [billinggAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZipCode, setBillingZipCode] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [mobileNumber, setMobileNumber] = useState('+14707758326');
  const [orderDetails, setOrderDetails] = useState();

  const whatAppPhone = () => {
    // Linking.openURL(`whatsapp://send?text=hello&phone=${mobileNumber}`);
    var orderNumber = 'Order Number :' + ' ' + orderDetails.order_number;
    var grandTotal = 'Grand Total :' + ' ' + orderDetails.grandTotal;
    var order = orderNumber + '\n' + grandTotal;
    Linking.openURL(`whatsapp://send?phone=${mobileNumber}&text=${order}`);
  };

  var StripePKey =
    'pk_live_51K5P49EoiJYB55N4fClLpBw782KOcOakMNZGmbx2KSVJ59cBhoyIAY4WIF4bINlTF1g0h9rImBDCHEJj9KF2UymM00CL5YnH4E';
  const showAlert = () => {
    setTimeout(() => {
      setAlert(true);
    }, 1000);
  };
  const [checkBox, setCheckBox] = useState('unchecked');
  const getStriperKey = () => {
    fetch(StripePKeyUrl)
      .then(res => res.json())
      .then(json => {
        StripePKey = json.pk_key;
        console.log(117, json);
      })
      .catch(err => console.log(err));
  };
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
      RNLocalize.addEventListener('change', handleLocalizationChange());

      getStriperKey();
      showAlert();
      const userDatas = await getUserData();
      setUserDataLocal(userDatas);
      makeArrays();
    })();
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange());
    };
  }, []);

  const CheckShippingDetail = user => {
    var url = shippingDetailsApi + user.id;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        // json.status == 1 ? setCheckBox(true) : setCheckBox(false);
        if (json.status == 0) {
          setShippingFullName(user.username);
          setShippingAddress(user.address_one);
          setShippingCity(user.city);
          setShippingState(user.country);
          setShippingZipCode(user.zipcode);
          setShippingPhone(user.phone_number);
        } else if (json.status == 1) {
          setShippingFullName(json.shipping.shipping_fullname);
          setShippingAddress(json.shipping.shipping_address);
          setShippingCity(json.shipping.shipping_city);
          setShippingState(json.shipping.shipping_state);
          setShippingZipCode(json.shipping.shipping_zipcode);
          setShippingPhone(json.shipping.shipping_phone);
          if (json.billing.billing_fullname != null) {
            setBillingFullName(json.billing.billing_fullname);
            setBillingAddress(json.billing.billing_address);
            setBillingCity(json.billing.billing_city);
            setBillingState(json.billing.billing_state);
            setBillingZipCode(json.billing.billing_zipcode);
            setBillingPhone(json.billing.billing_phone);
          }
        }
      })
      .catch(e => {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Something is wrong',
          backgroundColor: '#E9691D',
        });
      });
  };
  const startPaymentProcess = async () => {
    await fetchClientSecret();
  };

  const startPayPalProcedureOne = () => {
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
        console.log(122, err);
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
      console.log(119, error);
    } else {
      validateHitOrderPlaceApi('stripe', data);
    }
  };

  const handlePayment = async data => {
    const {error} = await presentPaymentSheet({
      clientSecret: data,
    });

    if (error) {
      console.log(156, error);
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

  // const CheckBoxButton = () => {
  //   return (
  //     <HStack space={6}>
  //       <Checkbox
  //         onChange={e => setCheckBox(e)}
  //         colorScheme="orange"
  //         accessibilityLabel="This is a dummy checkbox"
  //       />
  //     </HStack>
  //   );
  // };

  function CheckBox({label, status, onPress}) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.checkBoxButtonContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={Platform.OS == 'ios' && styles.checkStyle}>
            <Checkbox
              status={status}
              uncheckedColor={'black'}
              color={color.themColorPrimary}
            />
          </View>
          <Text style={{fontWeight: 'bold'}}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

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
        <Text style={styles.te}>{translate(t)}</Text>
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
        <View
          style={
            buttonState == 1 ? styles.topButtonActive : styles.topButtonInactive
          }>
          <Text
            style={
              buttonState == 1
                ? styles.topButtonActiveText
                : styles.topButtonInactiveText
            }>
            {translate('Delivery')}
          </Text>
        </View>
        <View
          style={
            buttonState == 2 ? styles.topButtonActive : styles.topButtonInactive
          }>
          <Text
            style={
              buttonState == 2
                ? styles.topButtonActiveText
                : styles.topButtonInactiveText
            }>
            {translate('Summary')}
          </Text>
        </View>
        <View
          style={
            buttonState == 3 ? styles.topButtonActive : styles.topButtonInactive
          }>
          <Text
            style={
              buttonState == 3
                ? styles.topButtonActiveText
                : styles.topButtonInactiveText
            }>
            {translate('Payment')}
          </Text>
        </View>
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
          <Text style={styles.subtotalText}>{translate('Subtotal')}</Text>
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
            {translate('Total')}
          </Text>
          <Text
            style={{...styles.subtotalPrice, color: color.themColorPrimary}}>
            $ {itemTotalPrice}
          </Text>
        </View>
      </View>
    );
  };
  const shippingAddress = () => {
    return (
      <>
        <ScrollView>
          <Text style={styles.centerText}>{translate('Shipping Details')}</Text>
          <View style={{...styles.box, paddingBottom: 30}}>
            <TextInput
              label={translate('Full Name')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              value={shippingFullName}
              onChangeText={text => {
                setShippingFullName(text);
                // updatValue(text, 'username');
              }}
            />
            <TextInput
              label={translate('Address:')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              value={shippinggAddress}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setShippingAddress(text);
                // updatValue(text, 'address_one');
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
              label={translate('City *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              keyboardType="default"
              value={shippingCity}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setShippingCity(text);
                // updatValue(text, 'city');
              }}
            />
            <TextInput
              label={translate('Country *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              value={shippingState}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setShippingState(text);
                // updatValue(text, 'country');
              }}
            />
            <TextInput
              label={translate('Number')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              keyboardType="number-pad"
              value={shippingPhone}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setShippingPhone(text);
                // updatValue(text, 'phone_number');
              }}
            />
            <TextInput
              label={translate('ZipCode *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              maxLength={7}
              keyboardType="numeric"
              value={shippingZipCode}
              // value={JSON?.stringify(userDataLocal?.zipcode)}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setShippingZipCode(text);
                // updatValue(text, 'zipcode');
              }}
            />
            <TextInput
              label={translate('Note')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
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
  const billingAddress = () => {
    return (
      <>
        <Animatable.View
          // duration={2000}
          // onAnimationEnd={() => setStateBounce('')}
          animation={'bounceInLeft'}
          // animation={'tada'}
        >
          <Text style={styles.centerText}>Billing Address</Text>
          <View style={{...styles.box, paddingBottom: 30}}>
            <TextInput
              label={translate('Full Name')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              value={billingFullName}
              onChangeText={text => {
                setBillingFullName(text);
              }}
            />
            <TextInput
              label="Address:"
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              value={billinggAddress}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setBillingAddress(text);
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
              label={translate('City *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              keyboardType="default"
              value={billingCity}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setBillingCity(text);
              }}
            />
            <TextInput
              label={translate('Country *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              value={billingState}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setBillingState(text);
              }}
            />
            <TextInput
              label={translate('Number')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              keyboardType="number-pad"
              value={billingPhone}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setBillingPhone(text);
              }}
            />
            <TextInput
              label={translate('ZipCode *')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              maxLength={7}
              keyboardType="numeric"
              value={billingZipCode}
              // value={JSON?.stringify(userDataLocal?.zipcode)}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setBillingZipCode(text);
              }}
            />
            <TextInput
              label={translate('Note')}
              underlineColor="gray"
              theme={{colors: {primary: color.themColorPrimary}}}
              style={styles.text}
              editable={buttonState == 1 ? true : false}
              value={note}
              selectionColor="#FF7E33"
              onChangeText={text => {
                setNote(text);
              }}
            />
          </View>
        </Animatable.View>
      </>
    );
  };
  const setdetails = () => {
    if (
      shippingFullName !== '' &&
      shippingFullName !== null &&
      shippingPhone !== '' &&
      shippingPhone !== null &&
      shippingCity !== '' &&
      shippingCity !== null &&
      shippinggAddress !== '' &&
      shippinggAddress !== null &&
      shippingZipCode !== '' &&
      shippingZipCode !== null &&
      shippingState !== '' &&
      shippingState !== null
    ) {
      setCheckBox('checked');
      setBillingFullName(shippingFullName);
      setBillingPhone(shippingPhone);
      setBillingState(shippingState);
      setBillingZipCode(shippingZipCode);
      setBillingCity(shippingCity);
      setBillingAddress(shippinggAddress);
    } else {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: translate('Please first complete all shipping details'),
        backgroundColor: '#E9691D',
      });
    }
  };
  const renderScreen = () => {
    if (buttonState == 1) {
      return (
        <View>
          {shippingAddress()}
          <CheckBox
            label={translate('Same as Shipping Address')}
            status={checkBox}
            onPress={() => {
              checkBox == 'checked' ? setCheckBox('unchecked') : setdetails();
            }}
          />
          {checkBox == 'unchecked' && billingAddress()}

          {orderDetailsRenderdata()}
          {bottomButton()}
        </View>
      );
    } else if (buttonState == 2) {
      return (
        <View>
          {shippingAddress()}
          {billingAddress()}
          {orderDetailsRenderdata()}
          {bottomButton()}
        </View>
      );
    } else if (buttonState == 3) {
      return (
        <View>
          {paymentMethod()}
          {orderDetailsRenderdata()}
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
              <Radio value="Orange Pay" my={1}>
                <Text style={styles.radioText}>Orange Pay</Text>
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
              <Radio value="American Express, Mastercard, Visa" my={1}>
                <Text style={styles.radioText}>
                  American Express, Mastercard, Visa
                </Text>
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
            label="Full Name"
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
            label={translate('Number')}
            editable={false}
            underlineColor="gray"
            keyboardType="number-pad"
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
            value={userDataLocal?.phone_number}
          />
          <TextInput
            label={translate('ZipCode *')}
            editable={false}
            keyboardType="number-pad"
            underlineColor="gray"
            value={userDataLocal?.zipcode}
            theme={{colors: {primary: color.themColorPrimary}}}
            style={styles.text}
          />
          <TextInput
            label={translate('Note')}
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
        <Text style={styles.centerText}>{translate('Order Items')}</Text>
        <View style={{...styles.box}}>{orderDetailsAlldata()}</View>
      </>
    );
  };
  const quantityCalculate = (quantity, prices) => {
    var totlaPrice = quantity * prices;
    return totlaPrice.toFixed(2);
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
              style={{
                ...styles.subtotalText,
                fontWeight: 'normal',
                width: wp('45'),
                fontSize: hp('2'),
              }}>
              {res?.get_products?.name} x {res?.quantity}{' '}
            </Text>
            <View style={{width: wp('5')}}></View>
            <View style={{...styles.subtotalPrice, width: wp('37')}}>
              <Text style={{...styles.subtotalPrice}} numberOfLines={1}>
                {res?.get_products?.is_discounted == 2 ? (
                  <>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                      }}>
                      $ {itemPrice}{' '}
                    </Text>
                    $ {quantityCalculate(itemQuantity, discountedPrice)}
                  </>
                ) : (
                  <Text style={{color: 'black'}}>
                    $ {quantityCalculate(itemQuantity, itemPrice)}
                  </Text>
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
      <View>
        {totalPriceCard()}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {buttonState != 1 && (
            <TouchableOpacity
              onPress={() => backProcessTopPayment()}
              style={styles.bottomBackButtonContainer}>
              <Text style={styles.or}>{translate('Back')}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.maior}
            onPress={() => {
              processTopPayment();
            }}>
            {isLoading ? (
              <ActivityIndicator
                animating={isLoading}
                size={'small'}
                color={'white'}
              />
            ) : (
              <Text style={styles.or}>{translate('Proceed')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const processTopPayment = () => {
    if (buttonState == 1) {
      setButtonState(2);
    } else if (buttonState == 2) {
      setButtonState(3);
    } else if (buttonState == 3) {
      setIsLoading(true);
      if (paymentMethodValue == 'American Express, Mastercard, Visa') {
        startPaymentProcess();
      } else if (paymentMethodValue == 'PayPal') {
        validateHitOrderPlaceApi('PayPal');
      } else {
        validateHitOrderPlaceApi();
      }
    }
  };

  const backProcessTopPayment = () => {
    if (buttonState == 2) {
      setButtonState(1);
    } else if (buttonState == 3) {
      setButtonState(2);
    }
    // else if (buttonState == 3) {
    //   setIsLoading(true);
    //   if (paymentMethodValue == 'American Express, Mastercard, Visa') {
    //     startPaymentProcess();
    //   } else if (paymentMethodValue == 'PayPal') {
    //     validateHitOrderPlaceApi('PayPal');
    //   } else {
    //     validateHitOrderPlaceApi();
    //   }
    // }
  };

  const validateHitOrderPlaceApi = (stringValue, data) => {
    if (
      paymentMethodValue !== null &&
      shippingFullName !== '' &&
      shippingFullName !== null &&
      shippingPhone !== '' &&
      shippingPhone !== null &&
      shippingCity !== '' &&
      shippingCity !== null &&
      shippinggAddress !== '' &&
      shippinggAddress !== null &&
      shippingZipCode !== '' &&
      shippingZipCode !== null &&
      shippingState !== '' &&
      shippingState !== null &&
      billingFullName != null &&
      billingFullName != '' &&
      billingPhone !== '' &&
      billingPhone !== null &&
      billingCity !== '' &&
      billingCity !== null &&
      billinggAddress !== '' &&
      billinggAddress !== null &&
      billingZipCode !== '' &&
      billingZipCode !== null &&
      billingState !== '' &&
      billingState !== null
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
        message: translate('Please enter all delivery information'),
        backgroundColor: '#E9691D',
      });
    }
  };

  const hitOrderPlaceApi = async paymentIntentdata => {
    console.log(753, paymentIntentdata);
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      total: total,
      product_id: productIdArray,
      shop_id: shopIdArray,
      quantity: quantityArray,
      shipping_fullname: shippingFullName,
      shipping_address: shippinggAddress,
      shipping_city: shippingCity,
      shipping_state: shippingState,
      shipping_zipcode: shippingZipCode,
      shipping_phone: shippingPhone,
      notes: note,
      billing_fullname:
        checkBox == 'unchecked' ? billingFullName : shippingFullName,
      billing_address:
        checkBox == 'unchecked' ? billinggAddress : shippinggAddress,
      billing_city: checkBox == 'unchecked' ? billingCity : shippingCity,
      billing_state: checkBox == 'unchecked' ? billingState : shippingState,
      billing_zipcode:
        checkBox == 'unchecked' ? billingZipCode : shippingZipCode,
      billing_phone: checkBox == 'unchecked' ? billingPhone : shippingPhone,
      notes: note,
      attributes: attributesArray,
      payment_method: paymentMethodValue,
    });

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
          setOrderDetails({
            order_number: result.order_number,
            grandTotal: result.order.grand_total,
          });
          paymentMethodValue == 'Orange Pay'
            ? setWhatsApp(true)
            : setWhatsApp(false);
        }
      })
      .catch(error => {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Some thing is wrong.',
          backgroundColor: '#E9691D',
        });
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
        console.log('841', error);
      });
  };
  const orderCompleteScreen = () => {
    return (
      <>
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: hp('5')}}>
            <Image
              source={require('../../images/9812.png')}
              style={{width: wp('60'), height: hp('30'), marginBottom: hp('2')}}
            />
            <Text style={{color: color.themColorPrimary, fontSize: hp('3')}}>
              {translate('Success')}
            </Text>
            <TouchableOpacity
              style={styles.maior}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.or}>{translate('Back To Home')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  };
  return (
    <StripeProvider publishableKey={StripePKey}>
      <View style={styles.main}>
        {header('Check Out')}
        {buttonState == 4 ? null : topButton()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderScreen()}
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
            // style={{marginTop: 20}}
          />
        </Modal>
      )}
      <AwesomeAlert
        show={alert}
        showProgress={false}
        title="Alert!"
        message={translate('Would like to same address from your last one')}
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText={translate('Yes')}
        cancelText={translate('No')}
        messageStyle={{textAlign: 'center'}}
        confirmButtonStyle={styles.buttonstyle}
        cancelButtonStyle={styles.buttonstyle}
        cancelButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonColor={color.textColorRedCart}
        cancelButtonColor={color.textColorRedCart}
        onConfirmPressed={() => {
          CheckShippingDetail(userDataLocal);
          setAlert(false);
        }}
        onCancelPressed={() => {
          setAlert(false);
        }}
      />
      <AwesomeAlert
        show={showWhatsApp}
        showProgress={false}
        title={translate('Contact With Owner')}
        titleStyle={{color: 'black', fontWeight: 'bold'}}
        message={translate('For complete your order please contact the owner!')}
        contentContainerStyle={{width: wp('80%')}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Whatsapp"
        cancelText="No"
        messageStyle={{textAlign: 'center', color: 'gray'}}
        cancelButtonStyle={styles.buttonstyleCancelWhatapp}
        cancelButtonTextStyle={{fontSize: hp('1.9')}}
        confirmButtonTextStyle={{fontSize: hp('1.9')}}
        confirmButtonStyle={styles.buttonstyleWhatapp}
        onConfirmPressed={() => {
          setWhatsApp(false);
          whatAppPhone();
        }}
        onCancelPressed={() => {
          setWhatsApp(false);
          // whatAppPhone();
        }}
      />
    </StripeProvider>
  );
}
