// auth action
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const setCurrentUserAction = (token) => {
  return {
    type: SET_USER_TOKEN,
    payload: token,
  };
};
