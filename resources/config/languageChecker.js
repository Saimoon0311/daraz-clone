import React from 'react';
import {useSelector} from 'react-redux';
import {store} from '../redux/store';
import {en} from './Translate/encopy';
import {fr} from './Translate/frcopy';

export const languageCheck = text => {
  const languageType = store.getState().languageType.languageType;
  // const {languageType} = useSelector(state => state.languageType);

  if (languageType.code == 'en') {
    var string = en[text];
  } else if (languageType.code == 'fr') {
    var string = fr[text];
  }
  return string;
};
