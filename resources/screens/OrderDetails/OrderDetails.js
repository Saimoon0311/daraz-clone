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
        console.log(54, res);
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
            marginTop: hp(Platform?.OS == 'ios' ? '6' : '3'),
            marginLeft: wp('3'),
          }}>
          Orders Details
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
        <Text>{item?.id}</Text>
      </View>
    );
  };
  const renderContent = item => {
    return (
      <View style={styles.childCardStyle}>
        <Text>{item?.id}</Text>
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
