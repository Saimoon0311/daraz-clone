import types from '../type';

const initialState = {
  saveProduct: [],
};

export default function saveProduct(state = initialState, action) {
  switch (action.type) {
    case types.SAVEPRODUCT:
      return {...state, saveProduct: [...state.saveProduct, action.payload]};
      break;
    case types.UNSAVEPRODUCT:
      return {
        ...state,
        saveProduct: state.saveProduct.filter(
          saveProduct => saveProduct._id !== action.payload._id,
        ),
      };
      break;
    default:
      return state;
      break;
  }
}
