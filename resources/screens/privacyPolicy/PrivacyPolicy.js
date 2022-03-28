import React from 'react';
import {WebView} from 'react-native-webview';

const PrivacyPolicy = ({navigation}) => {
  return (
    <WebView
      source={{
        uri: 'https://www.moyenxpress.com/privacypolicy',
      }}
    />
  );
};

export default PrivacyPolicy;
