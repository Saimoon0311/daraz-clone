import React from 'react';
import {useSelector} from 'react-redux';
import {en} from './Translate/encopy';
import {fr} from './Translate/frcopy';

export const languageCheck = text => {
  const {languageType} = useSelector(state => state.languageType);
  const c = console.log.bind(console);

  if (languageType.code == 'en') {
    var string = en[text];
  } else if (languageType.code == 'fr') {
    var string = fr[text];
  }
  return string;
};
