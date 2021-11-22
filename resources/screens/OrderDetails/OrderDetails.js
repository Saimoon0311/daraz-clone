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
  CART,
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

export default function OrderDetails({navigation}) {
  const [activeSession, setActiveSession] = useState([]);
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    (async () => {
      getOrderDetails();
    })();
  }, []);

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
        } else {
          setOrderData([]);
        }
      })
      .catch(e => {
        console.log(57, e);
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
          My Orders
        </Text>
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
          <View style={styles.noDataContainer}></View>
        )}
      </ScrollView>
    );
  };

  const renderHeader = item => {
    return (
      <View style={{...styles.parentCardStyle}}>
        <View style={styles.parentCardTopTag}>
          <Text style={styles.parentCardTopTagText}>Order Details</Text>
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
              ${item?.grand_total} For {item?.get_order_items[0]?.quantity} Item
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const returnItemAttributes = item => {
    var data;
    if (
      item?.get_order_items[0]?.attributes !== undefined &&
      item?.get_order_items[0]?.attributes?.length > 0
    ) {
      data = item?.get_order_items[0]?.attributes;
      return data;
    }
  };

  const renderMultipleItems = item => {
    var data;
    if (item?.get_order_items?.length > 0) {
      // console.log(215, item?.get_order_items);
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
          <Text style={styles.parentCardTopTagText}>Product Details</Text>
        </View>
        {/* <Text>A</Text> */}
        {renderMultipleItems(item)?.map((res, i) => {
          // console.log(241, item);
          // console.log(234, res, i);
          return (
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
                  style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
                  <Text style={styles.parentCarddTextStyle}>
                    {res?.get_products?.is_discounted == 2
                      ? res?.get_products?.discounted_price
                      : res?.get_products?.price}{' '}
                    x{res?.quantity}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

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
            <View style={{...styles.viewForTextWidth, alignItems: 'flex-end'}}>
              {returnItemAttributes(item)?.map(res => {
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
        </View>
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
          <Text style={styles.parentCardTopTagText}>Shipping Details</Text>
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
      </View>
    );
  };
  const updateSections = e => {
    setActiveSession(e);
  };

  return (
    <View style={styles.main}>
      {header()}
      {accordionRender()}
    </View>
  );
}
