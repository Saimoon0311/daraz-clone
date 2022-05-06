import types from '../type';

const initialState = {
  languageType: {code: 'en', label: 'English'},
};

export default function languageSelector(state = initialState, action) {
  switch (action.type) {
    case types.CHANGELANGUAGE:
      console.log(10, action.payload);
      return (state = action.payload);
      break;
    default:
      return state;
      break;
  }
}
