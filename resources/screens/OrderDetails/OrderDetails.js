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
  ADDTOWISHLIST,
  API_BASED_URL,
  CANCELORDER,
  CARTDELETE,
  Images_API,
  PASSWORDCHNAGE,
  testCART,
  USERORDERDEATILS,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {NineCubesLoader, BubblesLoader} from 'react-native-indicator';
import {color} from '../../config/color';
import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {HelperText, TextInput} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import {G} from 'react-native-svg';
import {HomeCartIcon} from '../../Reuseable component/HomeCartIcon/homeCartIcon';
import {languageCheck} from '../../config/languageChecker';

export default function OrderDetails({navigation}) {
  const [activeSession, setActiveSession] = useState([]);
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [returnAlter, setReturnAlert] = useState(false);
  const [seletedOrder, setSeletedOrder] = useState();
  const cancelOrder = item => {
    setSeletedOrder(item);
    setShowAlert(true);
  };
  const returnOrder = item => {
    setReturnAlert(true);
  };
  const cancelOrderConfirm = async () => {
    const user = await getUserData();
    const id = user?.id;
    setShowAlert(false);
    var url = CANCELORDER + '/' + id + '/' + seletedOrder.order_number;
    fetch(url, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(json => {
        console.log(185, json);

        if (json.status == 1) {
          showMessage({
            type: 'success',
            icon: 'success',
            message: languageCheck(json.message),
            backgroundColor: '#E9691D',
          });
          getOrderDetails();
        } else if (json.status == 0) {
          showMessage({
            type: 'warning',
            icon: 'warning',
            message: languageCheck(json.message),
            backgroundColor: '#E9691D',
          });
        }
      })
      .catch(err => {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: languageCheck('Some thing is wrong'),
          backgroundColor: '#E9691D',
        });
      });
  };
  useEffect(() => {
    (async () => {
      getOrderDetails();
    })();
  }, []);
  const navigationProps = () => {
    navigation.navigate('Cart');
  };
  const getOrderDetails = async () => {
    const user = await getUserData();
    const id = user?.id;

    const url = USERORDERDEATILS + id;
    fetch(url)
      .then(data => data?.json())
      .then(res => {
        // console.log(54, res);
        if (res) {
          setOrderData(res);
          setIsLoading(false);
        } else {
          setOrderData([]);
        }
      })
      .catch(e => {
        // console.log(57, e);
        setOrderData([]);
      });
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
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#512500',
            fontWeight: 'bold',
            marginTop: hp(Platform?.OS == 'ios' ? '6' : '2.5'),
            marginLeft: wp('3'),
          }}>
          {languageCheck('My Orders')}
        </Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons
            name="cart"
            size={30}
            color="#512500"
            style={{
              ...styles.icon,

              marginRight: wp('3'),
            }}
          />
        </TouchableOpacity> */}
        <View
          style={{
            marginTop: hp(Platform?.OS == 'ios' ? '4.5' : '2'),
          }}>
          <HomeCartIcon isLoggedIn={true} navigations={navigationProps} />
        </View>
      </View>
    );
  };

  const accordionRender = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('10')}}
        style={styles.scrollViewStyle}>
        {orderData?.length > 0 ? (
          <Accordion
            activeSections={activeSession}
            sections={orderData}
            underlayColor="transparent"
            renderHeader={e => renderHeader(e)}
            renderContent={e => renderContent(e)}
            onChange={e => updateSections(e)}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <FontAwesome
              name="shopping-cart"
              color={color.themColorPrimary}
              size={hp('10')}
              // style={{...styles.iconStyle, marginLeft: wp('1')}}
            />
            <Text style={styles.noTextstyle}>
              {languageCheck('You have no orders to display')}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderHeader = item => {
    return (
      <View style={{...styles.parentCardStyle}}>
        <View style={styles.parentCardTopTag}>
          <Text style={styles.parentCardTopTagText}>
            {languageCheck('Order Details')}
          </Text>
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
            <Text style={styles.parentCarddTextStyle}>
              {item?.order_number}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="calendar"
            color={color.themColorPrimary}
            size={hp('3')}
          />
          <View style={{...styles.parentCardRow, marginTop: hp('0.7')}}>
            <Text style={styles.parentCarddTextStyle}>Date:</Text>
            <Text style={styles.parentCarddTextStyle}>
              {moment(item?.created_at)?.format('Do-MMM-YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="codesquareo"
            color={color.themColorPrimary}
            size={hp('3')}
          />
          <View style={{...styles.parentCardRow, marginTop: hp('0.7')}}>
            <Text style={styles.parentCarddTextStyle}>Status:</Text>
            <Text style={styles.parentCarddTextStyle}>{item?.status}</Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <Ionicons
            name="cash-outline"
            color={color.themColorPrimary}
            size={hp('3')}
          />
          <View
            style={{
              ...styles.parentCardRow,
              marginTop: hp('0.7'),

              borderBottomWidth: hp('0'),
            }}>
            <Text style={styles.parentCarddTextStyle}>Total:</Text>
            <Text style={styles.parentCarddTextStyle}>
              ${item?.grand_total} For {item?.item_count} Item
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAttributeArray = data => {
    var arr;
    if (data?.length > 0) {
      var arr = data;
      var arrayString = arr.join(', ');
      return arrayString;
    }
  };

  const renderMultipleItems = item => {
    var data;
    if (item?.get_order_items?.length > 0) {
      data = item?.get_order_items;
      return data;
    }
  };

  const renderContent = item => {
    return (
      <View
        style={{
          ...styles.parentCardStyle,
          marginBottom: hp('2'),
          marginTop: hp('2'),
          backgroundColor: '#FFEEE3',
        }}>
        <View style={styles.parentCardTopTag}>
          <Text style={styles.parentCardTopTagText}>
            {languageCheck('Product Details')}
          </Text>
        </View>
        {renderMultipleItems(item)?.map((res, i) => {
          return (
            <View>
              <View style={styles.parentCardIconHolder}>
                <Feather
                  name="shopping-bag"
                  color={color.themColorPrimary}
                  size={hp('3')}
                  style={styles.iconStyle}
                />
                <View style={styles.parentCardRow}>
                  <View style={styles.viewForTextWidth}>
                    <Text style={styles.parentCarddTextStyle}>
                      {res?.get_products?.name} x {res?.quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.viewForTextWidth,
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.parentCarddTextStyle}>
                      {res?.get_products?.is_discounted == 2
                        ? res?.get_products?.discounted_price
                        : res?.get_products?.price}{' '}
                      x{res?.quantity}
                    </Text>
                  </View>
                </View>
              </View>
              {res?.attributes?.length > 0 && (
                <View style={styles.parentCardIconHolder}>
                  <AntDesign
                    name="fork"
                    color={color.themColorPrimary}
                    size={hp('3')}
                    style={styles.iconStyle}
                  />
                  <View style={styles.parentCardRow}>
                    <View style={styles.viewForTextWidth}>
                      <Text style={styles.parentCarddTextStyle}>
                        Product Attributes
                      </Text>
                    </View>

                    <View
                      style={{
                        ...styles.viewForTextWidth,
                        alignItems: 'flex-end',
                      }}>
                      <Text
                        style={{
                          ...styles.parentCarddTextStyle,
                          // marginRight: wp('10'),
                        }}>
                        {/* {res?.attributes} */}
                        {renderAttributeArray(res?.attributes)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        {/* <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="fork"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>
                Product Attributes
              </Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
                return (
                  <Text
                    style={{
                      ...styles.parentCarddTextStyle,
                    }}>
                    ({res})
                  </Text>
                );
              })}
         </View> 
        </View> 
        </View>  */}
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="calculator"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Sub-Total:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.get_order_items[0]?.total_amount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="creditcard"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Payment Method:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.payment_method}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <Ionicons
            name="cash-outline"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Total:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.grand_total}
              </Text>
            </View>
          </View>
        </View>
        <View style={{...styles.parentCardTopTag}}>
          <Text style={styles.parentCardTopTagText}>
            {languageCheck('Shipping Details')}
          </Text>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="user"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>
                Shipping Fullname:
              </Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.shipping_fullname}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="home"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Shipping Address:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.shipping_address}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <MaterialCommunityIcons
            name="city-variant-outline"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Shipping City:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.shipping_city}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <MaterialCommunityIcons
            name="home-city-outline"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Shipping State:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.shipping_state}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <Ionicons
            name="code-slash"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Shipping Zipcode:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.shipping_zipcode}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <Feather
            name="phone"
            color={color.themColorPrimary}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <View style={styles.viewForTextWidth}>
              <Text style={styles.parentCarddTextStyle}>Shipping Phone:</Text>
            </View>
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.parentCarddTextStyle,
                  // marginLeft: wp('2'),
                }}>
                {item?.shipping_phone}
              </Text>
            </View>
          </View>
        </View>

        {item?.notes !== null && item?.notes !== '' && (
          <View style={styles.parentCardIconHolder}>
            <Foundation
              name="clipboard-notes"
              color={color.themColorPrimary}
              size={hp('3')}
              style={{...styles.iconStyle, marginLeft: wp('1')}}
            />
            <View style={styles.parentCardRow}>
              <View style={styles.viewForTextWidth}>
                <Text style={styles.parentCarddTextStyle}>Shipping Notes:</Text>
              </View>
              <View
                style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
                <Text
                  style={{
                    ...styles.parentCarddTextStyle,
                    // marginLeft: wp('2'),
                  }}>
                  {item?.notes}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={{flexDirection: 'row'}}>
          {item.status == 'completed' && (
            <TouchableOpacity
              onPress={() => returnOrder(item)}
              style={{
                ...styles.returnViewContainer,
                alignSelf: `flex-start`,
                marginRight: 'auto',
              }}>
              <Text style={styles.cancelText}>
                {languageCheck('Return Order')}
              </Text>
            </TouchableOpacity>
          )}
          {item.status != 'completed' && (
            <TouchableOpacity
              onPress={() => cancelOrder(item)}
              languageCheck
              style={styles.cancelViewContainer}>
              <Text style={styles.cancelText}>
                {languageCheck('Cancel Order')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={languageCheck('Warning!')}
          message={languageCheck('Are you sure want to cancel this order')}
          messageStyle={{textAlign: 'center'}}
          contentContainerStyle={{width: wp('80%')}}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          titleStyle={{color: 'black'}}
          showConfirmButton={true}
          confirmText={languageCheck('Yes')}
          cancelText={languageCheck('No')}
          confirmButtonStyle={styles.buttonstyle}
          cancelButtonStyle={styles.buttonstyle}
          cancelButtonTextStyle={{fontSize: hp('2.2%')}}
          confirmButtonTextStyle={{fontSize: hp('2.2%')}}
          confirmButtonColor={color.textColorRedCart}
          cancelButtonColor={color.textColorRedCart}
          onConfirmPressed={() => {
            cancelOrderConfirm();
          }}
          onCancelPressed={() => {
            setShowAlert(false);
          }}
        />
        <AwesomeAlert
          show={returnAlter}
          showProgress={false}
          title={languageCheck('Warning!')}
          messageStyle={{textAlign: 'center'}}
          message={languageCheck(`Return policy are not available`)}
          contentContainerStyle={{width: wp('80%')}}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          titleStyle={{color: 'black'}}
          cancelText={languageCheck('Close')}
          confirmButtonStyle={styles.buttonstyle}
          cancelButtonStyle={styles.buttonstyle}
          cancelButtonTextStyle={{fontSize: hp('2.2%')}}
          confirmButtonTextStyle={{fontSize: hp('2.2%')}}
          confirmButtonColor={color.textColorRedCart}
          cancelButtonColor={color.textColorRedCart}
          onCancelPressed={() => {
            setReturnAlert(false);
          }}
        />
      </View>
    );
  };
  const updateSections = e => {
    setActiveSession(e);
  };

  return (
    <View style={styles.main}>
      {header()}

      {isLoading ? (
        <View style={{alignSelf: 'center', marginTop: hp('20%')}}>
          <BubblesLoader size={50} color="#512500" dotRadius={10} />
        </View>
      ) : (
        accordionRender()
      )}
    </View>
  );
}
