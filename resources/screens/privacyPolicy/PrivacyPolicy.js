import {Platform, TouchableOpacity, Text, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PrivacyPolicy = ({navigation}) => {
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
            marginLeft: wp('-7'),
          }}>
          PrivacyPolicy
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
          {/* <HomeCartIcon isLoggedIn={true} navigations={navigationProps} /> */}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View>{header()}</View>
      <View>
        <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
        <Text style={styles.subtitleText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
