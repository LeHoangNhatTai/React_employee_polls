export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logout(){
  return {
    type: LOGOUT_USER,
  }
}

export function handleLogin(userName, password) {
  return (dispatch, getState) => {
    const { users } = getState();
    const user = Object.values(users).find(user => user.id === userName && user.password === password);

    if (user) {
      dispatch(setAuthedUser(user.id));
    }
    else {
      alert('Invalid username or password');
    }
  }
}

export function handleLogout() {
  return dispatch => dispatch(logout());
}