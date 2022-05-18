import types from '../type';

const initialState = {
  tourStatusLanguage: true,
};

export default function checkTourLanguage(state = initialState, action) {
  switch (action.type) {
    case types.TOURCOMPLETEDLANGUAGE:
      console.log(10, action.type);
      return {tourStatus: false};
      break;
    default:
      return {...state};
      break;
  }
}
