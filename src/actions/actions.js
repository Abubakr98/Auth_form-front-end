const verifyUser=(data)=> dispatch =>{
  dispatch({
    type: 'VERIFY_USER',
    payload:data
  });
}
const getUserData=(data)=> dispatch =>{
  dispatch({
    type: 'GET_USER_DATA',
    payload:data
  });
}
export  {verifyUser,getUserData}
