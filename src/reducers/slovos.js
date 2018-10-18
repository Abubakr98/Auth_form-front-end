const initialState = {
  userData: null,
  userVerify:{auth:false,verifyLogin:null,verifyToken:null}
};

export default function toRegForm(state = initialState, action) {
  if (action.type === 'VERIFY_USER') {
    return {
      ...state,
      userVerify: action.payload
    }
  }
  else if (action.type === 'GET_USER_DATA') {
    return {
      ...state,
      userData: action.payload
    }

  }
  return state;
}
