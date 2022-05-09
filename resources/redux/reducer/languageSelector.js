import types from '../type';

const initialState = {
  languageType: {code: 'en', label: 'English'},
};

export default function languageSelector(state = initialState, action) {
  switch (action.type) {
    case types.CHANGELANGUAGE:
      const data = action.payload;
      return {languageType: data};
      break;
    default:
      return {...state};
      break;
  }
}
