import React from 'react';
import {WebView} from 'react-native-webview';

const PrivacyPolicy = ({navigation}) => {
  return (
    <WebView
      source={{
        uri: 'https://www.moyenxpress.com/privacypolicy',
      }}
      style={{marginTop: 20}}
    />
  );
};

export default PrivacyPolicy;
