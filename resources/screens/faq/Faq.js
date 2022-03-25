import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
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
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const [helpSupport, setHelpSupport] = useState([
    {
      id: 1,
    },
  ]);
  const renderHeaderHelp = item => {
    return (
      <View style={styles.AccordionHeaderContainer}>
        <View style={{width: wp('12')}}>
          <FontAwesome5 name="question-circle" color={'gray'} size={30} />
        </View>
        <View style={{width: wp('72')}}>
          <Text style={styles.AccordionHeaderTitle}>Help & Support</Text>
        </View>
        <View style={{width: wp('12')}}>
          <MaterialIcons
            name={'keyboard-arrow-down'}
            size={30}
            color={color.defaultTextColor}
          />
        </View>
      </View>
    );
  };
  const renderContentHelp = item => {
    return helpFunctiontag.map(res => {
      return (
        <TouchableOpacity style={{backgroundColor: 'red'}}>
          {res.iconName == 'warning' ? (
            <AntDesign name={res?.iconName} size={26} color={'gray'} />
          ) : (
            <FontAwesome5 name={res?.iconName} size={26} color={'gray'} />
          )}
          {/* <MaterialIcons name={res?.iconName} size={26} /> */}
          <Text style={styles.AccordionContentTitle}>{res?.title}</Text>
        </TouchableOpacity>
      );
    });
  };
  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };

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
      </View>
      <Text style={styles.faqText}>Faq</Text>
      <Accordion
        activeSections={activeSessionHelp}
        sections={helpSupport}
        keyExtractor={(item, index) => `key-${index}`}
        underlayColor="transparent"
        renderHeader={e => renderHeaderHelp(e)}
        renderContent={e => renderContentHelp(e)}
        onChange={e => updateSectionsHelp(e)}
      />
    </View>
  );
};

export default Faq;
