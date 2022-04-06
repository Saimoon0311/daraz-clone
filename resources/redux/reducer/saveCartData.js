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
          saveProduct => saveProduct.id !== action.payload.id,
        ),
      };
      break;
    case types.CLEAR_SAVE_PRODUCT:
      return {saveProduct: []};
      break;
    default:
      return state;
      break;
  }
}
