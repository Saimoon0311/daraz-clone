import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from '../../config/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FaqUrl} from '../../config/url';

const Faq = ({navigation}) => {
  const [activeSessionHelp, setActiveSessionHelp] = useState([]);
  const [helpFunctiontag, setHelpFunctiontag] = useState([
    {
      id: 1,
      title: 'Help Center',
      iconName: 'life-ring',
    },
    {
      id: 2,
      title: 'Support Inbox',
      iconName: 'inbox',
    },
    {
      iconName: 'warning',
      id: 3,
      title: 'Report a Problem',
    },
    {
      iconName: 'book',
      id: 4,
      title: 'Terms & Policies ',
    },
  ]);
  const [helpSupport, setHelpSupport] = useState([]);

  const renderHeaderHelp = item => {
    return (
      <View style={styles.AccordionHeaderContainer}>
        <View style={{width: wp('83')}}>
          <Text style={styles.AccordionHeaderTitle}>{item.title}</Text>
        </View>
        <View style={{width: wp('7')}}>
          <MaterialIcons
            name={'keyboard-arrow-down'}
            size={30}
            color={color.bottomNavColor}
          />
        </View>
      </View>
    );
  };
  const renderContentHelp = item => {
    return (
      <View style={styles.AccordionHeaderContainer}>
        <Text
          style={{
            color: color.textColorRedCart,
            fontSize: hp('1.7'),
            width: wp('90'),
          }}>
          {item?.description}
        </Text>
      </View>
    );
  };
  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };
  const getFaqData = () => {
    fetch(FaqUrl)
      .then(res => res.json())
      .then(json => {
        setHelpSupport(json);
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {
    getFaqData();
  }, []);
  return (
    <View style={styles.mainContainer}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp('10'),
          backgroundColor: color.defaultBackgroundColor,
        }}>
        <Text style={styles.faqText}>FAQ</Text>
        {helpSupport.length > 0 && (
          <Accordion
            activeSections={activeSessionHelp}
            sections={helpSupport}
            keyExtractor={(item, index) => `key-${index}`}
            underlayColor="transparent"
            // containerStyle={{borderWidth: 2}}
            renderHeader={e => renderHeaderHelp(e)}
            renderContent={e => renderContentHelp(e)}
            onChange={e => updateSectionsHelp(e)}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Faq;
