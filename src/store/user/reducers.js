import { userActionsTypes } from './actions';

const initialState = {
  name: '',
  token: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionsTypes.SET_NAME:
      return { ...state, name: action.payload };
    case userActionsTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
export default userReducer;
