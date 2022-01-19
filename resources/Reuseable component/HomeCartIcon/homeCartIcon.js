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
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import actions from '../../redux/action';
import {getUserData} from '../../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {showMessage} from 'react-native-flash-message';
import {color} from '../../config/color';
// import {styles} from './style';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from '@react-navigation/native';
import {testCART} from '../../config/url';

export const HomeCartIcon = props => {
  const [cartLength, setCartLength] = useState(0);
  const isFocused = useIsFocused();

  const getCartData = async () => {
    const user = await getUserData();
    const userId = user.id;
    fetch(`${testCART}/${userId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        if (json[0]?.length > 0) {
          setCartLength(json[0]?.length);
        } else {
          setCartLength(0);
        }
      })
      .catch(err => console.log(40, err));
  };
  useEffect(() => {
    if (isFocused) {
      getCartData();
      console.log('49');
    } else {
      console.log('45');
    }
  }, [isFocused, props?.updateCart]);
  return (
    <TouchableOpacity
      onPress={() => props?.navigations()}
      style={{marginRight: wp('7')}}>
      <Ionicons name="cart" size={27} color={color.defaultcolor} />
      <View
        style={{
          position: 'absolute',
          // backgroundColor: color.themColorPrimary,
          // height: hp('10'),
          borderRadius: Math.round(
            Dimensions.get('window').width + Dimensions.get('window').height,
          ),
          // alignSelf: 'center',
          width: Dimensions.get('window').width * 0.07,
          height: Dimensions.get('window').width * 0.06,
          // justifyContent: 'center',
          // alignItems: 'center',
          marginLeft: wp('7'),
          // backgroundColor: 'red',
          // width: wp('3'),
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: color.textColorRedCart,
            fontSize: hp('2'),
            // bottom: hp('0.1'),
            textAlign: 'left',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          {cartLength}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
