import types from '../type';

const initialState = {
  tourStatus: true,
};

export default function checkTourStatus(state = initialState, action) {
  switch (action.type) {
    case types.TOURCOMPLETED:
      console.log(10, action.type);
      return {tourStatus: false};
      break;
    default:
      return {...state};
      break;
  }
}
